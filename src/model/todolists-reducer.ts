import { FilterValues, Todolist } from "../App.tsx"
import { v1 } from "uuid"

const initialState: Todolist[] = []

export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
  switch (action.type) {
    case "delete_todolist": {
      const { id } = action.payload
      return state.filter((tl) => tl.id !== id)
    }
    case "create_todolist": {
      const { id, title } = action.payload
      return [{ id, title, filter: "all" }, ...state]
    }
    case "change-todolist-title": {
      const { id, title } = action.payload
      return state.map((tl) => (tl.id === id ? { ...tl, title } : tl))
    }
    case "change-todolist-filter": {
      const { id, filter } = action.payload
      return state.map((tl) => (tl.id === id ? { ...tl, filter } : tl))
    }
    default:
      return state
  }
}

// actions
export const deleteTodolistAC = (id: string) => {
  return { type: "delete_todolist", payload: { id } } as const
}
export const createTodolistAC = (title: string) => {
  return { type: "create_todolist", payload: { id: v1(), title } } as const
}
export const changeTodolistTitleAC = (payload: { id: string; title: string }) => {
  return { type: "change-todolist-title", payload } as const
}
export const changeTodolistFilterAC = (payload: { id: string; filter: FilterValues }) => {
  return { type: "change-todolist-filter", payload } as const
}

// types
export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>
type Actions = DeleteTodolistAction | CreateTodolistAction | ChangeTodolistTitleAction | ChangeTodolistFilterAction
