import { FilterValues, Task, Todolist } from "./App"
import { Button } from "./Button"
import { ChangeEvent } from "react"
import { CreateItemForm } from "./CreateItemForm.tsx"
import { EditableSpan } from "./EditableSpan.tsx"

type Props = {
  todolist: Todolist
  tasks: Task[]
  createTask: (todolistId: string, title: string) => void
  deleteTask: (todolistId: string, taskId: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
  changeFilter: (todolistId: string, filter: FilterValues) => void
  deleteTodolist: (todolistId: string) => void
  changeTodolistTitle: (todolistId: string, title: string) => void
}

export const TodolistItem = (props: Props) => {
  const {
    todolist: { title, filter, id: todolistId },
    tasks,
    deleteTask,
    createTask,
    changeTaskStatus,
    changeTaskTitle,
    changeFilter,
    deleteTodolist,
    changeTodolistTitle,
  } = props

  const createTaskHandler = (title: string) => {
    createTask(todolistId, title)
  }

  const deleteTaskHandler = (taskId: string) => {
    deleteTask(todolistId, taskId)
  }

  const changeTaskStatusHandler = (taskId: string, e: ChangeEvent<HTMLInputElement>) => {
    changeTaskStatus(todolistId, taskId, e.currentTarget.checked)
  }

  const changeTaskTitleHandler = (taskId: string, title: string) => {
    changeTaskTitle(todolistId, taskId, title)
  }

  const changeFilterHandler = (filter: FilterValues) => {
    changeFilter(todolistId, filter)
  }

  const deleteTodolistHandler = () => {
    deleteTodolist(todolistId)
  }

  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle(todolistId, title)
  }

  return (
    <div>
      <div className={"container"}>
        <h3>
          <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
        </h3>
        <Button title={"x"} onClick={deleteTodolistHandler} />
      </div>
      <CreateItemForm buttonTitle={"+"} onCreateItem={createTaskHandler} />
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            return (
              <li key={task.id}>
                <input type="checkbox" checked={task.isDone} onChange={(e) => changeTaskStatusHandler(task.id, e)} />
                <EditableSpan
                  value={task.title}
                  className={task.isDone ? "is-done" : undefined}
                  onChange={(title) => changeTaskTitleHandler(task.id, title)}
                />
                {/*<span >{task.title}</span>*/}
                <Button title={"x"} onClick={() => deleteTaskHandler(task.id)} />
              </li>
            )
          })}
        </ul>
      )}
      <div>
        <Button
          className={filter === "all" ? "active-filter" : undefined}
          title={"All"}
          onClick={() => changeFilterHandler("all")}
        />
        <Button
          className={filter === "active" ? "active-filter" : undefined}
          title={"Active"}
          onClick={() => changeFilterHandler("active")}
        />
        <Button
          className={filter === "completed" ? "active-filter" : undefined}
          title={"Completed"}
          onClick={() => changeFilterHandler("completed")}
        />
      </div>
    </div>
  )
}
