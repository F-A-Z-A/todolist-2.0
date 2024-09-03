import "./App.css";
import { Todolist } from "./Todolist";
import { useState } from "react";

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

export type FilterType = "all" | "active" | "completed";

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false },
    { id: 4, title: "Redux", isDone: false },
    { id: 5, title: "Typescript", isDone: false },
    { id: 6, title: "RTK query", isDone: false },
  ]);
  const [filter, setFilter] = useState<FilterType>("all");

  let tasksForTodolist = tasks;
  if (filter === "active") {
    tasksForTodolist = tasks.filter((task) => !task.isDone);
  }
  if (filter === "completed") {
    tasksForTodolist = tasks.filter((task) => task.isDone);
  }

  const removeTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };
  const changeFilter = (filter: FilterType) => {
    setFilter(filter);
  };

  return (
    <div className="App">
      <Todolist title="What to learn" tasks={tasksForTodolist} removeTask={removeTask} changeFilter={changeFilter} />
    </div>
  );
}

export default App;
