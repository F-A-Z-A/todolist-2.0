import List from "@mui/material/List"
import { DomainTodolist } from "../../../../lib/types/types"
import { TasksSkeleton } from "../../../skeletons/TasksSkeleton/TasksSkeleton"
import { Task } from "./Task/Task"
import { TasksPagination } from "features/todolists/ui/Todolists/Todolist/TasksPagination/TasksPagination"
import { useTasks } from "features/todolists/lib/hooks/useTasks"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { allTasks, tasksForTodolist, isLoading, totalCount, page, setPage } = useTasks(todolist)

  if (isLoading) {
    return <TasksSkeleton />
  }

  return (
    <>
      {allTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <>
          <List>
            {tasksForTodolist?.map((task) => {
              return <Task key={task.id} task={task} todolist={todolist} />
            })}
          </List>
          <TasksPagination totalCount={totalCount || 0} page={page} setPage={setPage} />
        </>
      )}
    </>
  )
}
