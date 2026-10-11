import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { SingleUserType } from "../pages/UsersPage/user-type"

export type FavoritesState = {
  users: SingleUserType[]
}

const initialState: FavoritesState = {
  users: [],
}
type userUUID = string;

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<SingleUserType>) {
      const alreadySaved = state.users.some(
        (user) => user.login.uuid === action.payload.login.uuid,
      )
      if (!alreadySaved) {
        state.users.push(action.payload)
      }
    },
    removeFavorite(state, action: PayloadAction<userUUID>) {
      state.users = state.users.filter((user) => user.login.uuid !== action.payload)
    },
    clearFavorites(state) {
      state.users = []
    },
  },
})

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions
export const favoritesReducer = favoritesSlice.reducer

type FavoritesRoot = {
  favorites: FavoritesState
}

export function selectFavoriteUsers(state: FavoritesRoot) {
  return state.favorites.users
}
