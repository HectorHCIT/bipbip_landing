import SectionHeading from "@/components/ui/section-heading";

const partners = [
  "KFC",
  "Denny's",
  "Pizza Hut",
  "Chicken Wings",
  "Wendy's",
  "Burger King",
] as const;

export default function Partners() {
  return (
    <section id="partners" className="bg-grey-light py-12 md:py-16">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Restaurantes aliados"
          title="Tus marcas favoritas en un solo lugar"
          align="center"
        />
        <ul className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8 items-center">
          {partners.map((p) => (
            <li
              key={p}
              className="flex items-center justify-center text-text-muted grayscale opacity-70 text-s1 font-bold tracking-wide"
            >
              {p}
            </li>
          ))}
        </ul>
        {/* TODO(landing-v1): replace text placeholders with real logo assets once licensing is confirmed */}
      </div>
    </section>
  );
}
