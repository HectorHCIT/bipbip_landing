"use client";

import { useState, useId } from "react";
import Image from "next/image";
import SectionHeading from "@/components/ui/section-heading";
import Button from "@/components/ui/button";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Ingresá tu nombre.";
  if (!values.email.trim()) errors.email = "Ingresá tu correo.";
  else if (!EMAIL_RE.test(values.email)) errors.email = "Ingresá un correo válido.";
  if (!values.message.trim()) errors.message = "Escribí un mensaje.";
  else if (values.message.trim().length < 10)
    errors.message = "El mensaje debe tener al menos 10 caracteres.";
  return errors;
}

export default function HelpContact() {
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

  const [values, setValues] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    // Stub submit — TODO(landing-v1): wire to real backend (Resend / Formspree / API route)
    console.log("[help-contact] submit", values);
    await new Promise<void>((r) => setTimeout(r, 800));
    setStatus("success");
  }

  return (
    <section id="help" className="bg-grey-light py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Decorative illustration */}
          <div
            className="flex justify-center lg:justify-start"
            aria-hidden="true"
          >
            <Image
              src="/illustration/callcentergirl.svg"
              alt=""
              width={420}
              height={420}
              className="h-auto w-full max-w-[420px]"
            />
          </div>

          {/* Form column */}
          <div>
            <SectionHeading
              eyebrow="Contacto"
              title="¿Necesitas ayuda?"
              subtitle="Escribínos y te respondemos a la brevedad."
              align="left"
            />

            {status === "success" ? (
              <div
                role="status"
                aria-live="polite"
                className="mt-8 rounded-xl bg-white p-6 text-text-default"
              >
                <p className="text-s1 font-semibold">¡Mensaje enviado!</p>
                <p className="mt-2 text-b2">
                  Gracias por escribirnos. Te respondemos pronto.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="mt-8 flex flex-col gap-4"
                aria-live="polite"
              >
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor={nameId}
                    className="text-s2 text-text-default"
                  >
                    Nombre
                  </label>
                  <input
                    id={nameId}
                    name="name"
                    type="text"
                    required
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby={
                      errors.name ? `${nameId}-error` : undefined
                    }
                    value={values.name}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, name: e.target.value }))
                    }
                    className="w-full rounded-xl border border-border-default bg-white px-4 py-3 text-b2 focus-visible:outline-2 focus-visible:outline-brand-primary"
                  />
                  {errors.name && (
                    <span
                      id={`${nameId}-error`}
                      role="alert"
                      className="text-b3 text-error"
                    >
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor={emailId}
                    className="text-s2 text-text-default"
                  >
                    Correo electrónico
                  </label>
                  <input
                    id={emailId}
                    name="email"
                    type="email"
                    required
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={
                      errors.email ? `${emailId}-error` : undefined
                    }
                    value={values.email}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, email: e.target.value }))
                    }
                    className="w-full rounded-xl border border-border-default bg-white px-4 py-3 text-b2 focus-visible:outline-2 focus-visible:outline-brand-primary"
                  />
                  {errors.email && (
                    <span
                      id={`${emailId}-error`}
                      role="alert"
                      className="text-b3 text-error"
                    >
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor={messageId}
                    className="text-s2 text-text-default"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id={messageId}
                    name="message"
                    required
                    minLength={10}
                    rows={5}
                    aria-invalid={errors.message ? true : undefined}
                    aria-describedby={
                      errors.message ? `${messageId}-error` : undefined
                    }
                    value={values.message}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, message: e.target.value }))
                    }
                    className="w-full resize-none rounded-xl border border-border-default bg-white px-4 py-3 text-b2 focus-visible:outline-2 focus-visible:outline-brand-primary"
                  />
                  {errors.message && (
                    <span
                      id={`${messageId}-error`}
                      role="alert"
                      className="text-b3 text-error"
                    >
                      {errors.message}
                    </span>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Enviando..." : "Enviar mensaje"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
