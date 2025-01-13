import { createSlice } from "@reduxjs/toolkit"
import { DomainTask } from "../api/tasksApi.types"

export type TasksStateType = {
  [key: string]: DomainTask[]
}

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: (create) => ({
    clearTasks: create.reducer(() => {
      return {}
    }),
  }),
})

export const { clearTasks } = tasksSlice.actions

export const tasksReducer = tasksSlice.reducer
