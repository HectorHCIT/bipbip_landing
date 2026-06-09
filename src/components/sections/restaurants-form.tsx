"use client";

import Link from "next/link";
import { useEffect, useId, useState, type ReactNode } from "react";

const inputClass =
  "h-12 w-full rounded-lg border border-grey-200 bg-white px-4 py-2 text-b3 text-grey-700 placeholder:text-grey-500 shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary focus-visible:border-brand-primary transition-colors";

const selectChevronUrl =
  "url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20stroke%3D%22%231a1a1a%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m4%207%206%206%206-6%22/%3E%3C/svg%3E')";

const selectStyle = {
  backgroundImage: selectChevronUrl,
  backgroundSize: "20px 20px",
  backgroundPosition: "right 16px center",
  backgroundRepeat: "no-repeat",
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s\-()]{6,}$/;

type FieldErrors = Record<string, string>;

function validate(data: FormData): FieldErrors {
  const errors: FieldErrors = {};
  const get = (key: string) =>
    typeof data.get(key) === "string" ? (data.get(key) as string).trim() : "";

  if (!get("firstName")) errors.firstName = "Ingresa tu nombre.";
  if (!get("lastName")) errors.lastName = "Ingresa tu apellido.";
  const email = get("email");
  if (!email) errors.email = "Ingresa tu correo electrónico.";
  else if (!EMAIL_RE.test(email)) errors.email = "Ingresa un correo válido.";
  const phone = get("phone");
  if (!phone) errors.phone = "Ingresa tu número de teléfono.";
  else if (!PHONE_RE.test(phone)) errors.phone = "Ingresa un teléfono válido.";
  if (!get("address")) errors.address = "Ingresa la dirección del negocio.";
  if (!get("city")) errors.city = "Selecciona tu ciudad.";
  if (!get("businessType")) errors.businessType = "Selecciona el tipo de negocio.";
  if (!get("brandName")) errors.brandName = "Ingresa el nombre de la marca.";

  return errors;
}

// 2026-06-15 00:00 in UTC-6 (Honduras) == 2026-06-15 06:00 UTC.
// Comparing against this absolute UTC instant keeps server and client agreeing
// regardless of which timezone the runtime reports.
const FUTURE_CITIES_RELEASE_AT_MS = Date.UTC(2026, 5, 15, 6, 0, 0);

const BASE_CITIES = [
  { value: "tegucigalpa", label: "Tegucigalpa" },
  { value: "sps", label: "San Pedro Sula" },
] as const;

const FUTURE_CITIES = [
  { value: "progreso", label: "Progreso" },
  { value: "choloma", label: "Choloma" },
  { value: "la-lopez", label: "La Lopez" },
  { value: "siguatepeque", label: "Siguatepeque" },
  { value: "comayagua", label: "Comayagua" },
] as const;

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

function Field({
  label,
  required = false,
  htmlFor,
  error,
  errorId,
  children,
}: {
  label: string;
  required?: boolean;
  htmlFor: string;
  error?: string | undefined;
  errorId?: string | undefined;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={htmlFor} className="text-b3 text-grey-900">
        {label}
        {required && (
          <span className="text-error" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <span id={errorId} role="alert" className="anim-load-down text-caption text-error">
          {error}
        </span>
      )}
    </div>
  );
}

