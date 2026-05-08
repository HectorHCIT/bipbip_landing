"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const inputClass =
  "h-12 w-full rounded-lg border border-grey-200 bg-white px-4 py-2 text-[14px] leading-5 tracking-[0.2px] text-grey-700 placeholder:text-grey-500 shadow-[0_5px_12px_rgba(0,0,0,0.05)] focus:outline-none focus:border-brand-primary transition-colors";

const selectChevronUrl =
  "url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20stroke%3D%22%231a1a1a%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m4%207%206%206%206-6%22/%3E%3C/svg%3E')";

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
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[14px] leading-5 tracking-[0.2px] text-grey-900">
        {label}
        {required && <span className="text-error">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function RestaurantsForm() {
  return (
    <section
      id="restaurants-form"
      aria-labelledby="restaurants-form-heading"
      className="bg-white pb-20 md:pb-24 lg:pb-28"
    >
      <div className="mx-auto w-11/12 max-w-[1280px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-[32px] bg-white px-6 py-12 md:px-8 md:py-16 shadow-[0_10px_40px_0_rgba(0,0,0,0.08)]"
        >
          <motion.header
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-12 flex flex-col items-center gap-2 text-center"
          >
            <h2
              id="restaurants-form-heading"
              className="text-[32px] leading-[40px] md:text-[48px] md:leading-[56px] font-bold font-sans text-brand-primary"
            >
              Aplica para vender con BipBip
            </h2>
            <p className="text-[18px] leading-7 tracking-[0.2px] text-brand-black max-w-[720px]">
              Completa tus datos y nuestro equipo te contactará para ayudarte a comenzar a vender en BipBip.
            </p>
          </motion.header>

          <motion.form
            className="flex flex-col gap-4"
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
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <Field label="Nombre" required>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Ej. Luis Carlos"
                  className={inputClass}
                />
              </Field>
              <Field label="Apellido" required>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Ej. Fernández León"
                  className={inputClass}
                />
              </Field>
              <Field label="Correo electrónico">
                <input
                  type="email"
                  name="email"
                  placeholder="Ej. prueba@email.com"
                  className={inputClass}
                />
              </Field>
            </motion.div>

            <motion.div
              variants={fieldRowVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <Field label="Número de teléfono" required>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Ej. +50499123456"
                  className={inputClass}
                />
              </Field>
              <Field label="Dirección del negocio">
                <input
                  type="text"
                  name="address"
                  placeholder="Ej. Av circunvalación..."
                  className={inputClass}
                />
              </Field>
              <Field label="Ciudad">
                <select
                  name="city"
                  defaultValue=""
                  style={{
                    backgroundImage: selectChevronUrl,
                    backgroundSize: "20px 20px",
                    backgroundPosition: "right 16px center",
                    backgroundRepeat: "no-repeat",
                  }}
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
            </motion.div>

            <motion.div
              variants={fieldRowVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <Field label="Tipo de negocio">
                <select
                  name="businessType"
                  defaultValue=""
                  style={{
                    backgroundImage: selectChevronUrl,
                    backgroundSize: "20px 20px",
                    backgroundPosition: "right 16px center",
                    backgroundRepeat: "no-repeat",
                  }}
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
              <Field label="Nombre de la marca" required>
                <input
                  type="text"
                  name="brandName"
                  placeholder="Ej. La Pizzería del Centro"
                  className={inputClass}
                />
              </Field>
            </motion.div>

            <motion.label
              variants={fieldRowVariants}
              className="flex items-start gap-4 pb-2 pt-2 cursor-pointer"
            >
              <input
                type="checkbox"
                defaultChecked
                className="mt-0.5 size-6 shrink-0 cursor-pointer rounded accent-brand-primary"
              />
              <span className="text-[14px] leading-5 tracking-[0.2px] text-brand-black">
                Acepto que he leído y estoy de acuerdo con las{" "}
                <a href="/privacy" className="underline">
                  políticas de privacidad
                </a>{" "}
                y los{" "}
                <a href="/terms" className="underline">
                  términos y condiciones.
                </a>
              </span>
            </motion.label>

            <motion.button
              type="submit"
              variants={fieldRowVariants}
              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
              className="h-12 w-full rounded-lg bg-brand-primary text-button text-white shadow-[0_5px_24px_rgba(0,0,0,0.05)] transition-opacity hover:opacity-95"
            >
              Aplicar ahora
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
