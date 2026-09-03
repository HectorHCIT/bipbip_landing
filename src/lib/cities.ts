const DEFAULT_CITIES_URL = "https://dxaf4ach1e7yl.cloudfront.net/Cities/Cities.json";
const CITIES_URL = process.env.CITIES_URL ?? DEFAULT_CITIES_URL;
const REVALIDATE_SECONDS = 3600;

export type City = {
  readonly id: number;
  readonly name: string;
};

/**
 * Cities served while the remote list is unreachable or malformed.
 * Keeping the form usable beats rendering an empty required select.
 */
const FALLBACK_CITIES: readonly City[] = [
  { id: 3, name: "Tegucigalpa" },
  { id: 1, name: "San Pedro Sula" },
];

function isCity(value: unknown): value is City {
  if (typeof value !== "object" || value === null) return false;
  if (!("id" in value) || !("name" in value)) return false;
  return (
    typeof value.id === "number" &&
    typeof value.name === "string" &&
    value.name.trim() !== ""
  );
}

function sortByName(cities: readonly City[]): readonly City[] {
  return [...cities].sort((a, b) => a.name.localeCompare(b.name, "es"));
}

/**
 * Server-only: entries that fail the shape check are dropped, not fatal, so one
 * bad record in the CDN payload cannot take the whole select down.
 * @returns cities sorted by name, or the fallback list when the fetch fails
 */
export async function getCities(): Promise<readonly City[]> {
  try {
    const response = await fetch(CITIES_URL, {
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      console.error(`[cities] ${CITIES_URL} responded ${response.status}`);
      return FALLBACK_CITIES;
    }

    const payload: unknown = await response.json();
    if (!Array.isArray(payload)) {
      console.error("[cities] payload is not an array");
      return FALLBACK_CITIES;
    }

    const entries: readonly unknown[] = payload;
    const cities = entries.filter(isCity);
    if (cities.length === 0) {
      console.error("[cities] payload had no valid entries");
      return FALLBACK_CITIES;
    }

    return sortByName(cities);
  } catch (error) {
    console.error("[cities] fetch failed", error);
    return FALLBACK_CITIES;
  }
}
