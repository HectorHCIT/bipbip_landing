import { NextResponse } from "next/server";
import { getFromAddress, getInboxFor, getResend } from "@/lib/resend";
import { renderContactEmail, type ContactPayload } from "@/lib/email-templates";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s\-()]{6,}$/;
const MAX_FIELD = 5000;

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function validate(body: Record<string, unknown>):
  | { ok: true; payload: ContactPayload }
  | { ok: false; error: string } {
  const name = asString(body.name);
  const lastName = asString(body.lastName);
  const email = asString(body.email);
  const phone = asString(body.phone);
  const message = asString(body.message);
  const honeypot = asString(body.website);

  if (honeypot) return { ok: false, error: "Solicitud inválida." };

  if (!name || !lastName) return { ok: false, error: "Nombre y apellido son obligatorios." };
  if (!email || !EMAIL_RE.test(email)) return { ok: false, error: "Email inválido." };
  if (!phone || !PHONE_RE.test(phone)) return { ok: false, error: "Teléfono inválido." };
  if (!message || message.length < 10) return { ok: false, error: "El mensaje es muy corto." };

  if (
    name.length > MAX_FIELD ||
    lastName.length > MAX_FIELD ||
    email.length > MAX_FIELD ||
    phone.length > MAX_FIELD ||
    message.length > MAX_FIELD
  ) {
    return { ok: false, error: "Algún campo excede el tamaño permitido." };
  }

  return { ok: true, payload: { name, lastName, email, phone, message } };
}

export async function POST(request: Request): Promise<Response> {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const result = validate(body);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const { subject, html, text } = renderContactEmail(result.payload);

  try {
    const resend = getResend();
    const { error } = await resend.emails.send({
      from: getFromAddress(),
      to: getInboxFor("contact"),
      replyTo: result.payload.email,
      subject,
      html,
      text,
    });
    if (error) {
      console.error("[/api/contact] resend error", error);
      return NextResponse.json({ error: "No pudimos enviar tu mensaje." }, { status: 502 });
    }
  } catch (error) {
    console.error("[/api/contact] unexpected error", error);
    return NextResponse.json({ error: "Error interno." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
