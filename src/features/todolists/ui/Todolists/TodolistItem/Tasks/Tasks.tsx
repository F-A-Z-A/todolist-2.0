import { useAppSelector } from "@/common/hooks/useAppSelector"
import { TaskItem } from "./TaskItem/TaskItem"
import List from "@mui/material/List"
import { fetchTasks, selectTasks } from "@/features/todolists/model/tasks-slice.ts"
import type { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { useEffect } from "react"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { TaskStatus } from "@/common/enums/enums.ts"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist
  const dispatch = useAppDispatch()

  const tasks = useAppSelector(selectTasks)

  const todolistTasks = tasks[id]
  let filteredTasks = todolistTasks
  if (filter === "active") {
    filteredTasks = todolistTasks.filter((task) => task.status === TaskStatus.New)
  }
  if (filter === "completed") {
    filteredTasks = todolistTasks.filter((task) => task.status === TaskStatus.Completed)
  }

  useEffect(() => {
    dispatch(fetchTasks(id))
  }, [])

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>{filteredTasks?.map((task) => <TaskItem key={task.id} task={task} todolistId={id} />)}</List>
      )}
    </>
  )
}
