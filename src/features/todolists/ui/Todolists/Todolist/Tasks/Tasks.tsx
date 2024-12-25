import List from "@mui/material/List"
import { TaskStatus } from "common/enums"
import { useAppSelector } from "common/hooks"
import { selectTasks } from "../../../../model/tasksSelectors"
import { DomainTodolist } from "../../../../model/todolists-reducer"
import { Task } from "./Task/Task"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const tasks = useAppSelector(selectTasks)

  // const dispatch = useAppDispatch()
  // useEffect(() => {
  //   dispatch(fetchTasksTC(todolist.id))
  // }, [])

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
