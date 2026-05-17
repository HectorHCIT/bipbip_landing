import { NextResponse } from "next/server";
import { getFromAddress, getInboxFor, getResend } from "@/lib/resend";
import {
  renderRestaurantsEmail,
  type RestaurantsPayload,
} from "@/lib/email-templates";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s\-()]{6,}$/;
const MAX_FIELD = 500;

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function validate(body: Record<string, unknown>):
  | { ok: true; payload: RestaurantsPayload }
  | { ok: false; error: string } {
  const firstName = asString(body.firstName);
  const lastName = asString(body.lastName);
  const email = asString(body.email);
  const phone = asString(body.phone);
  const address = asString(body.address);
  const city = asString(body.city);
  const businessType = asString(body.businessType);
  const brandName = asString(body.brandName);
  const honeypot = asString(body.website);

  if (honeypot) return { ok: false, error: "Solicitud inválida." };

  if (!firstName || !lastName) return { ok: false, error: "Nombre y apellido son obligatorios." };
  if (!email || !EMAIL_RE.test(email)) return { ok: false, error: "Email inválido." };
  if (!phone || !PHONE_RE.test(phone)) return { ok: false, error: "Teléfono inválido." };
  if (!brandName) return { ok: false, error: "El nombre de la marca es obligatorio." };

  for (const value of [firstName, lastName, email, phone, address, city, businessType, brandName]) {
    if (value.length > MAX_FIELD) {
      return { ok: false, error: "Algún campo excede el tamaño permitido." };
    }
  }

  return {
    ok: true,
    payload: { firstName, lastName, email, phone, address, city, businessType, brandName },
  };
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

  const { subject, html, text } = renderRestaurantsEmail(result.payload);

  try {
    const resend = getResend();
    const { error } = await resend.emails.send({
      from: getFromAddress(),
      to: getInboxFor("restaurants"),
      replyTo: result.payload.email,
      subject,
      html,
      text,
    });
    if (error) {
      console.error("[/api/restaurants] resend error", error);
      return NextResponse.json({ error: "No pudimos enviar tu aplicación." }, { status: 502 });
    }
  } catch (error) {
    console.error("[/api/restaurants] unexpected error", error);
    return NextResponse.json({ error: "Error interno." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
