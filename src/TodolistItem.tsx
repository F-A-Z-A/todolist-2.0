import { FilterValues, Task } from "./App"
import { Button } from "./Button"
import { ChangeEvent, KeyboardEvent, useState } from "react"

type Props = {
  title: string
  tasks: Task[]
  filter: FilterValues
  deleteTask: (taskId: string) => void
  changeFilter: (filter: FilterValues) => void
  createTask: (title: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const TodolistItem = ({
  title,
  tasks,
  filter,
  deleteTask,
  changeFilter,
  createTask,
  changeTaskStatus,
}: Props) => {
  const [taskTitle, setTaskTitle] = useState("")
  const [error, setError] = useState<string | null>(null)

  const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value)
    if (error) setError(null)
  }

  const createTaskHandler = () => {
    const trimmedTitle = taskTitle.trim()
    if (trimmedTitle !== "") {
      createTask(trimmedTitle)
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
    deleteTask(taskId)
  }

  const changeTaskStatusHandler = (taskId: string, e: ChangeEvent<HTMLInputElement>) => {
    changeTaskStatus(taskId, e.currentTarget.checked)
  }

  return (
    <div>
      <h3>{title}</h3>
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
          onClick={() => changeFilter("all")}
        />
        <Button
          className={filter === "active" ? "active-filter" : undefined}
          title={"Active"}
          onClick={() => changeFilter("active")}
        />
        <Button
          className={filter === "completed" ? "active-filter" : undefined}
          title={"Completed"}
          onClick={() => changeFilter("completed")}
        />
      </div>
    </div>
  )
}
