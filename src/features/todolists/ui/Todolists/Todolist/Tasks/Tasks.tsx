import List from "@mui/material/List"
import { TaskStatus } from "common/enums"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { DomainTodolist } from "features/todolists/model/todolistsSlice"
import { Task } from "./Task/Task"
import { fetchTasks, selectTasks } from "features/todolists/model/tasksSlice"
import { useEffect } from "react"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const tasks = useAppSelector(selectTasks)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasks(todolist.id))
  }, [])

  const allTodolistTasks = tasks[todolist.id]

  const getTasks = () => {
    let tasksForTodolist = allTodolistTasks
    if (todolist.filter === "active") {
      tasksForTodolist = allTodolistTasks.filter((task) => task.status === TaskStatus.New)
    }
    if (todolist.filter === "completed") {
      tasksForTodolist = allTodolistTasks.filter((task) => task.status === TaskStatus.Completed)
    }
    return tasksForTodolist
  }

  return (
    <>
      {allTodolistTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {getTasks()?.map((task) => {
            return <Task key={task.id} task={task} todolist={todolist} />
          })}
        </List>
      )}
    </>
  )
}
