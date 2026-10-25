export type DogMeasure = {
  min: number
  max: number
}

export type DogImage = {
  id: string
  url: string
  thumb: string
  medium: string
  large: string
}

export type DogBreedAttributes = {
  name: string
  description: string
  life: DogMeasure
  male_weight: DogMeasure
  female_weight: DogMeasure
  hypoallergenic: boolean
  male_height: DogMeasure
  female_height: DogMeasure
  origin?: {
    era?: string
    region?: string
    country?: string
  }
  coat?: {
    type?: string
    colors?: string[]
    length?: string
  }
  images?: DogImage[]
}

export type DogBreed = {
  id: string
  type: string
  attributes: DogBreedAttributes
}

export type DogBreedsResponse = {
  data: DogBreed[]
  meta: {
    pagination: {
      current: number
      next: number | null
      last: number
      records: number
    }
  }
}

export type DogBreedsPage = {
  breeds: DogBreed[]
  page: number
  totalRecords: number
}
