import { createSlice, nanoid } from "@reduxjs/toolkit"
import { createTodolistTC, deleteTodolistTC } from "@/features/todolists/model/todolists-slice.ts"

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksState,
  reducers: (create) => ({
    deleteTask: create.reducer<{ todolistId: string; taskId: string }>((state, action) => {
      const { todolistId, taskId } = action.payload
      const index = state[todolistId].findIndex((task) => task.id === taskId)
      if (index !== -1) state[todolistId].splice(index, 1)
    }),
    createTask: create.reducer<{ todolistId: string; title: string }>((state, action) => {
      const { todolistId, title } = action.payload
      state[todolistId].unshift({ id: nanoid(), title, isDone: false })
    }),
    changeTaskStatus: create.reducer<{ todolistId: string; taskId: string; isDone: boolean }>((state, action) => {
      const { todolistId, taskId, isDone } = action.payload
      const task = state[todolistId].find((task) => task.id === taskId)
      if (task) task.isDone = isDone
    }),
    changeTaskTitle: create.reducer<{ todolistId: string; taskId: string; title: string }>((state, action) => {
      const { todolistId, taskId, title } = action.payload
      const task = state[todolistId].find((task) => task.id === taskId)
      if (task) task.title = title
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state[action.payload.id] = []
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
  },
  selectors: {
    selectTasks: (state) => state,
  },
})

export const tasksReducer = tasksSlice.reducer
export const { deleteTask, createTask, changeTaskStatus, changeTaskTitle } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type TasksState = Record<string, Task[]>
