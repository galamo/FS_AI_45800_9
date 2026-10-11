export const DOG_COLUMN_IDS = [
  "photo",
  "name",
  "origin",
  "life",
  "maleWeight",
  "maleHeight",
  "coat",
  "hypoallergenic",
  "description",
] as const

export type DogColumnId = (typeof DOG_COLUMN_IDS)[number]

export const DOG_COLUMN_LABELS: Record<DogColumnId, string> = {
  photo: "Photo",
  name: "Name",
  origin: "Origin",
  life: "Life span",
  maleWeight: "Male weight",
  maleHeight: "Male height",
  coat: "Coat",
  hypoallergenic: "Hypoallergenic",
  description: "Description",
}

export const DOG_COLUMNS = DOG_COLUMN_IDS.map((id) => ({
  id,
  label: DOG_COLUMN_LABELS[id],
}))

const STORAGE_KEY = "lab1.dogs.visibleColumns"

const columnIdSet = new Set<string>(DOG_COLUMN_IDS)

export function normalizeVisibleDogColumns(value: unknown): DogColumnId[] {
  if (!Array.isArray(value)) {
    return []
  }

  const picked = new Set(
    value.filter((id): id is DogColumnId => typeof id === "string" && columnIdSet.has(id)),
  )

  return DOG_COLUMN_IDS.filter((id) => picked.has(id))
}

export function readVisibleDogColumns(): DogColumnId[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return [...DOG_COLUMN_IDS]
    }

    const columns = normalizeVisibleDogColumns(JSON.parse(raw))
    return columns.length > 0 ? columns : [...DOG_COLUMN_IDS]
  } catch {
    return [...DOG_COLUMN_IDS]
  }
}

export function writeVisibleDogColumns(columns: readonly DogColumnId[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(columns))
  } catch {
    // Ignore quota and private-mode failures. Redux still holds the selection.
  }
}
