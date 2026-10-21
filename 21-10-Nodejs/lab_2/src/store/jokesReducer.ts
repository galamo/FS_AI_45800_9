import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import type { Joke } from "../pages/JokesPage/joke-type"
import { getJokesApi } from "../pages/JokesPage/jokes-api"
import type { RootState } from "./store"

export type JokesStatus = "idle" | "pending" | "succeeded" | "failed"

export type JokesState = {
  jokes: Joke[]
  status: JokesStatus
  error: string
  numberOfJokes: number
}

const initialState: JokesState = {
  jokes: [],
  status: "idle",
  error: "",
  numberOfJokes: 5,
}

function toErrorMessage(err: unknown) {
  if (axios.isAxiosError(err)) {
    return err.message
  }

  if (err instanceof Error) {
    return err.message
  }

  return "Failed to load jokes"
}

export const loadJokes = createAsyncThunk<Joke[], void, { state: RootState; rejectValue: string }>(
  "jokes/loadJokes",
  async (_arg, { getState, rejectWithValue }) => {
    try {
      const { numberOfJokes } = getState().jokes
      return await getJokesApi(numberOfJokes)
    } catch (err) {
      return rejectWithValue(toErrorMessage(err))
    }
  },
)

const jokesSlice = createSlice({
  name: "jokes",
  initialState,
  reducers: {
    clearJokesError(state) {
      state.error = ""
    },
    setNumberOfJokes(state, action: PayloadAction<number>) {
      state.numberOfJokes = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadJokes.pending, (state) => {
        state.status = "pending"
        state.error = ""
      })
      .addCase(loadJokes.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.jokes = action.payload
        state.error = ""
      })
      .addCase(loadJokes.rejected, (state, action) => {
        state.status = "failed"
        state.jokes = []
        state.error = action.payload ?? action.error.message ?? "Failed to load jokes"
      })
  },
})

export const { clearJokesError, setNumberOfJokes } = jokesSlice.actions
export const jokesReducer = jokesSlice.reducer
