import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main"
      className="flex min-h-screen flex-col items-center justify-center gap-6 bg-bg-page px-6 text-center"
    >
      <h1 className="text-[28px] leading-[36px] md:text-[38px] md:leading-[44px] font-bold font-sans text-brand-black">
        Página no encontrada
      </h1>
      <p className="text-b2 max-w-md text-grey-700">
        La ruta que buscás no existe.
      </p>
      <Link
        href="/"
        className="text-button inline-flex items-center justify-center rounded-xl bg-brand-primary px-5 py-3 font-sans font-bold text-white transition-colors hover:bg-brand-primary/90"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
