import { readFile, writeFile } from "node:fs/promises";
import { catalogSchema, type Product } from "./product.js";

const fixtureUrl = new URL("./products.json", import.meta.url);

function externalCatalogUrl() {
  return process.env.PRODUCTS_SOURCE_URL ?? "https://fakestoreapi.com/products";
}

export async function loadProductCatalog(): Promise<Product[]> {
  const raw = await readFile(fixtureUrl, "utf8");
  const parsed: unknown = JSON.parse(raw);
  const result = catalogSchema.safeParse(parsed);

  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `${issue.path.join(".") || "catalog"}: ${issue.message}`)
      .join("; ");
    throw new Error(`Product fixture is invalid: ${details}`);
  }

  return result.data;
}

export async function deleteProductFromCatalog(id: string): Promise<boolean> {
  const raw = await readFile(fixtureUrl, "utf8");
  const parsed: unknown = JSON.parse(raw);

  if (!Array.isArray(parsed)) {
    throw new Error("Product fixture is invalid");
  }

  const remaining = parsed.filter((entry) => {
    if (!entry || typeof entry !== "object" || !("id" in entry)) {
      return true;
    }

    return entry.id !== id;
  });

  if (remaining.length === parsed.length) {
    return false;
  }

  await writeFile(fixtureUrl, `${JSON.stringify(remaining, null, 2)}\n`, "utf8");
  return true;
}

export async function inspectExternalCatalog(): Promise<string> {
  const sourceUrl = externalCatalogUrl();

  try {
    const response = await fetch(sourceUrl, { signal: AbortSignal.timeout(4000) });

    if (!response.ok) {
      return `External catalog ${sourceUrl} returned HTTP ${response.status}. The server is using the local fixture because that response was not a usable product list.`;
    }

    const payload: unknown = await response.json();

    if (!Array.isArray(payload)) {
      return `External catalog ${sourceUrl} did not return an array. The server is using the local fixture and did not turn that response into an empty product list.`;
    }

    const sample = payload[0];
    const fields =
      sample && typeof sample === "object" ? Object.keys(sample).sort().join(", ") : "none";
    const mapped = catalogSchema.safeParse(payload);

    if (mapped.success) {
      return `External catalog ${sourceUrl} matches the assignment product model (${payload.length} products). This server still serves the validated local fixture.`;
    }

    return `External catalog ${sourceUrl} returned ${payload.length} records. A sample record has fields: ${fields}. Brand, availability, and currency are not present, so the records were not mapped or served. The API uses the validated local fixture.`;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return `External catalog ${sourceUrl} could not be inspected (${message}). The server is using the validated local fixture.`;
  }
}
