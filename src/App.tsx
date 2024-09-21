import "./App.css";
import { Todolist } from "./Todolist";
import { useState } from "react";
import { v1 } from "uuid";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterType = "all" | "active" | "completed";

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
    { id: v1(), title: "Typescript", isDone: false },
    { id: v1(), title: "RTK query", isDone: false },
  ]);
  const [filter, setFilter] = useState<FilterType>("all");

  let tasksForTodolist = tasks;
  if (filter === "active") {
    tasksForTodolist = tasks.filter((task) => !task.isDone);
  }
  if (filter === "completed") {
    tasksForTodolist = tasks.filter((task) => task.isDone);
  }

  const removeTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };
  const changeFilter = (filter: FilterType) => {
    setFilter(filter);
  };
  const addTask = (title: string) => {
    setTasks([{ id: v1(), title: title, isDone: false }, ...tasks]);
  };
  // const changeTaskStatus = (taskId: string, status: boolean) => {
  //   const task = tasks.find((t) => t.id === taskId);
  //   if (task) {
  //     task.isDone = status;
  //     setTasks([...tasks]);
  //   }
  // };
  const changeTaskStatus = (taskId: string, taskStatus: boolean) => {
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, isDone: taskStatus } : t)));
  };

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeTaskStatus}
        filter={filter}
      />
    </div>
  );
}

export default App;
