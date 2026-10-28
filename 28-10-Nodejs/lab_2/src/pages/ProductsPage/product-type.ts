export type Product = {
  id: string
  name: string
  description: string
  category: string
  brand: string
  price: number
  currency: 'USD'
  inStock: boolean
}

export type ProductQuery = {
  search?: string
  category?: string
  brand?: string
  minPrice?: string
  maxPrice?: string
  inStock?: 'true' | 'false'
}

export type ProductFilters = {
  categories: string[]
  brands: string[]
}

export type ProductDraft = {
  search: string
  category: string
  brand: string
  minPrice: string
  maxPrice: string
  inStock: '' | 'true' | 'false'
}

export const emptyProductDraft: ProductDraft = {
  search: '',
  category: '',
  brand: '',
  minPrice: '',
  maxPrice: '',
  inStock: '',
}
