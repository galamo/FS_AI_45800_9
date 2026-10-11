import type { DogBreed } from "./dog-type"

export const DOG_TEXT_FILTER_ATTRIBUTES = [
  { id: "name", label: "Name" },
  { id: "description", label: "Description" },
  { id: "origin", label: "Origin" },
  { id: "coat", label: "Coat" },
] as const

export type DogTextFilterAttribute = (typeof DOG_TEXT_FILTER_ATTRIBUTES)[number]["id"]

export type DogTableFilters = {
  attribute: DogTextFilterAttribute
  query: string
  dogTypes: readonly string[]
  hypoallergenic: readonly string[]
}

export function dogTypeValue(breed: DogBreed) {
  const type = breed.attributes.coat?.type?.trim()
  return type || "Unknown"
}

export function hypoallergenicValue(breed: DogBreed) {
  return breed.attributes.hypoallergenic ? "Yes" : "No"
}

function attributeText(breed: DogBreed, attribute: DogTextFilterAttribute) {
  switch (attribute) {
    case "name":
      return breed.attributes.name
    case "description":
      return breed.attributes.description
    case "origin":
      return breed.attributes.origin?.country ?? ""
    case "coat": {
      const { type, length } = breed.attributes.coat ?? {}
      return [type, length].filter(Boolean).join(", ")
    }
  }
}

export function uniqueSorted(values: Iterable<string>) {
  return [...new Set(values)].sort((left, right) =>
    left.localeCompare(right, undefined, { sensitivity: "base" }),
  )
}

export function filterDogBreeds(breeds: readonly DogBreed[], filters: DogTableFilters) {
  const query = filters.query.trim().toLowerCase()
  const types = new Set(filters.dogTypes)
  const dogsTypesArray = filters.dogTypes
  const hypoallergenic = new Set(filters.hypoallergenic)

  return breeds.filter((breed) => {
    // if (query && !attributeText(breed, filters.attribute).toLowerCase().includes(query)) {
    if(query && !attributeText(breed, filters.attribute).toLowerCase().includes(query)){
      return false
      // return breed.attributes.name.toLowerCase().includes(query)
      
    }
    console.log(types, typeof types)
    if (types.size > 0 && !types.has(dogTypeValue(breed))) {
      return false
    }

    // if (dogsTypesArray.length > 0 && !dogsTypesArray.some(type => type === dogTypeValue(breed))) {
    //   return false
    // }

    if (hypoallergenic.size > 0 && !hypoallergenic.has(hypoallergenicValue(breed))) {
      return false
    }

    return true
  })
}
