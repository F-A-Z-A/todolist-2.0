import type { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"
import { createAppSlice } from "@/common/utils"
import { setAppStatus } from "@/app/app-slice.ts"

export const todolistsSlice = createAppSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  reducers: (create) => ({
    fetchTodolists: create.asyncThunk(
      async (arg, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatus({ status: "loading" }))
          const res = await todolistsApi.getTodolists()
          dispatch(setAppStatus({ status: "succeeded" }))
          return { todolists: res.data }
        } catch (error) {
          dispatch(setAppStatus({ status: "failed" }))
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
        },
      },
    ),
    createTodolist: create.asyncThunk(
      async (title: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatus({ status: "loading" }))
          const res = await todolistsApi.createTodolist(title)
          dispatch(setAppStatus({ status: "succeeded" }))
          return { todolist: res.data.data.item }
        } catch (error) {
          dispatch(setAppStatus({ status: "failed" }))
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state.unshift({ ...action.payload.todolist, filter: "all" })
        },
      },
    ),
    deleteTodolist: create.asyncThunk(
      async (id: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatus({ status: "loading" }))
          await todolistsApi.deleteTodolist(id)
          dispatch(setAppStatus({ status: "succeeded" }))
          return { id }
        } catch (error) {
          dispatch(setAppStatus({ status: "failed" }))
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const { id } = action.payload
          const index = state.findIndex((tl) => tl.id === id)
          if (index !== -1) state.splice(index, 1)
        },
      },
    ),
    changeTodolistTitle: create.asyncThunk(
      async (arg: { id: string; title: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatus({ status: "loading" }))
          await todolistsApi.changeTodolistTitle(arg)
          dispatch(setAppStatus({ status: "succeeded" }))
          return arg
        } catch (error) {
          dispatch(setAppStatus({ status: "failed" }))
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const { id, title } = action.payload
          const todolist = state.find((todolist) => todolist.id === id)
          if (todolist) todolist.title = title
        },
      },
    ),
    changeTodolistFilter: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
      const { id, filter } = action.payload
      const todolist = state.find((todolist) => todolist.id === id)
      if (todolist) todolist.filter = filter
    }),
  }),
  selectors: {
    selectTodolists: (state) => state,
  },
})

export const todolistsReducer = todolistsSlice.reducer
export const { fetchTodolists, createTodolist, deleteTodolist, changeTodolistTitle, changeTodolistFilter } =
  todolistsSlice.actions
export const { selectTodolists } = todolistsSlice.selectors

// types
export type DomainTodolist = Todolist & {
  filter: FilterValues
}

export type FilterValues = "all" | "active" | "completed"
