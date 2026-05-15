const LOGO_IMAGE = "https://static2.bipbip.hn/bipbip_landing/Logo.png";
const BRAND = "#fb0021";
const TEXT_DARK = "#1a1a1a";
const TEXT_MUTED = "#6b6b6b";
const SURFACE = "#fafafa";
const BORDER = "#ececec";
const FONT_STACK =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatTimestamp(): string {
  return new Date().toLocaleString("es-HN", {
    timeZone: "America/Tegucigalpa",
    dateStyle: "long",
    timeStyle: "short",
  });
}

function row(label: string, value: string, isLast = false): string {
  const borderBottom = isLast ? "none" : `1px solid ${BORDER}`;
  return `
    <tr>
      <td style="padding:14px 0;border-bottom:${borderBottom};vertical-align:top;">
        <p style="margin:0 0 4px;font-family:${FONT_STACK};font-size:12px;line-height:1.4;color:${TEXT_MUTED};text-transform:uppercase;letter-spacing:0.6px;font-weight:600;">${escapeHtml(label)}</p>
        <p style="margin:0;font-family:${FONT_STACK};font-size:15px;line-height:1.5;color:${TEXT_DARK};white-space:pre-wrap;">${escapeHtml(value)}</p>
      </td>
    </tr>`;
}

interface WrapOptions {
  preheader: string;
  eyebrow: string;
  title: string;
  rowsHtml: string;
  callout?: string;
  attachmentsNote?: string;
}

