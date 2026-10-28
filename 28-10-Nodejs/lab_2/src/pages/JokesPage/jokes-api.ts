import axios from "axios"
import type { Joke } from "./joke-type"

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? ""

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem("token") || ""
  return config
})

type JokesResponse = {
  jokes: Joke[]
  total: number
}

export async function getJokesApi(numberOfJokes: number): Promise<Joke[]> {
  try {
    const { data } = await axiosInstance.get<JokesResponse>(`${apiBaseUrl}/api/jokes`, {
      params: { count: numberOfJokes },
    })

    if (!Array.isArray(data.jokes)) {
      throw new Error("Jokes response was not a list")
    }

    return data.jokes
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const payload = error.response?.data
      if (
        payload &&
        typeof payload === "object" &&
        "error" in payload &&
        payload.error &&
        typeof payload.error === "object" &&
        "message" in payload.error &&
        typeof payload.error.message === "string" &&
        payload.error.message.length > 0
      ) {
        throw new Error(payload.error.message)
      }
    }

    throw error
  }
}
