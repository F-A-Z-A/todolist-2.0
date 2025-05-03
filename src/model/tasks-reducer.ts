import { TasksState } from "../App.tsx"
import { CreateTodolistAction, DeleteTodolistAction } from "./todolists-reducer.ts"
import { v1 } from "uuid"

const initialState: TasksState = {}

export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
  switch (action.type) {
    case "create_todolist": {
      return { [action.payload.id]: [], ...state }
    }
    case "delete_todolist": {
      const copyState = { ...state }
      delete copyState[action.payload.id]
      return copyState
    }
    case "delete_task": {
      const { todolistId, taskId } = action.payload
      return { ...state, [todolistId]: state[todolistId].filter((task) => task.id !== taskId) }
    }
    case "create_task": {
      const { todolistId, title } = action.payload
      return { ...state, [todolistId]: [{ id: v1(), title, isDone: false }, ...state[todolistId]] }
    }
    case "change_task_status": {
      const { todolistId, taskId, isDone } = action.payload
      return {
        ...state,
        [todolistId]: state[todolistId].map((task) => (task.id == taskId ? { ...task, isDone } : task)),
      }
    }
    case "change_task_title": {
      const { todolistId, taskId, title } = action.payload
      return {
        ...state,
        [todolistId]: state[todolistId].map((task) => (task.id == taskId ? { ...task, title } : task)),
      }
    }
    default:
      return state
  }
}

// actions
export const deleteTaskAC = (payload: { todolistId: string; taskId: string }) => {
  return { type: "delete_task", payload } as const
}
export const createTaskAC = (payload: { todolistId: string; title: string }) => {
  return { type: "create_task", payload } as const
}
export const changeTaskStatusAC = (payload: { todolistId: string; taskId: string; isDone: boolean }) => {
  return { type: "change_task_status", payload } as const
}
export const changeTaskTitleAC = (payload: { todolistId: string; taskId: string; title: string }) => {
  return { type: "change_task_title", payload } as const
}

// types
type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
type CreateTaskAction = ReturnType<typeof createTaskAC>
type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>

type Actions =
  | CreateTodolistAction
  | DeleteTodolistAction
  | DeleteTaskAction
  | CreateTaskAction
  | ChangeTaskStatusAction
  | ChangeTaskTitleAction
