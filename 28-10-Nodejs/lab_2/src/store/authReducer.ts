import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export type LoginCredentials = {
  username: string
  password: string
}

export type RegisterInput = {
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
}

export type RegisteredUser = {
  username: string
  email: string
  firstName: string
  lastName: string
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
  registerStatus: AuthStatus
  registerError: string
  registerMessage: string
}

const LOGIN_URL = "http://localhost:3000/auth/login"
const REGISTER_URL = "http://localhost:3000/auth/register"

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: "",
  registerStatus: "idle",
  registerError: "",
  registerMessage: "",
}

type LoginResponse = {
  message: string
  user: AuthUser
  token: string
}

type RegisterResponse = {
  message: string
  user: RegisteredUser
}

function toErrorMessage(err: unknown, fallback: string) {
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

  return fallback
}

export const login = createAsyncThunk<AuthUser, LoginCredentials, { rejectValue: string }>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<LoginResponse>(LOGIN_URL, credentials)
      localStorage.setItem("token", data.token)
      return data.user
    } catch (err) {
      return rejectWithValue(toErrorMessage(err, "Login failed"))
    }
  },
)

export const register = createAsyncThunk<RegisterResponse, RegisterInput, { rejectValue: string }>(
  "auth/register",
  async (input, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<RegisterResponse>(REGISTER_URL, input)
      return data
    } catch (err) {
      return rejectWithValue(toErrorMessage(err, "Registration failed"))
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
    clearRegisterError(state) {
      state.registerError = ""
      if (state.registerStatus === "failed") {
        state.registerStatus = "idle"
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.status = "pending"
        state.error = ""
        state.registerMessage = ""
        state.registerStatus = state.registerStatus === "succeeded" ? "idle" : state.registerStatus
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
      .addCase(register.pending, (state) => {
        state.registerStatus = "pending"
        state.registerError = ""
        state.registerMessage = ""
      })
      .addCase(register.fulfilled, (state, action) => {
        state.registerStatus = "succeeded"
        state.registerMessage = action.payload.message
        state.registerError = ""
      })
      .addCase(register.rejected, (state, action) => {
        state.registerStatus = "failed"
        state.registerMessage = ""
        state.registerError = action.payload ?? action.error.message ?? "Registration failed"
      })
  },
})

export const { clearLoginError, clearRegisterError } = authSlice.actions
export const authReducer = authSlice.reducer
