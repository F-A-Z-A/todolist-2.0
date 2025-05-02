import "./App.css"
import { TodolistItem } from "./TodolistItem"
import { useState } from "react"
import { v1 } from "uuid"

const todolistId1 = v1()
const todolistId2 = v1()

export const App = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ])

  const [tasks, setTasks] = useState<TasksState>({
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "Rest API", isDone: true },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
  })

  const getTasks = (todolistId: string, filter: FilterValues) => {
    let filteredTasks = tasks[todolistId]
    if (filter === "active") {
      filteredTasks = tasks[todolistId].filter((task) => !task.isDone)
    }
    if (filter === "completed") {
      filteredTasks = tasks[todolistId].filter((task) => task.isDone)
    }
    return filteredTasks
  }

  const deleteTask = (todolistId: string, taskId: string) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter((t) => t.id !== taskId) })
  }

  const createTask = (todolistId: string, title: string) => {
    setTasks({ ...tasks, [todolistId]: [{ id: v1(), title, isDone: false }, ...tasks[todolistId]] })
  }

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map((t) => (t.id === taskId ? { ...t, isDone } : t)),
    })
  }

  const changeFilter = (todolistId: string, filter: FilterValues) => {
    setTodolists(todolists.map((tl) => (tl.id === todolistId ? { ...tl, filter } : tl)))
  }

  const deleteTodolist = (todolistId: string) => {
    setTodolists(todolists.filter((tl) => tl.id !== todolistId))
    delete tasks[todolistId]
    setTasks({ ...tasks })
  }

  return (
    <div className="app">
      {todolists.map((todolist) => {
        const tasks = getTasks(todolist.id, todolist.filter)

        return (
          <TodolistItem
            key={todolist.id}
            todolist={todolist}
            tasks={tasks}
            deleteTask={deleteTask}
            changeFilter={changeFilter}
            createTask={createTask}
            changeTaskStatus={changeTaskStatus}
            deleteTodolist={deleteTodolist}
          />
        )
      })}
    </div>
  )
}

// types
export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValues = "all" | "active" | "completed"

export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}
export type TasksState = Record<string, Task[]>
