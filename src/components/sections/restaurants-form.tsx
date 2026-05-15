"use client";

import Link from "next/link";
import { useId, type ReactNode } from "react";

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

function Field({
  label,
  required = false,
  htmlFor,
  children,
}: {
  label: string;
  required?: boolean;
  htmlFor: string;
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

  return (
    <section
      id="restaurants-form"
      aria-labelledby="restaurants-form-heading"
      className="bg-white pb-20 md:pb-24 lg:pb-28"
    >
      <div className="mx-auto w-11/12 max-w-[1280px]">
        <div className="anim-reveal-up rounded-[32px] bg-white px-6 py-12 md:px-8 md:py-16 shadow-[0_10px_40px_0_rgba(0,0,0,0.08)]">
          <header className="anim-reveal-up mb-12 flex flex-col items-center gap-2 text-center">
            <h2
              id="restaurants-form-heading"
              // TODO(TW-060): no exact text-h2 token match for mobile (32px/40px); h2 token is 48px/56px
              className="text-[32px] leading-[40px] md:text-h2 font-bold font-sans text-brand-primary"
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

          <form
            className="flex flex-col gap-4"
            // TODO(forms): connect to API/server action — currently swallows submit
            onSubmit={(event) => event.preventDefault()}
            noValidate
          >
            <div className="anim-reveal-up grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Field label="Nombre" required htmlFor={firstNameId}>
                <input
                  id={firstNameId}
                  type="text"
                  name="firstName"
                  autoComplete="given-name"
                  placeholder="Ej. Luis Carlos"
                  required
                  className={inputClass}
                />
              </Field>
              <Field label="Apellido" required htmlFor={lastNameId}>
                <input
                  id={lastNameId}
                  type="text"
                  name="lastName"
                  autoComplete="family-name"
                  placeholder="Ej. Fernández León"
                  required
                  className={inputClass}
                />
              </Field>
              <Field label="Correo electrónico" required htmlFor={emailId}>
                <input
                  id={emailId}
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Ej. prueba@email.com"
                  required
                  aria-required="true"
                  className={inputClass}
                />
              </Field>
            </div>

            <div className="anim-reveal-up grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Field label="Número de teléfono" required htmlFor={phoneId}>
                <input
                  id={phoneId}
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  placeholder="Ej. +50499123456"
                  required
                  className={inputClass}
                />
              </Field>
              <Field label="Dirección del negocio" htmlFor={addressId}>
                <input
                  id={addressId}
                  type="text"
                  name="address"
                  autoComplete="street-address"
                  placeholder="Ej. Av circunvalación..."
                  className={inputClass}
                />
              </Field>
              <Field label="Ciudad" htmlFor={cityId}>
                <select
                  id={cityId}
                  name="city"
                  autoComplete="address-level2"
                  defaultValue=""
                  style={selectStyle}
                  className={`${inputClass} appearance-none pr-10`}
                >
                  <option value="" disabled>
                    Selecciona tu ciudad
                  </option>
                  <option value="tegucigalpa">Tegucigalpa</option>
                  <option value="sps">San Pedro Sula</option>
                  <option value="lc">La Ceiba</option>
                  <option value="catacamas">Catacamas</option>
                </select>
              </Field>
            </div>

            <div className="anim-reveal-up grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Tipo de negocio" htmlFor={businessTypeId}>
                <select
                  id={businessTypeId}
                  name="businessType"
                  defaultValue=""
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
              <Field label="Nombre de la marca" required htmlFor={brandNameId}>
                <input
                  id={brandNameId}
                  type="text"
                  name="brandName"
                  autoComplete="organization"
                  placeholder="Ej. La Pizzería del Centro"
                  required
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
                  href="/privacy"
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

            <button
              type="submit"
              className="anim-reveal-up h-12 w-full rounded-lg bg-brand-primary text-button text-white shadow-cta transition-[opacity,transform] duration-200 hover:opacity-95 hover:scale-[1.01] active:scale-[0.98]"
            >
              Aplicar ahora
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
