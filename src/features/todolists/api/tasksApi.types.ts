import { TaskPriority, TaskStatus } from "@/common/enums/enums.ts"

export type DomainTask = {
  id: string
  title: string
  description: string
  todoListId: string
  order: number
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
  addedDate: string
}

export type GetTasksResponse = {
  items: DomainTask[]
  error: string | number
  totalCount: number
}

export type UpdateTaskModel = {
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
}
