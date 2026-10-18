import axios from "axios"
import type { Joke } from "./joke-type"

const JOKES_URL = "https://official-joke-api.appspot.com/jokes/random/"

export async function getJokesApi(numberOfJokes:number): Promise<Joke[]> {
  const { data } = await axios.get<Joke[]>(JOKES_URL + numberOfJokes)

  if (!Array.isArray(data)) {
    throw new Error("Jokes response was not a list")
  }

  return data
}
