"use client";

import Link from "next/link";
import { useId, useRef, useState, type ReactNode } from "react";

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

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const IMAGE_ACCEPT = "image/jpeg,image/png,image/webp";
const PDF_ACCEPT = "application/pdf";
const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const PDF_TYPES = new Set(["application/pdf"]);

type FileKey = "dni" | "licencia" | "antecedentes";

type FileSlot = { file: File | null; error: string | null };

type FilesState = Record<FileKey, FileSlot>;

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

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

function FileField({
  label,
  name,
  accept,
  hint,
  slot,
  onChange,
  required = false,
}: {
  label: string;
  name: FileKey;
  accept: string;
  hint: string;
  slot: FileSlot;
  onChange: (key: FileKey, file: File | null) => void;
  required?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const id = useId();
  const labelId = `${id}-label`;
  const hintId = `${id}-${name}-hint`;
  const errorId = `${id}-${name}-error`;

  return (
    <div className="flex flex-col gap-1">
      <span id={labelId} className="text-b3 text-grey-900">
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
          {slot.file ? slot.file.name : "Arrastra o selecciona un archivo"}
        </span>
        <span id={hintId} className="text-b3 text-grey-500">
          {slot.file ? formatBytes(slot.file.size) : hint}
        </span>
      </label>
      <input
        id={id}
        ref={inputRef}
        name={name}
        type="file"
        accept={accept}
        className="sr-only"
        aria-labelledby={labelId}
        aria-describedby={slot.error ? errorId : hintId}
        aria-invalid={slot.error ? true : undefined}
        required={required}
        onChange={(event) => {
          const file = event.currentTarget.files?.[0] ?? null;
          onChange(name, file);
        }}
      />
      {slot.error && (
        <span id={errorId} role="alert" className="anim-load-down text-caption text-error">
          {slot.error}
        </span>
      )}
    </div>
  );
}

function validateFile(name: FileKey, file: File): string | null {
  if (file.size > MAX_FILE_SIZE) {
    return `El archivo supera los 5 MB (${formatBytes(file.size)}).`;
  }
  const allowed = name === "antecedentes" ? PDF_TYPES : IMAGE_TYPES;
  if (!allowed.has(file.type)) {
    return name === "antecedentes"
      ? "Solo se acepta PDF."
      : "Solo se aceptan JPG, PNG o WebP.";
  }
  return null;
}

const INITIAL_FILES: FilesState = {
  dni: { file: null, error: null },
  licencia: { file: null, error: null },
  antecedentes: { file: null, error: null },
};

export default function DriversForm() {
  const firstNameId = useId();
  const lastNameId = useId();
  const documentIdId = useId();
  const phoneId = useId();
  const cityId = useId();
  const vehicleId = useId();
  const termsId = useId();
  const documentsLegendId = useId();

  const [files, setFiles] = useState<FilesState>(INITIAL_FILES);
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });

  function handleFileChange(key: FileKey, file: File | null) {
    if (!file) {
      setFiles((prev) => ({ ...prev, [key]: { file: null, error: null } }));
      return;
    }
    const error = validateFile(key, file);
    setFiles((prev) => ({ ...prev, [key]: { file: error ? null : file, error } }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const missing = (Object.keys(files) as FileKey[]).filter((k) => !files[k].file);
    if (missing.length > 0) {
      setFiles((prev) => {
        const next = { ...prev };
        for (const key of missing) {
          next[key] = { file: null, error: "Este archivo es obligatorio." };
        }
        return next;
      });
      setSubmitState({
        status: "error",
        message: "Faltan documentos por adjuntar.",
      });
      return;
    }

    setSubmitState({ status: "submitting" });
    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    formData.set("dni", files.dni.file!);
    formData.set("licencia", files.licencia.file!);
    formData.set("antecedentes", files.antecedentes.file!);

    try {
      const response = await fetch("/api/drivers", {
        method: "POST",
        body: formData,
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
      id="drivers-form"
      aria-labelledby="drivers-form-heading"
      className="bg-white pb-20 md:pb-24 lg:pb-28 xl:pb-36"
    >
      <div className="mx-auto w-11/12 max-w-[1280px]">
        <div className="anim-reveal-up rounded-[32px] bg-white px-6 py-12 md:px-8 md:py-16 shadow-hero-card">
          <header className="anim-reveal-up mb-12 flex flex-col items-center gap-2 text-center">
            <h2
              id="drivers-form-heading"
              // TODO(TW-060): no exact text-h2 token match for mobile (32px/40px); h2 token is 48px/56px
              className="text-[32px] leading-[40px] md:text-h2 xl:text-[56px] xl:leading-[64px] font-bold font-sans text-brand-primary"
            >
              Aplica para formar parte de Bip Bip
            </h2>
            <p
              // TODO(TW-060): align with text-s1 token (18px / 24px line-height differs from leading-7)
              className="text-[18px] leading-7 tracking-[0.2px] text-brand-black max-w-[640px]"
            >
              Completa los campos para empezar a generar ingresos con entregas de Bip Bip.
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
                Gracias por aplicar. Nuestro equipo de logística te contactará pronto.
              </p>
            </div>
          ) : (
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit}
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
              </div>

              <fieldset
                aria-labelledby={documentsLegendId}
                className="anim-reveal-up flex flex-col gap-4 border-0 p-0 m-0"
              >
                <legend id={documentsLegendId} className="sr-only">
                  Documentación requerida
                </legend>
                <FileField
                  label="Foto de tu DNI"
                  name="dni"
                  accept={IMAGE_ACCEPT}
                  hint="JPG, PNG o WebP. Máx 5 MB."
                  slot={files.dni}
                  onChange={handleFileChange}
                  required
                />
                <FileField
                  label="Antecedentes penales"
                  name="antecedentes"
                  accept={PDF_ACCEPT}
                  hint="Solo PDF. Máx 5 MB."
                  slot={files.antecedentes}
                  onChange={handleFileChange}
                  required
                />
                <FileField
                  label="Foto de Licencia"
                  name="licencia"
                  accept={IMAGE_ACCEPT}
                  hint="JPG, PNG o WebP. Máx 5 MB."
                  slot={files.licencia}
                  onChange={handleFileChange}
                  required
                />
              </fieldset>

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