export default function RestaurantsForm() {
  const firstNameId = useId();
  const lastNameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const addressId = useId();
  const cityId = useId();
  const businessTypeId = useId();
  const brandNameId = useId();
  const termsId = useId();

  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  const [errors, setErrors] = useState<FieldErrors>({});

  function clearError(name: string) {
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  function handleFieldChange(event: React.ChangeEvent<HTMLFormElement>) {
    const name = (event.target as unknown as { name?: string }).name;
    if (name) clearError(name);
  }

  // Gated client-side to avoid hydration mismatch when the page HTML is
  // statically cached. SSR always emits the base list; the extra cities pop in
  // after mount once the release instant has passed.
  const [showFutureCities, setShowFutureCities] = useState(false);
  useEffect(() => {
    if (Date.now() >= FUTURE_CITIES_RELEASE_AT_MS) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowFutureCities(true);
    }
  }, []);
  const cities = showFutureCities
    ? [...BASE_CITIES, ...FUTURE_CITIES]
    : BASE_CITIES;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    setSubmitState({ status: "submitting" });
    const payload = Object.fromEntries(form.entries());

    try {
      const response = await fetch("/api/restaurants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(
          data?.error ?? "No pudimos enviar tu aplicación. Intenta de nuevo."
        );
      }
      setSubmitState({ status: "success" });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No pudimos enviar tu aplicación. Intenta de nuevo.";
      setSubmitState({ status: "error", message });
    }
  }

  const isSubmitting = submitState.status === "submitting";

  return (
    <section
      id="restaurants-form"
      aria-labelledby="restaurants-form-heading"
      className="bg-white pb-20 md:pb-24 lg:pb-28 xl:pb-36"
    >
      <div className="mx-auto w-11/12 max-w-[1280px]">
        <div className="anim-reveal-up rounded-[32px] bg-white px-6 py-12 md:px-8 md:py-16 shadow-[0_10px_40px_0_rgba(0,0,0,0.08)]">
          <header className="anim-reveal-up mb-12 flex flex-col items-center gap-2 text-center">
            <h2
              id="restaurants-form-heading"
              // TODO(TW-060): no exact text-h2 token match for mobile (32px/40px); h2 token is 48px/56px
              className="text-[32px] leading-[40px] md:text-h2 xl:text-[56px] xl:leading-[64px] font-bold font-sans text-brand-primary"
            >
              Aplica para vender con BipBip
            </h2>
            <p
              // TODO(TW-060): align with text-s1 token (18px / 24px line-height differs from leading-7)
              className="text-[18px] leading-7 tracking-[0.2px] text-brand-black max-w-[720px]"
            >
              Completa tus datos y nuestro equipo te contactará para ayudarte a comenzar a vender en BipBip.
            </p>
          </header>

          {submitState.status === "success" ? (
            <div
              role="status"
              aria-live="polite"
              className="anim-load-up mx-auto max-w-[640px] rounded-2xl bg-grey-50 p-8 text-center"
            >
              <p className="text-h5 font-bold text-brand-primary">¡Aplicación enviada!</p>
              <p className="mt-2 text-b2 text-brand-black">
                Gracias por aplicar. Nuestro equipo te contactará pronto.
              </p>
            </div>
          ) : (
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit}
              onChange={handleFieldChange}
              noValidate
            >
              <div
                aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", height: 0, width: 0, overflow: "hidden" }}
              >
                <label>
                  Website
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <div className="anim-reveal-up grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Field
                  label="Nombre"
                  required
                  htmlFor={firstNameId}
                  error={errors.firstName}
                  errorId={`${firstNameId}-error`}
                >
                  <input
                    id={firstNameId}
                    type="text"
                    name="firstName"
                    autoComplete="given-name"
                    placeholder="Ej. Luis Carlos"
                    required
                    aria-invalid={errors.firstName ? true : undefined}
                    aria-describedby={errors.firstName ? `${firstNameId}-error` : undefined}
                    className={inputClass}
                  />
                </Field>
                <Field
                  label="Apellido"
                  required
                  htmlFor={lastNameId}
                  error={errors.lastName}
                  errorId={`${lastNameId}-error`}
                >
                  <input
                    id={lastNameId}
                    type="text"
                    name="lastName"
                    autoComplete="family-name"
                    placeholder="Ej. Fernández León"
                    required
                    aria-invalid={errors.lastName ? true : undefined}
                    aria-describedby={errors.lastName ? `${lastNameId}-error` : undefined}
                    className={inputClass}
                  />
                </Field>
                <Field
                  label="Correo electrónico"
                  required
                  htmlFor={emailId}
                  error={errors.email}
                  errorId={`${emailId}-error`}
                >
                  <input
                    id={emailId}
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="Ej. prueba@email.com"
                    required
                    aria-required="true"
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={errors.email ? `${emailId}-error` : undefined}
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="anim-reveal-up grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Field
                  label="Número de teléfono"
                  required
                  htmlFor={phoneId}
                  error={errors.phone}
                  errorId={`${phoneId}-error`}
                >
                  <input
                    id={phoneId}
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    placeholder="Ej. +50499123456"
                    required
                    aria-invalid={errors.phone ? true : undefined}
                    aria-describedby={errors.phone ? `${phoneId}-error` : undefined}
                    className={inputClass}
                  />
                </Field>
                <Field
                  label="Dirección del negocio"
                  required
                  htmlFor={addressId}
                  error={errors.address}
                  errorId={`${addressId}-error`}
                >
                  <input
                    id={addressId}
                    type="text"
                    name="address"
                    autoComplete="street-address"
                    placeholder="Ej. Av circunvalación..."
                    required
                    aria-invalid={errors.address ? true : undefined}
                    aria-describedby={errors.address ? `${addressId}-error` : undefined}
                    className={inputClass}
                  />
                </Field>
                <Field
                  label="Ciudad"
                  required
                  htmlFor={cityId}
                  error={errors.city}
                  errorId={`${cityId}-error`}
                >
                  <select
                    id={cityId}
                    name="city"
                    autoComplete="address-level2"
                    defaultValue=""
                    required
                    aria-invalid={errors.city ? true : undefined}
                    aria-describedby={errors.city ? `${cityId}-error` : undefined}
                    style={selectStyle}
                    className={`${inputClass} appearance-none pr-10`}
                  >
                    <option value="" disabled>
                      Selecciona tu ciudad
                    </option>
                    {cities.map((city) => (
                      <option key={city.value} value={city.value}>
                        {city.label}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="anim-reveal-up grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field
                  label="Tipo de negocio"
                  required
                  htmlFor={businessTypeId}
                  error={errors.businessType}
                  errorId={`${businessTypeId}-error`}
                >
                  <select
                    id={businessTypeId}
                    name="businessType"
                    defaultValue=""
                    required
                    aria-invalid={errors.businessType ? true : undefined}
                    aria-describedby={errors.businessType ? `${businessTypeId}-error` : undefined}
                    style={selectStyle}
                    className={`${inputClass} appearance-none pr-10`}
                  >
                    <option value="" disabled>
                      Selecciona el tipo de negocio
                    </option>
                    <option value="restaurant">Restaurante</option>
                    <option value="cafe">Cafetería</option>
                    <option value="bakery">Panadería</option>
                    <option value="store">Tienda</option>
                    <option value="other">Otro</option>
                  </select>
                </Field>
                <Field
                  label="Nombre de la marca"
                  required
                  htmlFor={brandNameId}
                  error={errors.brandName}
                  errorId={`${brandNameId}-error`}
                >
                  <input
                    id={brandNameId}
                    type="text"
                    name="brandName"
                    autoComplete="organization"
                    placeholder="Ej. La Pizzería del Centro"
                    required
                    aria-invalid={errors.brandName ? true : undefined}
                    aria-describedby={errors.brandName ? `${brandNameId}-error` : undefined}
                    className={inputClass}
                  />
                </Field>
              </div>

              <label
                htmlFor={termsId}
                className="anim-reveal-up flex items-start gap-4 pb-2 pt-2 cursor-pointer"
              >
                <input
                  id={termsId}
                  type="checkbox"
                  required
                  className="mt-0.5 size-6 shrink-0 cursor-pointer rounded accent-brand-primary"
                />
                <span className="text-b3 text-brand-black">
                  Acepto que he leído y estoy de acuerdo con las{" "}
                  <Link
                    href="/privacy-policies"
                    className="underline hover:text-brand-primary focus-visible:text-brand-primary transition-colors"
                  >
                    políticas de privacidad
                  </Link>{" "}
                  y los{" "}
                  <Link
                    href="/terms"
                    className="underline hover:text-brand-primary focus-visible:text-brand-primary transition-colors"
                  >
                    términos y condiciones.
                  </Link>
                </span>
              </label>

              {submitState.status === "error" && (
                <p role="alert" className="anim-load-down text-caption text-error">
                  {submitState.message}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="anim-reveal-up h-12 w-full rounded-lg bg-brand-primary text-button text-white shadow-cta transition-[opacity,transform] duration-200 hover:opacity-95 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? "Enviando..." : "Aplicar ahora"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
