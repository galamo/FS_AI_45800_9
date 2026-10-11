import type { DogBreed, DogMeasure } from "./dog-type"

const SLICE_COLORS = [
  "#1565c0",
  "#00897b",
  "#ef6c00",
  "#6a1b9a",
  "#c62828",
  "#2e7d32",
  "#6d4c41",
  "#0277bd",
  "#ad1457",
  "#455a64",
]

export type DogChartSlice = {
  id: string
  label: string
  value: number
  color: string
}

export type DogWeightRow = {
  name: string
  male: number
  female: number
}

export type DogLifeRow = {
  name: string
  years: number
}

export type DogCharts = {
  coats: DogChartSlice[]
  countries: DogChartSlice[]
  hypoallergenic: DogChartSlice[]
  weights: DogWeightRow[]
  lifeSpans: DogLifeRow[]
  hypoallergenicCount: number
  countryCount: number
  heaviest: { name: string; kg: number } | null
}

function measureAverage(measure: DogMeasure | undefined) {
  if (measure?.min == null || measure.max == null) {
    return null
  }

  return (measure.min + measure.max) / 2
}

function titleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function coatTypeLabel(breed: DogBreed) {
  const type = breed.attributes.coat?.type
  return type ? titleCase(type) : "Unknown"
}

export function countryLabel(breed: DogBreed) {
  return breed.attributes.origin?.country || "Unknown"
}

function countBy(breeds: DogBreed[], labelOf: (breed: DogBreed) => string) {
  const counts = new Map<string, number>()

  for (const breed of breeds) {
    const label = labelOf(breed)
    counts.set(label, (counts.get(label) ?? 0) + 1)
  }

  return [...counts.entries()]
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value || a.label.localeCompare(b.label))
}

function toSlices(rows: { label: string; value: number }[]) {
  return rows
    .filter((row) => row.value > 0)
    .map((row, index) => ({
      id: row.label,
      label: row.label,
      value: row.value,
      color: SLICE_COLORS[index % SLICE_COLORS.length],
    }))
}

export function buildCoatSlices(breeds: DogBreed[]) {
  return toSlices(countBy(breeds, coatTypeLabel))
}

export function buildHypoallergenicSlices(breeds: DogBreed[]) {
  const hypoallergenicCount = breeds.filter((breed) => breed.attributes.hypoallergenic).length
  const hypoallergenic = toSlices([
    { label: "Hypoallergenic", value: hypoallergenicCount },
    { label: "Not hypoallergenic", value: breeds.length - hypoallergenicCount },
  ])
  if (hypoallergenic[0]?.label === "Hypoallergenic") {
    hypoallergenic[0].color = "#2e7d32"
  }
  if (hypoallergenic[1]?.label === "Not hypoallergenic") {
    hypoallergenic[1].color = "#90a4ae"
  }

  return hypoallergenic
}

export function buildDogCharts(breeds: DogBreed[]): DogCharts {
  const coats = buildCoatSlices(breeds)

  const countries = toSlices(countBy(breeds, countryLabel))

  const hypoallergenic = buildHypoallergenicSlices(breeds)
  const hypoallergenicCount =
    hypoallergenic.find((slice) => slice.label === "Hypoallergenic")?.value ?? 0

  const weights = breeds
    .flatMap((breed) => {
      const male = measureAverage(breed.attributes.male_weight)
      const female = measureAverage(breed.attributes.female_weight)
      if (male == null || female == null) {
        return []
      }

      return [{ name: breed.attributes.name, male, female }]
    })
    .sort((a, b) => b.male - a.male || a.name.localeCompare(b.name))

  const lifeSpans = breeds
    .flatMap((breed) => {
      const years = measureAverage(breed.attributes.life)
      if (years == null) {
        return []
      }

      return [{ name: breed.attributes.name, years }]
    })
    .sort((a, b) => b.years - a.years || a.name.localeCompare(b.name))

  const heaviest = weights[0] ? { name: weights[0].name, kg: weights[0].male } : null

  return {
    coats,
    countries,
    hypoallergenic,
    weights,
    lifeSpans,
    hypoallergenicCount,
    countryCount: countries.filter((row) => row.label !== "Unknown").length,
    heaviest,
  }
}

export function formatChartNumber(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1)
}

export function chartHeight(rowCount: number) {
  return Math.max(280, rowCount * 32 + 48)
}
