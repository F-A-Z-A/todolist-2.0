import { ResultCode } from "common/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { Dispatch } from "redux"
import { setAppStatus } from "../../../app/appSlice"
import { tasksApi } from "../api/tasksApi"
import { BaseTaskModel, DomainTask } from "../api/tasksApi.types"
import { createSlice } from "@reduxjs/toolkit"
import { addTodolist, removeTodolist } from "./todolistsSlice"

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  selectors: {
    selectTasks: (state) => state,
  },
  reducers: (create) => ({
    setTasks: create.reducer<{ todolistId: string; tasks: DomainTask[] }>((state, action) => {
      const { todolistId, tasks } = action.payload
      state[todolistId] = tasks
    }),
    removeTask: create.reducer<{ todolistId: string; taskId: string }>((state, action) => {
      const { todolistId, taskId } = action.payload
      const index = state[todolistId].findIndex((t) => t.id === taskId)
      if (index !== -1) state[todolistId].splice(index, 1)
    }),
    addTask: create.reducer<{ task: DomainTask }>((state, action) => {
      const { task } = action.payload
      state[task.todoListId].unshift(task)
    }),
    updateTask: create.reducer<{ task: DomainTask; updateParams: Partial<BaseTaskModel> }>((state, action) => {
      const { task, updateParams } = action.payload
      const tasks = state[task.todoListId]
      const index = tasks.findIndex((t) => t.id === task.id)
      if (index !== -1) tasks[index] = { ...tasks[index], ...updateParams }
    }),
    clearTasks: create.reducer(() => {
      return {}
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(removeTodolist, (state, action) => {
        delete state[action.payload.id]
      })
  },
})

export const tasksReducer = tasksSlice.reducer
export const { setTasks, removeTask, addTask, updateTask, clearTasks } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors

// Thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  tasksApi
    .getTasks(todolistId)
    .then((res) => {
      dispatch(setAppStatus({ status: "succeeded" }))
      dispatch(setTasks({ todolistId, tasks: res.data.items }))
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const removeTaskTC = (arg: { taskId: string; todolistId: string }) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  tasksApi
    .deleteTask(arg)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(removeTask(arg))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const addTaskTC = (arg: { title: string; todolistId: string }) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  tasksApi
    .createTask(arg)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(addTask({ task: res.data.data.item }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const updateTaskTC =
  (arg: { task: DomainTask; updateParams: Partial<BaseTaskModel> }) => (dispatch: Dispatch) => {
    const { task, updateParams } = arg

    const model: BaseTaskModel = {
      status: task.status,
      title: task.title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      ...updateParams,
    }

    dispatch(setAppStatus({ status: "loading" }))
    tasksApi
      .updateTask({ todolistId: task.todoListId, taskId: task.id, model })
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatus({ status: "succeeded" }))
          dispatch(updateTask(arg))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }

// types
export type TasksStateType = {
  [key: string]: DomainTask[]
}
