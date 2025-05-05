import { TasksState } from "../app/App.tsx"
import { createAction, createReducer, nanoid } from "@reduxjs/toolkit"
import { createTodolistAC, deleteTodolistAC } from "./todolists-reducer.ts"

const initialState: TasksState = {}

// actions
export const deleteTaskAC = createAction<{ todolistId: string; taskId: string }>("tasks/deleteTask")
export const createTaskAC = createAction<{ todolistId: string; title: string }>("tasks/createTask")
export const changeTaskTitleAC = createAction<{
  todolistId: string
  taskId: string
  title: string
}>("tasks/changeTaskTitle")
export const changeTaskStatusAC = createAction<{
  todolistId: string
  taskId: string
  isDone: boolean
}>("tasks/changeTaskStatus")

// reducer
export const tasksReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(deleteTaskAC, (state, action) => {
      const { todolistId, taskId } = action.payload
      const index = state[todolistId].findIndex((t) => t.id === taskId)
      if (index !== -1) state[todolistId].splice(index, 1)
    })
    .addCase(createTaskAC, (state, action) => {
      const { todolistId, title } = action.payload
      state[todolistId].unshift({ id: nanoid(), title, isDone: false })
    })
    .addCase(changeTaskTitleAC, (state, action) => {
      const { todolistId, taskId, title } = action.payload
      const task = state[todolistId].find((t) => t.id === taskId)
      if (task) task.title = title
    })
    .addCase(changeTaskStatusAC, (state, action) => {
      const { todolistId, taskId, isDone } = action.payload
      const task = state[todolistId].find((t) => t.id === taskId)
      if (task) task.isDone = isDone
    })
    // todolists actions
    .addCase(deleteTodolistAC, (state, action) => {
      const { id } = action.payload
      delete state[id]
    })
    .addCase(createTodolistAC, (state, action) => {
      const { id } = action.payload
      state[id] = []
    })
})
