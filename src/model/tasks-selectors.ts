import type { RootState } from "../app/store.ts"
import type { TasksState } from "../app/App.tsx"

export const selectTasks = (state: RootState): TasksState => state.tasks
