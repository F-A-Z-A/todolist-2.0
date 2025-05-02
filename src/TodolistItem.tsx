import { FilterValues, Task, Todolist } from "./App"
import { Button } from "./Button"
import { ChangeEvent, KeyboardEvent, useState } from "react"

type Props = {
  todolist: Todolist
  tasks: Task[]
  deleteTask: (todolistId: string, taskId: string) => void
  createTask: (todolistId: string, title: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
  changeFilter: (todolistId: string, filter: FilterValues) => void
  deleteTodolist: (todolistId: string) => void
}

export const TodolistItem = (props: Props) => {
  const {
    todolist: { title, filter, id: todolistId },
    tasks,
    deleteTask,
    createTask,
    changeTaskStatus,
    changeFilter,
    deleteTodolist,
  } = props
  const [taskTitle, setTaskTitle] = useState("")
  const [error, setError] = useState<string | null>(null)

  const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value)
    if (error) setError(null)
  }

  const createTaskHandler = () => {
    const trimmedTitle = taskTitle.trim()
    if (trimmedTitle !== "") {
      createTask(todolistId, trimmedTitle)
      setTaskTitle("")
    } else {
      setError("Title is required")
    }
  }

  const createTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      createTaskHandler()
    }
  }

  const deleteTaskHandler = (taskId: string) => {
    deleteTask(todolistId, taskId)
  }

  const changeTaskStatusHandler = (taskId: string, e: ChangeEvent<HTMLInputElement>) => {
    changeTaskStatus(todolistId, taskId, e.currentTarget.checked)
  }

  const changeFilterHandler = (filter: FilterValues) => {
    changeFilter(todolistId, filter)
  }

  const deleteTodolistHandler = () => {
    deleteTodolist(todolistId)
  }

  return (
    <div>
      <div className={"container"}>
        <h3>{title}</h3>
        <Button title={"x"} onClick={deleteTodolistHandler} />
      </div>
      <div>
        <input value={taskTitle} onChange={onChangeInputValue} onKeyDown={createTaskOnEnterHandler} />
        <Button title={"+"} onClick={createTaskHandler} />
        {error && <div className={"error-message"}>{error}</div>}
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            return (
              <li key={task.id}>
                <input type="checkbox" checked={task.isDone} onChange={(e) => changeTaskStatusHandler(task.id, e)} />
                <span className={task.isDone ? "is-done" : undefined}>{task.title}</span>
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
