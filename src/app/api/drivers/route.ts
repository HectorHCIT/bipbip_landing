import { NextResponse } from "next/server";
import { getFromAddress, getInboxFor, getResend } from "@/lib/resend";
import { renderDriversEmail, type DriversPayload } from "@/lib/email-templates";

export const runtime = "nodejs";

const PHONE_RE = /^[+\d][\d\s\-()]{6,}$/;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_FIELD = 500;

const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const PDF_TYPES = new Set(["application/pdf"]);

interface FileSpec {
  field: string;
  label: string;
  allowed: ReadonlySet<string>;
}

const REQUIRED_FILES: readonly FileSpec[] = [
  { field: "dni", label: "DNI", allowed: IMAGE_TYPES },
  { field: "licencia", label: "Licencia", allowed: IMAGE_TYPES },
  { field: "antecedentes", label: "Antecedentes penales", allowed: PDF_TYPES },
];

function asString(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

function extensionFor(file: File): string {
  const type = file.type;
  if (type === "image/jpeg") return "jpg";
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  if (type === "application/pdf") return "pdf";
  const dot = file.name.lastIndexOf(".");
  return dot >= 0 ? file.name.slice(dot + 1) : "bin";
}

export async function POST(request: Request): Promise<Response> {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Formulario inválido." }, { status: 400 });
  }

  if (asString(form.get("website"))) {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const firstName = asString(form.get("firstName"));
  const lastName = asString(form.get("lastName"));
  const documentId = asString(form.get("documentId"));
  const phone = asString(form.get("phone"));
  const city = asString(form.get("city"));
  const vehicle = asString(form.get("vehicle"));

  if (!firstName || !lastName) {
    return NextResponse.json({ error: "Nombre y apellido son obligatorios." }, { status: 400 });
  }
  if (!phone || !PHONE_RE.test(phone)) {
    return NextResponse.json({ error: "Teléfono inválido." }, { status: 400 });
  }
  if (!city || !vehicle) {
    return NextResponse.json({ error: "Ciudad y vehículo son obligatorios." }, { status: 400 });
  }
  for (const value of [firstName, lastName, documentId, phone, city, vehicle]) {
    if (value.length > MAX_FIELD) {
      return NextResponse.json({ error: "Algún campo excede el tamaño permitido." }, { status: 400 });
    }
  }

  const attachments: Array<{ filename: string; content: Buffer }> = [];

  for (const spec of REQUIRED_FILES) {
    const entry = form.get(spec.field);
    if (!(entry instanceof File) || entry.size === 0) {
      return NextResponse.json(
        { error: `Falta el archivo: ${spec.label}.` },
        { status: 400 }
      );
    }
    if (entry.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `${spec.label}: el archivo supera los 5 MB.` },
        { status: 400 }
      );
    }
    if (!spec.allowed.has(entry.type)) {
      const expected = spec.allowed.has("application/pdf") ? "PDF" : "JPG, PNG o WebP";
      return NextResponse.json(
        { error: `${spec.label}: solo se aceptan archivos ${expected}.` },
        { status: 400 }
      );
    }
    const buffer = Buffer.from(await entry.arrayBuffer());
    const ext = extensionFor(entry);
    const safeName = `${spec.field}-${firstName}-${lastName}`
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    attachments.push({ filename: `${safeName}.${ext}`, content: buffer });
  }

  const payload: DriversPayload = { firstName, lastName, documentId, phone, city, vehicle };
  const { subject, html, text } = renderDriversEmail(payload);

  try {
    const resend = getResend();
    const { error } = await resend.emails.send({
      from: getFromAddress(),
      to: getInboxFor("drivers"),
      subject,
      html,
      text,
      attachments,
    });
    if (error) {
      console.error("[/api/drivers] resend error", error);
      return NextResponse.json({ error: "No pudimos enviar tu aplicación." }, { status: 502 });
    }
  } catch (error) {
    console.error("[/api/drivers] unexpected error", error);
    return NextResponse.json({ error: "Error interno." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
