import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? ''

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem('token') || ''
  return config
})

export type TokenTtlResponse = {
  ttlMinutes: number
  canUpdate: boolean
}

export class SettingsRequestError extends Error {
  status: number | null

  constructor(message: string, status: number | null) {
    super(message)
    this.name = 'SettingsRequestError'
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
      return new SettingsRequestError(data.error.message, error.response?.status ?? null)
    }

    return new SettingsRequestError(error.message, error.response?.status ?? null)
  }

  if (error instanceof Error) {
    return new SettingsRequestError(error.message, null)
  }

  return new SettingsRequestError('The settings request failed.', null)
}

export async function getTokenTtl() {
  try {
    const { data } = await axiosInstance.get<TokenTtlResponse>(`${apiBaseUrl}/api/settings/token-ttl`)
    return data
  } catch (error) {
    throw toRequestError(error)
  }
}

export async function updateTokenTtl(ttlMinutes: number) {
  try {
    const { data } = await axiosInstance.put<TokenTtlResponse>(`${apiBaseUrl}/api/settings/token-ttl`, {
      ttlMinutes,
    })
    return data
  } catch (error) {
    throw toRequestError(error)
  }
}
