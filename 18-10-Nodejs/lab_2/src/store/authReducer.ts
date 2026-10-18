import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export type LoginCredentials = {
  username: string
  password: string
}

export type AuthUser = {
  username: string
  email: string
  name: {
    title?: string
    first: string
    last: string
  }
}

export type AuthStatus = "idle" | "pending" | "succeeded" | "failed"

export type AuthState = {
  user: AuthUser | null
  status: AuthStatus
  error: string
}

const LOGIN_URL = "http://localhost:3000/auth/login"

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: "",
}

type LoginResponse = {
  message: string
  user: AuthUser
}

function toErrorMessage(err: unknown) {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data
    if (
      data &&
      typeof data === "object" &&
      "message" in data &&
      typeof data.message === "string" &&
      data.message.length > 0
    ) {
      return data.message
    }

    return err.message
  }

  if (err instanceof Error) {
    return err.message
  }

  return "Login failed"
}

export const login = createAsyncThunk<AuthUser, LoginCredentials, { rejectValue: string }>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<LoginResponse>(LOGIN_URL, credentials)
      return data.user
    } catch (err) {
      return rejectWithValue(toErrorMessage(err))
    }
  },
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearLoginError(state) {
      state.error = ""
      if (state.status === "failed") {
        state.status = "idle"
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.status = "pending"
        state.error = ""
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.user = action.payload
        // ???????? token? headers? session? 
        state.error = ""
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed"
        state.user = null
        state.error = action.payload ?? action.error.message ?? "Login failed"
      })
  },
})

export const { clearLoginError } = authSlice.actions
export const authReducer = authSlice.reducer
