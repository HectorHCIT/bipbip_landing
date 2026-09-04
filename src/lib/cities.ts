const DEFAULT_RESTAURANT_CITIES_URL =
  "https://dxaf4ach1e7yl.cloudfront.net/Cities/Cities.json";
const DEFAULT_DRIVER_CITIES_URL =
  "https://dxaf4ach1e7yl.cloudfront.net/Cities/DriverCities.json";

const RESTAURANT_CITIES_URL = process.env.CITIES_URL ?? DEFAULT_RESTAURANT_CITIES_URL;
const DRIVER_CITIES_URL = process.env.DRIVER_CITIES_URL ?? DEFAULT_DRIVER_CITIES_URL;
const REVALIDATE_SECONDS = 3600;

export type City = {
  readonly id: number;
  readonly name: string;
};

/**
 * Cities served while a remote list is unreachable or malformed.
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

async function fetchCities(url: string, label: string): Promise<readonly City[]> {
  try {
    const response = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });

    if (!response.ok) {
      console.error(`[${label}] ${url} responded ${response.status}`);
      return FALLBACK_CITIES;
    }

    const payload: unknown = await response.json();
    if (!Array.isArray(payload)) {
      console.error(`[${label}] payload is not an array`);
      return FALLBACK_CITIES;
    }

    const entries: readonly unknown[] = payload;
    const cities = entries.filter(isCity);
    if (cities.length === 0) {
      console.error(`[${label}] payload had no valid entries`);
      return FALLBACK_CITIES;
    }

    return sortByName(cities);
  } catch (error) {
    console.error(`[${label}] fetch failed`, error);
    return FALLBACK_CITIES;
  }
}

/**
 * Server-only. Cities where a restaurant can sign up — a different set from
 * the driver list, so the two are never interchangeable.
 * @returns cities sorted by name, or the fallback list when the fetch fails
 */
export async function getRestaurantCities(): Promise<readonly City[]> {
  return fetchCities(RESTAURANT_CITIES_URL, "restaurant-cities");
}

/**
 * Server-only. Cities open for driver recruitment, which reaches towns with no
 * restaurant operation yet.
 * @returns cities sorted by name, or the fallback list when the fetch fails
 */
export async function getDriverCities(): Promise<readonly City[]> {
  return fetchCities(DRIVER_CITIES_URL, "driver-cities");
}
