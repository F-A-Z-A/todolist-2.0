import { ResultCode } from "common/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { tasksApi } from "../api/tasksApi"
import { DomainTask, UpdateTaskModel } from "../api/tasksApi.types"
import { setAppStatus } from "app/appSlice"
import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit"
import { addTodolist, removeTodolist } from "features/todolists/model/todolistsSlice"
import { clearTasksAndTodolistsData } from "common/actions/commonActions"

const createSliceWithThunks = buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })

export const tasksSlice = createSliceWithThunks({
  name: "tasks",

  initialState: {} as TasksStateType,

  selectors: {
    selectTasks: (state) => state,
  },

  reducers: (create) => {
    const createAThunk = create.asyncThunk.withTypes<{ rejectValue: null }>()
    return {
      fetchTasks: createAThunk(
        async (todolistId: string, { dispatch, rejectWithValue }) => {
          try {
            dispatch(setAppStatus({ status: "loading" }))
            const res = await tasksApi.getTasks(todolistId)
            dispatch(setAppStatus({ status: "succeeded" }))
            return { todolistId, tasks: res.data.items }
          } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
          },
        },
      ),

      removeTask: createAThunk(
        async (arg: { todolistId: string; taskId: string }, { dispatch, rejectWithValue }) => {
          try {
            dispatch(setAppStatus({ status: "loading" }))
            const res = await tasksApi.deleteTask(arg)
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(setAppStatus({ status: "succeeded" }))
              return arg
            } else {
              handleServerAppError(res.data, dispatch)
              return rejectWithValue(null)
            }
          } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const { todolistId, taskId } = action.payload
            const index = state[todolistId].findIndex((t) => t.id === taskId)
            if (index !== -1) state[todolistId].splice(index, 1)
          },
        },
      ),

      addTask: createAThunk(
        async (arg: { title: string; todolistId: string }, { dispatch, rejectWithValue }) => {
          try {
            dispatch(setAppStatus({ status: "loading" }))
            const res = await tasksApi.createTask(arg)
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(setAppStatus({ status: "succeeded" }))
              return { task: res.data.data.item }
            } else {
              handleServerAppError(res.data, dispatch)
              return rejectWithValue(null)
            }
          } catch (error) {
            handleServerNetworkError(error, dispatch)
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

      updateTask: createAThunk(
        async (task: DomainTask, { dispatch, rejectWithValue }) => {
          try {
            const model: UpdateTaskModel = {
              status: task.status,
              title: task.title,
              deadline: task.deadline,
              description: task.description,
              priority: task.priority,
              startDate: task.startDate,
            }
            dispatch(setAppStatus({ status: "loading" }))
            const res = await tasksApi.updateTask({ taskId: task.id, todolistId: task.todoListId, model })
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(setAppStatus({ status: "succeeded" }))
              return { task }
            } else {
              handleServerAppError(res.data, dispatch)
              return rejectWithValue(null)
            }
          } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const { task } = action.payload
            const tasks = state[task.todoListId]
            const index = tasks.findIndex((t) => t.id === task.id)
            if (index !== -1) tasks[index] = task
          },
        },
      ),
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(addTodolist.fulfilled, (state, action) => {
        const { todolist } = action.payload
        state[todolist.id] = []
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        const { id } = action.payload
        delete state[id]
      })
      .addCase(clearTasksAndTodolistsData, (state, action) => {
        return action.payload.tasks
      })
  },
})

export const tasksReducer = tasksSlice.reducer
export const { fetchTasks, removeTask, addTask, updateTask } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors

// types
export type TasksStateType = {
  [key: string]: DomainTask[]
}
