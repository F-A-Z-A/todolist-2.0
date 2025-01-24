import type { DomainTodolist } from "features/todolists/lib/types/types"
import { useState } from "react"
import { useGetTasksQuery } from "features/todolists/api/tasksApi"
import { TaskStatus } from "common/enums"

export const useTasks = (todolist: DomainTodolist) => {
  const { filter, id } = todolist

  const [page, setPage] = useState(1)

  const { data, isLoading } = useGetTasksQuery({ todolistId: id, args: { page } })

  let allTasks = data?.items

  const getTasksForTodolists = () => {
    let tasksForTodolist = allTasks
    if (filter === "active") {
      tasksForTodolist = allTasks?.filter((task) => task.status === TaskStatus.New)
    }
    if (filter === "completed") {
      tasksForTodolist = allTasks?.filter((task) => task.status === TaskStatus.Completed)
    }
    return tasksForTodolist
  }

  return { allTasks, tasksForTodolist: getTasksForTodolists(), isLoading, page, setPage, totalCount: data?.totalCount }
}
