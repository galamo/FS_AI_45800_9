import { configureStore } from "@reduxjs/toolkit"
import { writeVisibleDogColumns } from "../pages/DogsPage/dog-columns"
import { dogsReducer } from "./dogsReducer"
import { favoritesReducer } from "./favoritesReducer"
import { jokesReducer } from "./jokesReducer"
import { settingsReducer } from "./settingsReducer"

export const store = configureStore({
  reducer: {
    dogs: dogsReducer,
    favorites: favoritesReducer,
    jokes: jokesReducer,
    settings: settingsReducer,
  },
})

let savedColumns = JSON.stringify(store.getState().dogs.visibleColumns)

store.subscribe(() => {
  const next = JSON.stringify(store.getState().dogs.visibleColumns)
  if (next === savedColumns) {
    return
  }

  savedColumns = next
  // writeVisibleDogColumns(store.getState().dogs.visibleColumns)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
