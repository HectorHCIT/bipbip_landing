import { Resend } from "resend";

let cachedClient: Resend | null = null;

function readEnv(key: string): string | undefined {
  const value = process.env[key]?.trim();
  return value ? value : undefined;
}

function requireEnv(key: string): string {
  const value = readEnv(key);
  if (!value) {
    throw new Error(
      `${key} is not set. Add it to .env.local (see .env.example for the full list).`
    );
  }
  return value;
}

export function getResend(): Resend {
  if (cachedClient) return cachedClient;
  cachedClient = new Resend(requireEnv("RESEND_API_KEY"));
  return cachedClient;
}

export function getFromAddress(): string {
  return requireEnv("RESEND_FROM_ADDRESS");
}

export type InboxKey = "contact" | "drivers" | "restaurants";

const INBOX_ENV: Record<InboxKey, string> = {
  contact: "RESEND_INBOX_CONTACT",
  drivers: "RESEND_INBOX_DRIVERS",
  restaurants: "RESEND_INBOX_RESTAURANTS",
};

export function getInboxFor(key: InboxKey): string {
  const override = readEnv("RESEND_TEST_TO");
  if (override) return override;
  return requireEnv(INBOX_ENV[key]);
}
