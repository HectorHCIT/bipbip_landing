"use client";

import { useState, useId } from "react";
import Image from "next/image";
import Button from "@/components/ui/button";
import { cdn } from "@/lib/cdn";

type FormState = {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s\-()]{6,}$/;

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Ingresa tu nombre.";
  if (!values.lastName.trim()) errors.lastName = "Ingresa tu apellido.";
  if (!values.email.trim()) errors.email = "Ingresa tu email.";
  else if (!EMAIL_RE.test(values.email)) errors.email = "Ingresa un email válido.";
  if (!values.phone.trim()) errors.phone = "Ingresa tu número de teléfono.";
  else if (!PHONE_RE.test(values.phone)) errors.phone = "Ingresa un teléfono válido.";
  if (!values.message.trim()) errors.message = "Escribe un mensaje.";
  else if (values.message.trim().length < 10)
    errors.message = "El mensaje debe tener al menos 10 caracteres.";
  return errors;
}

const inputBase =
  "w-full h-12 rounded-lg border border-grey-200 bg-white px-4 text-b3 text-brand-black placeholder:text-grey-500 shadow-card focus-visible:outline-2 focus-visible:outline-brand-primary";

const labelBase = "text-caption text-grey-900 font-sans";

export default function HelpContact() {
  const nameId = useId();
  const lastNameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const messageId = useId();

  const [values, setValues] = useState<FormState>({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitState({ status: "submitting" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(
          data?.error ?? "No pudimos enviar tu mensaje. Intenta de nuevo."
        );
      }
      setSubmitState({ status: "success" });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No pudimos enviar tu mensaje. Intenta de nuevo.";
      setSubmitState({ status: "error", message });
    }
  }

  const isSubmitting = submitState.status === "submitting";
  const submitStatusMessage =
    submitState.status === "submitting"
      ? "Enviando mensaje..."
      : submitState.status === "success"
      ? "Mensaje enviado correctamente."
      : submitState.status === "error"
      ? submitState.message
      : "";

  return (
    <section
      id="help"
      className="relative overflow-hidden bg-white pt-20 pb-32 md:pt-24 md:pb-40 lg:pt-28 lg:pb-48 xl:pt-36 xl:pb-56"
      aria-labelledby="help-heading"
    >
      <div className="relative mx-auto w-11/12 max-w-[1440px]">
        <header className="flex flex-col items-center gap-2 text-center">
          <h2
            id="help-heading"
            className="anim-reveal-up text-[36px] leading-[44px] md:text-h2 xl:text-[56px] xl:leading-[64px] font-bold font-sans text-brand-primary"
          >
            ¿Necesitas Ayuda?
          </h2>
          <p className="anim-reveal-up text-[18px] leading-7 md:text-[20px] md:leading-7 xl:text-[24px] xl:leading-8 font-bold font-sans text-brand-black">
            Estamos aquí para resolver tus dudas y mejorar tu experiencia
          </p>
        </header>

        <div className="anim-reveal-up relative mt-14 mx-auto w-full lg:max-w-[1080px] xl:max-w-[1320px] rounded-3xl bg-grey-200 p-3 md:p-8 lg:p-8 xl:p-12 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] xl:grid-cols-[540px_1fr] items-center gap-8 lg:gap-10 xl:gap-14">
            <div
              className="anim-reveal-left flex justify-center lg:justify-start"
              aria-hidden="true"
            >
              <Image
                src={cdn("/illustration/callcentergirl.svg")}
                alt=""
                width={368}
                height={434}
                className="h-auto w-full max-w-[220px] sm:max-w-[280px] md:max-w-[340px] lg:max-w-none"
                style={{ width: "auto", height: "auto" }}
              />
            </div>

            {submitState.status === "success" ? (
              <div
                role="status"
                aria-live="polite"
                className="anim-load-right w-full lg:max-w-[440px] xl:max-w-[640px] lg:justify-self-center rounded-2xl bg-white p-4 md:p-6 lg:p-8 text-brand-black"
              >
                <p className="text-h5 font-sans">¡Mensaje enviado!</p>
                <p className="mt-2 text-b2">
                  Gracias por escribirnos. Te respondemos pronto.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="anim-reveal-right w-full lg:max-w-[440px] xl:max-w-[640px] lg:justify-self-center flex flex-col gap-4 rounded-2xl bg-white p-4 md:p-6 lg:p-8"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor={nameId} className={labelBase}>
                      Nombre<span className="text-error">*</span>
                    </label>
                    <input
                      id={nameId}
                      name="name"
                      type="text"
                      required
                      autoComplete="given-name"
                      placeholder="Ingresa tu nombre"
                      aria-invalid={errors.name ? true : undefined}
                      aria-describedby={`${nameId}-error`}
                      value={values.name}
                      onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                      className={inputBase}
                    />
                    <span
                      id={`${nameId}-error`}
                      aria-live="polite"
                      className="text-caption text-error min-h-4"
                    >
                      {errors.name ?? ""}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor={lastNameId} className={labelBase}>
                      Apellido<span className="text-error">*</span>
                    </label>
                    <input
                      id={lastNameId}
                      name="lastName"
                      type="text"
                      required
                      autoComplete="family-name"
                      placeholder="Ingresa tu apellido"
                      aria-invalid={errors.lastName ? true : undefined}
                      aria-describedby={`${lastNameId}-error`}
                      value={values.lastName}
                      onChange={(e) => setValues((v) => ({ ...v, lastName: e.target.value }))}
                      className={inputBase}
                    />
                    <span
                      id={`${lastNameId}-error`}
                      aria-live="polite"
                      className="text-caption text-error min-h-4"
                    >
                      {errors.lastName ?? ""}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor={emailId} className={labelBase}>
                    Email<span className="text-error">*</span>
                  </label>
                  <input
                    id={emailId}
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Ingresa tu email"
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={`${emailId}-error`}
                    value={values.email}
                    onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                    className={inputBase}
                  />
                  <span
                    id={`${emailId}-error`}
                    aria-live="polite"
                    className="text-caption text-error min-h-4"
                  >
                    {errors.email ?? ""}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor={phoneId} className={labelBase}>
                    Número de teléfono<span className="text-error">*</span>
                  </label>
                  <input
                    id={phoneId}
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="Ingresa tu número de teléfono"
                    aria-invalid={errors.phone ? true : undefined}
                    aria-describedby={`${phoneId}-error`}
                    value={values.phone}
                    onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
                    className={inputBase}
                  />
                  <span
                    id={`${phoneId}-error`}
                    aria-live="polite"
                    className="text-caption text-error min-h-4"
                  >
                    {errors.phone ?? ""}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor={messageId} className={labelBase}>
                    Comentario<span className="text-error">*</span>
                  </label>
                  <textarea
                    id={messageId}
                    name="message"
                    required
                    minLength={10}
                    rows={5}
                    placeholder="Deja tu mensaje"
                    aria-invalid={errors.message ? true : undefined}
                    aria-describedby={`${messageId}-error`}
                    value={values.message}
                    onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                    className="w-full resize-none rounded-lg border border-grey-200 bg-white px-4 py-3 text-b3 text-brand-black placeholder:text-grey-500 shadow-card focus-visible:outline-2 focus-visible:outline-brand-primary"
                  />
                  <span
                    id={`${messageId}-error`}
                    aria-live="polite"
                    className="text-caption text-error min-h-4"
                  >
                    {errors.message ?? ""}
                  </span>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full text-white shadow-cta"
                >
                  {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                </Button>
                <span aria-live="polite" className="sr-only">
                  {submitStatusMessage}
                </span>
              </form>
            )}
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="anim-reveal-right pointer-events-none absolute hidden lg:block right-0 top-[55%] w-[280px] xl:w-[334px] z-10 select-none"
      >
        <div className="anim-float-slow">
          <Image
            src={cdn("/floating/pizza.svg")}
            alt=""
            width={334}
            height={334}
            className="h-auto w-full drop-shadow-[0_16px_24px_rgba(0,0,0,0.18)]"
            style={{ width: "auto", height: "auto" }}
          />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="anim-reveal-left pointer-events-none absolute hidden md:block left-0 bottom-12 w-[160px] lg:w-[244px] xl:w-[280px] z-10 select-none"
      >
        <div
          className="anim-float-slow"
          style={{ animationDuration: "6s" }}
        >
          <Image
            src={cdn("/floating/egg.svg")}
            alt=""
            width={244}
            height={244}
            className="h-auto w-full drop-shadow-[0_14px_14px_rgba(0,0,0,0.15)]"
            style={{ width: "auto", height: "auto" }}
          />
        </div>
      </div>
    </section>
  );
}
