"use client";

import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("App error boundary:", error);
  }, [error]);

  return (
    <main
      id="main"
      className="flex min-h-screen flex-col items-center justify-center gap-6 bg-bg-page px-6 text-center"
    >
      <h1 className="text-h2 text-brand-black">Algo salió mal</h1>
      <p className="text-b2 max-w-md text-grey-700">
        Ocurrió un error inesperado. Por favor, intentá de nuevo en unos
        segundos.
      </p>
      <button
        type="button"
        onClick={reset}
        className="text-button inline-flex items-center justify-center rounded-xl bg-brand-primary px-5 py-3 font-sans font-bold text-white transition-colors hover:bg-brand-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Reintentar
      </button>
    </main>
  );
}
