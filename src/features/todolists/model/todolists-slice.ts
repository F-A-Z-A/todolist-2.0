import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  reducers: (create) => ({
    changeTodolistFilter: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
      const { id, filter } = action.payload
      const todolist = state.find((todolist) => todolist.id === id)
      if (todolist) todolist.filter = filter
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolistsTC.fulfilled, (_, action) => {
        return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
      })
      .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
        const { id, title } = action.payload
        const todolist = state.find((todolist) => todolist.id === id)
        if (todolist) todolist.title = title
      })
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state.unshift({ ...action.payload, filter: "all", addedDate: "", order: 0 })
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        const { id } = action.payload
        const index = state.findIndex((todolist) => todolist.id === id)
        if (index !== -1) state.splice(index, 1)
      })
  },
  selectors: {
    selectTodolists: (state) => state,
  },
})

export const todolistsReducer = todolistsSlice.reducer
export const { changeTodolistFilter } = todolistsSlice.actions
export const { selectTodolists } = todolistsSlice.selectors

// thunks
export const fetchTodolistsTC = createAsyncThunk(`${todolistsSlice.name}/fetchTodolistsTC`, async (arg, thunkAPI) => {
  try {
    const res = await todolistsApi.getTodolists()
    return { todolists: res.data }
  } catch (error) {
    return thunkAPI.rejectWithValue(null)
  }
})

export const changeTodolistTitleTC = createAsyncThunk(
  `${todolistsSlice.name}/changeTodolistTitleTC`,
  async (payload: { id: string; title: string }, thunkAPI) => {
    try {
      await todolistsApi.changeTodolistTitle(payload)
      return payload
    } catch (error) {
      return thunkAPI.rejectWithValue(null)
    }
  },
)

export const createTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/createTodolistTC`,
  async (title: string, thunkAPI) => {
    try {
      const res = await todolistsApi.createTodolist(title)
      return res.data.data.item
    } catch (error) {
      return thunkAPI.rejectWithValue(null)
    }
  },
)

export const deleteTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/deleteTodolistTC`,
  async (payload: { id: string }, thunkAPI) => {
    try {
      await todolistsApi.deleteTodolist(payload.id)
      return payload
    } catch (error) {
      return thunkAPI.rejectWithValue(null)
    }
  },
)

// types
export type DomainTodolist = Todolist & {
  filter: FilterValues
}

export type FilterValues = "all" | "active" | "completed"
