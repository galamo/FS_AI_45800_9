import axios from "axios"
import type { DogBreedsPage, DogBreedsResponse } from "./dog-type"

const DOGS_URL = "https://dogapi.dog/api/v2/breeds"

export const DOGS_PAGE_SIZE = 30

export async function getDogBreedsApi(pageNumber: number): Promise<DogBreedsPage> {
  const { data } = await axios.get<DogBreedsResponse>(DOGS_URL, {
    params: {
      "page[number]": pageNumber,
    },
  })

  if (!Array.isArray(data?.data)) {
    throw new Error("Dog breeds response was not a list")
  }

  return {
    breeds: data.data,
    page: data.meta.pagination.current,
    totalRecords: data.meta.pagination.records,
  }
}
