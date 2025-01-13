import { createSlice } from "@reduxjs/toolkit"
import { RequestStatus } from "app/appSlice"
import { Todolist } from "../api/todolistsApi.types"

export type FilterValuesType = "all" | "active" | "completed"

export type DomainTodolist = Todolist & {
  filter: FilterValuesType
  entityStatus: RequestStatus
}

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  reducers: (create) => ({
    changeTodolistFilter: create.reducer<{ id: string; filter: FilterValuesType }>((state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      if (index !== -1) {
        state[index].filter = action.payload.filter
      }
    }),
    clearTodolists: create.reducer(() => {
      return []
    }),
  }),
})

export const { changeTodolistFilter, clearTodolists } = todolistsSlice.actions

export const todolistsReducer = todolistsSlice.reducer
