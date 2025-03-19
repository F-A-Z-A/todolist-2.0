import List from "@mui/material/List"
import { TaskStatus } from "common/enums"
import { useGetTasksQuery } from "../../../../api/tasksApi"
import { Task } from "./Task/Task"
import { TasksSkeleton } from "../../../skeletons/TasksSkeleton/TasksSkeleton"
import { useDispatch } from "react-redux"
import { setAppError } from "../../../../../../app/appSlice"
import { DomainTodolist } from "../../../../lib/types/types"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { data, isLoading, isError, error } = useGetTasksQuery(todolist.id)

  const dispatch = useDispatch()

  let tasksForTodolist = data?.items

  if (todolist.filter === "active") {
    tasksForTodolist = tasksForTodolist?.filter((task) => task.status === TaskStatus.New)
  }

  if (todolist.filter === "completed") {
    tasksForTodolist = tasksForTodolist?.filter((task) => task.status === TaskStatus.Completed)
  }

  if (error) {
    if ("status" in error) {
      const errMsg = "error" in error ? error.error : JSON.stringify(error.data)
      dispatch(setAppError({ error: JSON.stringify(errMsg) }))
    } else {
      dispatch(setAppError({ error: error.message ? error.message : JSON.stringify(error) }))
    }
  }

  if (isLoading) {
    return <TasksSkeleton />
  }

  return (
    <>
      {tasksForTodolist?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasksForTodolist?.map((task) => {
            return <Task key={task.id} task={task} todolist={todolist} />
          })}
        </List>
      )}
    </>
  )
}
