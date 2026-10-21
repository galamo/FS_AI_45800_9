import axios from "axios"
import type { SingleUserType } from "./user-type"

export async function getUsersApi(): Promise<Array<SingleUserType>> {
    const url = "https://randomuser.me/api/?results=10"
    const response = await axios.get(url)
    return response?.data?.results || []
  }