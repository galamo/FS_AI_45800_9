import axios from 'axios'
import type { Product, ProductFilters, ProductQuery } from './product-type'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? ''

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem('token') || ""
  return config
})





export class ProductsRequestError extends Error {
  status: number | null

  constructor(message: string, status: number | null) {
    super(message)
    this.name = 'ProductsRequestError'
    this.status = status
  }
}

function toRequestError(error: unknown) {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data
    if (
      data &&
      typeof data === 'object' &&
      'error' in data &&
      data.error &&
      typeof data.error === 'object' &&
      'message' in data.error &&
      typeof data.error.message === 'string' &&
      data.error.message.length > 0
    ) {
      return new ProductsRequestError(data.error.message, error.response?.status ?? null)
    }

    const status = error.response?.status ?? null
    if (status === null || status === 502 || status === 503 || status === 504) {
      return new ProductsRequestError(
        'The product service is unavailable. Start the lab 1 API and try again.',
        status,
      )
    }

    return new ProductsRequestError(error.message, status)
  }

  if (error instanceof Error) {
    return new ProductsRequestError(error.message, null)
  }

  return new ProductsRequestError('The product request failed.', null)
}

export async function getProducts(query: ProductQuery) {
  try {
    const { data } = await axiosInstance.get<{ products: Product[]; total: number }>(
      `${apiBaseUrl}/api/products`,
      { params: query },
    )
    return data
  } catch (error) {
    throw toRequestError(error)
  }
}

export async function getProductFilters() {
  try {
    const { data } = await axiosInstance.get<ProductFilters>(`${apiBaseUrl}/api/products/filters` )
    return data
  } catch (error) {
    throw toRequestError(error)
  }
}

export async function getProduct(id: string) {
  try {
    const { data } = await axiosInstance.get<{ product: Product }>(
      `${apiBaseUrl}/api/products/${encodeURIComponent(id)} `
    )
    return data.product
  } catch (error) {
    throw toRequestError(error)
  }
}