function wrap(opts: WrapOptions): string {
  const timestamp = formatTimestamp();
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="es" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="color-scheme" content="light only" />
  <meta name="supported-color-schemes" content="light only" />
  <title>BipBip</title>
</head>
<body style="margin:0;padding:0;background:${SURFACE};font-family:${FONT_STACK};color:${TEXT_DARK};">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:${SURFACE};">
    ${escapeHtml(opts.preheader)}
  </div>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${SURFACE};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
          <tr>
            <td align="center" style="background:#ffffff;padding:32px 24px 24px;border-bottom:1px solid ${BORDER};">
              <img src="${LOGO_IMAGE}" alt="BipBip" width="160" style="display:block;width:160px;max-width:160px;height:auto;border:0;outline:none;text-decoration:none;margin:0 auto;" />
            </td>
          </tr>
          <tr>
            <td style="padding:32px 32px 8px;">
              <p style="margin:0 0 8px;font-family:${FONT_STACK};font-size:12px;line-height:1.4;color:${BRAND};text-transform:uppercase;letter-spacing:1px;font-weight:700;">${escapeHtml(opts.eyebrow)}</p>
              <h1 style="margin:0;font-family:${FONT_STACK};font-size:24px;line-height:1.3;color:${TEXT_DARK};font-weight:700;">${escapeHtml(opts.title)}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                ${opts.rowsHtml}
              </table>
            </td>
          </tr>
          ${
            opts.attachmentsNote
              ? `<tr>
            <td style="padding:24px 32px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${SURFACE};border-radius:8px;">
                <tr>
                  <td style="padding:14px 16px;">
                    <p style="margin:0;font-family:${FONT_STACK};font-size:13px;line-height:1.5;color:${TEXT_DARK};">
                      📎 <strong>${escapeHtml(opts.attachmentsNote)}</strong>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`
              : ""
          }
          ${
            opts.callout
              ? `<tr>
            <td style="padding:24px 32px 8px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:rgba(251,0,33,0.06);border-left:3px solid ${BRAND};border-radius:4px;">
                <tr>
                  <td style="padding:14px 16px;">
                    <p style="margin:0;font-family:${FONT_STACK};font-size:13px;line-height:1.5;color:${TEXT_DARK};">${escapeHtml(opts.callout)}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`
              : ""
          }
          <tr>
            <td style="padding:32px;">
              <hr style="border:0;border-top:1px solid ${BORDER};margin:0 0 16px;" />
              <p style="margin:0 0 4px;font-family:${FONT_STACK};font-size:12px;line-height:1.5;color:${TEXT_MUTED};">
                Recibido el ${escapeHtml(timestamp)}
              </p>
              <p style="margin:0;font-family:${FONT_STACK};font-size:12px;line-height:1.5;color:${TEXT_MUTED};">
                Este correo fue generado automáticamente desde la landing de BipBip. No respondas a esta dirección — usa el botón Responder de tu cliente de correo.
              </p>
            </td>
          </tr>
        </table>
        <p style="margin:16px 0 0;font-family:${FONT_STACK};font-size:11px;line-height:1.5;color:${TEXT_MUTED};">
          BipBip · Honduras
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function textRow(label: string, value: string): string {
  return `${label}: ${value}\n`;
}

export interface ContactPayload {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export function renderContactEmail(payload: ContactPayload): {
  subject: string;
  html: string;
  text: string;
} {
  const fullName = `${payload.name} ${payload.lastName}`.trim();
  const rowsHtml =
    row("Nombre", fullName) +
    row("Email", payload.email) +
    row("Teléfono", payload.phone) +
    row("Mensaje", payload.message, true);

  const html = wrap({
    preheader: `Mensaje de ${fullName} · ${payload.email}`,
    eyebrow: "Formulario de contacto",
    title: `Mensaje de ${fullName}`,
    rowsHtml,
    callout: `Responde directamente a este correo para contactar a ${fullName}.`,
  });

  const text =
    `Nuevo mensaje desde el formulario de contacto\n\n` +
    textRow("Nombre", fullName) +
    textRow("Email", payload.email) +
    textRow("Teléfono", payload.phone) +
    `\nMensaje:\n${payload.message}\n`;

  return {
    subject: `Nuevo mensaje de contacto — ${fullName}`,
    html,
    text,
  };
}

export interface DriversPayload {
  firstName: string;
  lastName: string;
  documentId: string;
  phone: string;
  city: string;
  vehicle: string;
}

const CITY_LABEL: Record<string, string> = {
  tegucigalpa: "Tegucigalpa",
  sps: "San Pedro Sula",
  lc: "La Ceiba",
  catacamas: "Catacamas",
};

const VEHICLE_LABEL: Record<string, string> = {
  moto: "Motocicleta",
  car: "Automóvil",
  bike: "Bicicleta",
};

const BUSINESS_LABEL: Record<string, string> = {
  restaurant: "Restaurante",
  cafe: "Cafetería",
  bakery: "Panadería",
  store: "Tienda",
  other: "Otro",
};

export function renderDriversEmail(payload: DriversPayload): {
  subject: string;
  html: string;
  text: string;
} {
  const fullName = `${payload.firstName} ${payload.lastName}`.trim();
  const city = CITY_LABEL[payload.city] ?? payload.city;
  const vehicle = VEHICLE_LABEL[payload.vehicle] ?? payload.vehicle;

  const rowsHtml =
    row("Nombre", fullName) +
    row("Nº Documento", payload.documentId || "—") +
    row("Teléfono", payload.phone) +
    row("Ciudad", city) +
    row("Tipo de vehículo", vehicle, true);

  const html = wrap({
    preheader: `${fullName} aplicó como repartidor en ${city}`,
    eyebrow: "Aplicación de repartidor",
    title: `${fullName} quiere ser repartidor`,
    rowsHtml,
    attachmentsNote: "DNI, licencia y antecedentes penales adjuntos a este correo.",
    callout: "Revisa los documentos adjuntos antes de contactar al postulante.",
  });

  const text =
    `Nueva aplicación de repartidor\n\n` +
    textRow("Nombre", fullName) +
    textRow("Documento", payload.documentId || "—") +
    textRow("Teléfono", payload.phone) +
    textRow("Ciudad", city) +
    textRow("Vehículo", vehicle) +
    `\nDocumentos adjuntos: DNI, licencia, antecedentes penales.\n`;

  return {
    subject: `Nueva aplicación de repartidor — ${fullName}`,
    html,
    text,
  };
}

export interface RestaurantsPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  businessType: string;
  brandName: string;
}

export function renderRestaurantsEmail(payload: RestaurantsPayload): {
  subject: string;
  html: string;
  text: string;
} {
  const fullName = `${payload.firstName} ${payload.lastName}`.trim();
  const city = payload.city ? (CITY_LABEL[payload.city] ?? payload.city) : "—";
  const businessType = payload.businessType
    ? (BUSINESS_LABEL[payload.businessType] ?? payload.businessType)
    : "—";

  const rowsHtml =
    row("Contacto", fullName) +
    row("Email", payload.email) +
    row("Teléfono", payload.phone) +
    row("Nombre de la marca", payload.brandName) +
    row("Tipo de negocio", businessType) +
    row("Dirección", payload.address || "—") +
    row("Ciudad", city, true);

  const html = wrap({
    preheader: `${payload.brandName} (${city}) quiere vender con BipBip`,
    eyebrow: "Aplicación de comercio",
    title: `${payload.brandName} quiere vender con BipBip`,
    rowsHtml,
    callout: `Responde directamente a este correo para contactar a ${fullName}.`,
  });

  const text =
    `Nueva aplicación de comercio\n\n` +
    textRow("Contacto", fullName) +
    textRow("Email", payload.email) +
    textRow("Teléfono", payload.phone) +
    textRow("Marca", payload.brandName) +
    textRow("Tipo", businessType) +
    textRow("Dirección", payload.address || "—") +
    textRow("Ciudad", city);

  return {
    subject: `Nueva aplicación de comercio — ${payload.brandName || fullName}`,
    html,
    text,
  };
}
