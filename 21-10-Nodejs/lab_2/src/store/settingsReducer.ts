import { createSlice, type PayloadAction } from "@reduxjs/toolkit"


export type SettingsState = {
  showMap: boolean
}

const initialState: SettingsState = {
  showMap: true,
}


const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setShowMap(state, action: PayloadAction<boolean>) {
    state.showMap = action.payload
    },
  },
})

export const { setShowMap } = settingsSlice.actions
export const settingsReducer = settingsSlice.reducer



