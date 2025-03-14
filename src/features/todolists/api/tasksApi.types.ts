import { TaskPriority, TaskStatus } from "common/enums"

export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: DomainTask[]
}

export type BaseTaskModel = {
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
}

export type DomainTask = BaseTaskModel & {
  id: string
  todoListId: string
  order: number
  addedDate: string
}
