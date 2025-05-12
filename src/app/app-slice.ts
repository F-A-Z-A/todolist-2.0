import { createSlice } from "@reduxjs/toolkit"

export const appSlice = createSlice({
  name: "app",
  initialState: { themeMode: "dark" as ThemeMode },
  reducers: (create) => ({
    changeThemeMode: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
  }),
  selectors: {
    selectThemeMode: (state) => state.themeMode,
  },
})

export const appReducer = appSlice.reducer
export const { changeThemeMode } = appSlice.actions
export const { selectThemeMode } = appSlice.selectors

// types
export type ThemeMode = "dark" | "light"
