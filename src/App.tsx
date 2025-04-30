import "./App.css"
import { TodolistItem } from "./TodolistItem"
import { useState } from "react"
import { v1 } from "uuid"

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValues = "all" | "active" | "completed"

export const App = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
    { id: v1(), title: "Typescript", isDone: false },
    { id: v1(), title: "RTK query", isDone: false },
  ])
  const [filter, setFilter] = useState<FilterValues>("all")

  const getTasks = () => {
    let filteredTasks = tasks
    if (filter === "active") {
      filteredTasks = tasks.filter((task) => !task.isDone)
    }
    if (filter === "completed") {
      filteredTasks = tasks.filter((task) => task.isDone)
    }
    return filteredTasks
  }

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task: Task) => task.id !== taskId))
  }

  const changeFilter = (filter: FilterValues) => {
    setFilter(filter)
  }

  const createTask = (title: string) => {
    setTasks([{ id: v1(), title, isDone: false }, ...tasks])
  }

  const changeTaskStatus = (taskId: string, isDone: boolean) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, isDone } : task)))
  }

  return (
    <div className="app">
      <TodolistItem
        title="What to learn"
        tasks={getTasks()}
        filter={filter}
        deleteTask={deleteTask}
        changeFilter={changeFilter}
        createTask={createTask}
        changeTaskStatus={changeTaskStatus}
      />
    </div>
  )
}
