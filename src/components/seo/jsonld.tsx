import type { ReactElement } from "react";

type JsonLdData =
  | Record<string, unknown>
  | ReadonlyArray<Record<string, unknown>>;

interface JsonLdProps {
  data: JsonLdData;
}

/**
 * Server component that emits one or more `<script type="application/ld+json">`
 * tags. Pass a single schema object or an array of schemas.
 *
 * This is the canonical Next.js pattern for inlining JSON-LD; the
 * `dangerouslySetInnerHTML` usage is intentional and safe because the input
 * comes from typed schema builders, not user data.
 */
export function JsonLd({ data }: JsonLdProps): ReactElement {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
