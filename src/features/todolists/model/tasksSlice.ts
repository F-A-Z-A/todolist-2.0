import { ResultCode } from "common/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { tasksApi } from "../api/tasksApi"
import { DomainTask, UpdateTaskModel } from "../api/tasksApi.types"
import { setAppStatus } from "app/appSlice"
import { createSlice } from "@reduxjs/toolkit"
import { addTodolist, removeTodolist } from "features/todolists/model/todolistsSlice"
import type { AppDispatch } from "app/store"

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
    removeTask: create.reducer<{ taskId: string; todolistId: string }>((state, action) => {
      const { todolistId, taskId } = action.payload
      const tasks = state[todolistId]
      const index = tasks.findIndex((t) => t.id === taskId)
      if (index !== -1) tasks.splice(index, 1)
    }),
    addTask: create.reducer<{ task: DomainTask }>((state, action) => {
      const { task } = action.payload
      state[task.todoListId].unshift(task)
    }),
    updateTask: create.reducer<{ task: DomainTask }>((state, action) => {
      const { task } = action.payload
      const tasks = state[task.todoListId]
      const index = tasks.findIndex((t) => t.id === task.id)
      if (index !== -1) tasks[index] = task
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
export const fetchTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
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

export const removeTaskTC = (arg: { taskId: string; todolistId: string }) => (dispatch: AppDispatch) => {
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

export const addTaskTC = (arg: { title: string; todolistId: string }) => (dispatch: AppDispatch) => {
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

export const updateTaskTC = (task: DomainTask) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))

  const model: UpdateTaskModel = {
    status: task.status,
    title: task.title,
    deadline: task.deadline,
    description: task.description,
    priority: task.priority,
    startDate: task.startDate,
  }

  tasksApi
    .updateTask({ taskId: task.id, todolistId: task.todoListId, model })
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(updateTask({ task }))
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
