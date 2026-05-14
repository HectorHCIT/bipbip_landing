"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";
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

const fieldRowVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

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
      <label
        htmlFor={htmlFor}
        className="text-b3 text-grey-900"
      >
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

function FileField({
  label,
  name,
  required = false,
}: {
  label: string;
  name: string;
  required?: boolean;
}) {
  const id = useId();
  const labelId = `${id}-label`;
  const hintId = `${id}-${name}-hint`;
  return (
    <div className="flex flex-col gap-1">
      <span
        id={labelId}
        className="text-b3 text-grey-900"
      >
        {label}
        {required && (
          <span className="text-error" aria-hidden="true">
            *
          </span>
        )}
      </span>
      <label
        htmlFor={id}
        className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-grey-500 bg-grey-50 px-4 py-6 cursor-pointer hover:border-brand-primary transition-colors focus-within:border-brand-primary"
      >
        <span
          className="flex size-11 items-center justify-center rounded-full bg-grey-200"
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-5 text-grey-700"
          >
            <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 17.93 8.8L9.41 17.32a2 2 0 0 1-2.83-2.83l7.07-7.07" />
          </svg>
        </span>
        <span className="text-b3 text-grey-900">
          Arrastra o selecciona un archivo
        </span>
        <span id={hintId} className="text-b3 text-grey-500">
          Max 10 mb.
        </span>
      </label>
      <input
        id={id}
        name={name}
        type="file"
        className="sr-only"
        aria-labelledby={labelId}
        aria-describedby={hintId}
        required={required}
      />
    </div>
  );
}

export default function DriversForm() {
  const firstNameId = useId();
  const lastNameId = useId();
  const documentIdId = useId();
  const phoneId = useId();
  const cityId = useId();
  const vehicleId = useId();
  const termsId = useId();
  const documentsLegendId = useId();

  return (
    <section
      id="drivers-form"
      aria-labelledby="drivers-form-heading"
      className="bg-white pb-20 md:pb-24 lg:pb-28"
    >
      <div className="mx-auto w-11/12 max-w-[1280px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-[32px] bg-white px-6 py-12 md:px-8 md:py-16 shadow-hero-card"
        >
          <motion.header
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-12 flex flex-col items-center gap-2 text-center"
          >
            <h2
              id="drivers-form-heading"
              // TODO(TW-060): no exact text-h2 token match for mobile (32px/40px); h2 token is 48px/56px
              className="text-[32px] leading-[40px] md:text-h2 font-bold font-sans text-brand-primary"
            >
              Aplica para formar parte de Bip Bip
            </h2>
            <p
              // TODO(TW-060): align with text-s1 token (18px / 24px line-height differs from leading-7)
              className="text-[18px] leading-7 tracking-[0.2px] text-brand-black max-w-[640px]"
            >
              Completa los campos para empezar a generar ingresos con entregas de Bip Bip.
            </p>
          </motion.header>

          <motion.form
            className="flex flex-col gap-4"
            // TODO(forms): connect to API/server action — currently swallows submit
            onSubmit={(event) => event.preventDefault()}
            noValidate
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.08, delayChildren: 0.15 },
              },
            }}
          >
            <motion.div
              variants={fieldRowVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
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
              <Field label="Nº Documento Identidad" htmlFor={documentIdId}>
                <input
                  id={documentIdId}
                  type="text"
                  name="documentId"
                  autoComplete="off"
                  placeholder="Ej. 1234567898765"
                  className={inputClass}
                />
              </Field>
            </motion.div>

            <motion.div
              variants={fieldRowVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
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
              <Field label="Ciudad" required htmlFor={cityId}>
                <select
                  id={cityId}
                  name="city"
                  autoComplete="address-level2"
                  defaultValue=""
                  required
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
              <Field label="Tipo de vehículo" required htmlFor={vehicleId}>
                <select
                  id={vehicleId}
                  name="vehicle"
                  defaultValue=""
                  required
                  style={selectStyle}
                  className={`${inputClass} appearance-none pr-10`}
                >
                  <option value="" disabled>
                    Selecciona tu vehículo
                  </option>
                  <option value="moto">Motocicleta</option>
                  <option value="car">Automóvil</option>
                  <option value="bike">Bicicleta</option>
                </select>
              </Field>
            </motion.div>

            <motion.fieldset
              variants={fieldRowVariants}
              aria-labelledby={documentsLegendId}
              className="flex flex-col gap-4 border-0 p-0 m-0"
            >
              <legend id={documentsLegendId} className="sr-only">
                Documentación requerida
              </legend>
              <FileField label="Foto de tu DNI" name="dni" required />
              <FileField label="Antecedentes penales" name="antecedentes" required />
              <FileField label="Foto de Licencia" name="licencia" required />
            </motion.fieldset>

            <motion.label
              variants={fieldRowVariants}
              htmlFor={termsId}
              className="flex items-start gap-4 pb-2 pt-2 cursor-pointer"
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
            </motion.label>

            <motion.button
              type="submit"
              variants={fieldRowVariants}
              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
              className="h-12 w-full rounded-lg bg-brand-primary text-button text-white shadow-cta transition-opacity hover:opacity-95"
            >
              Aplicar ahora
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
