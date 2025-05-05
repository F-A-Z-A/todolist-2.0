import type { RootState } from "../app/store.ts"
import type { Todolist } from "../app/App.tsx"

export const selectTodolists = (state: RootState): Todolist[] => state.todolists
