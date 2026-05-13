export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Cargando"
      className="flex min-h-screen items-center justify-center bg-bg-page"
    >
      <div
        aria-hidden="true"
        className="h-12 w-12 animate-spin rounded-full border-4 border-grey-200 border-t-brand-primary motion-reduce:animate-none"
      />
    </div>
  );
}
