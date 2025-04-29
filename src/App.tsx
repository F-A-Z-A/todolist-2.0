import "./App.css"
import { TodolistItem } from "./TodolistItem.tsx"

export type Task = {
  id: number
  title: string
  isDone: boolean
}

export const App = () => {
  const tasks1: Task[] = [
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false },
    { id: 4, title: "Redux", isDone: false },
    { id: 5, title: "Typescript", isDone: false },
    { id: 6, title: "RTK query", isDone: false },
  ]

  const tasks2: Task[] = [
    // { id: 1, title: "Hello world", isDone: true },
    // { id: 2, title: "I am Happy", isDone: false },
    // { id: 3, title: "Yo", isDone: false },
  ]

  return (
    <div className="app">
      <TodolistItem title="What to learn" tasks={tasks1} />
      <TodolistItem title="Songs" tasks={tasks2} />
    </div>
  )
}
