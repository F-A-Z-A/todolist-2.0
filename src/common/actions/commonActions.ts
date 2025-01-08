import { createAction } from "@reduxjs/toolkit"
import type { TasksStateType } from "features/todolists/model/tasksSlice"
import type { DomainTodolist } from "features/todolists/model/todolistsSlice"

export type ClearTasksAndTodolistsDataType = {
  tasks: TasksStateType
  todolists: DomainTodolist[]
}

export const clearTasksAndTodolistsData = createAction<ClearTasksAndTodolistsDataType>("common/clear-tasks-todolists")
