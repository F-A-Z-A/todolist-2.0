import { createTodolist, deleteTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { createAppSlice } from "@/common/utils"
import { tasksApi } from "@/features/todolists/api/tasksApi.ts"
import type { DomainTask } from "@/features/todolists/api/tasksApi.types.ts"
import { setAppStatus } from "@/app/app-slice.ts"

export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState: {} as TasksState,
  reducers: (create) => ({
    fetchTasks: create.asyncThunk(
      async (todolistId: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatus({ status: "loading" }))
          const res = await tasksApi.getTasks(todolistId)
          dispatch(setAppStatus({ status: "succeeded" }))
          return { todolistId, tasks: res.data.items }
        } catch (error) {
          dispatch(setAppStatus({ status: "failed" }))
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const { todolistId, tasks } = action.payload
          state[todolistId] = tasks
        },
      },
    ),
    createTask: create.asyncThunk(
      async (arg: { todolistId: string; title: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatus({ status: "loading" }))
          const res = await tasksApi.createTask(arg)
          dispatch(setAppStatus({ status: "succeeded" }))
          return { task: res.data.data.item }
        } catch (error) {
          dispatch(setAppStatus({ status: "failed" }))
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const { task } = action.payload
          state[task.todoListId].unshift(task)
        },
      },
    ),
    deleteTask: create.asyncThunk(
      async (arg: { todolistId: string; taskId: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatus({ status: "loading" }))
          await tasksApi.deleteTask(arg)
          dispatch(setAppStatus({ status: "succeeded" }))
          return arg
        } catch (error) {
          dispatch(setAppStatus({ status: "failed" }))
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const { todolistId, taskId } = action.payload
          const index = state[todolistId].findIndex((task) => task.id === taskId)
          if (index !== -1) state[todolistId].splice(index, 1)
        },
      },
    ),
    updateTask: create.asyncThunk(
      async (task: DomainTask, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatus({ status: "loading" }))
          const res = await tasksApi.updateTask(task)
          dispatch(setAppStatus({ status: "succeeded" }))
          return { task: res.data.data.item }
        } catch (error) {
          dispatch(setAppStatus({ status: "failed" }))
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const { task } = action.payload
          const index = state[task.todoListId].findIndex((t) => t.id === task.id)
          if (index !== -1) state[task.todoListId].splice(index, 1, task)
        },
      },
    ),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(createTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(deleteTodolist.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
  },
  selectors: {
    selectTasks: (state) => state,
  },
})

export const tasksReducer = tasksSlice.reducer
export const { fetchTasks, deleteTask, createTask, updateTask } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors

export type TasksState = Record<string, DomainTask[]>
