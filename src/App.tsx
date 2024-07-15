import "./App.css";
import { Todolist } from "./Todolist";
import { useState } from "react";
import { v1 } from "uuid";

function App() {
  const todolistID1 = v1();
  const todolistID2 = v1();

  const [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ]);

  const [tasks, setTasks] = useState<TasksStateType>({
    [todolistID1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: "Rest API", isDone: true },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
  });

  // tasks
  const removeTask = (todolistId: string, taskId: string) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter((t) => t.id !== taskId) });
  };

  const addTask = (todolistId: string, title: string) => {
    const newTask = {
      id: v1(),
      title: title,
      isDone: false,
    };
    setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] });
  };

  const changeFilter = (todolistId: string, filter: FilterValuesType) => {
    setTodolists(todolists.map((tl) => (tl.id === todolistId ? { ...tl, filter } : tl)));
  };

  const changeTaskStatus = (todolistId: string, taskId: string, taskStatus: boolean) => {
    // const newState = tasks.map((t) => (t.id == taskId ? { ...t, isDone: taskStatus } : t));
    // setTasks(newState);
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map((t) => (t.id === taskId ? { ...t, isDone: taskStatus } : t)),
    });
  };

  // todolists
  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter((tl) => tl.id !== todolistId));
    delete tasks[todolistId];
    setTasks({ ...tasks });
  };

  return (
    <div className="App">
      {todolists.map((tl) => {
        const allTodolistTasks = tasks[tl.id];
        let tasksForTodolist = allTodolistTasks;
        if (tl.filter === "active") {
          tasksForTodolist = allTodolistTasks.filter((task) => !task.isDone);
        }

        if (tl.filter === "completed") {
          tasksForTodolist = allTodolistTasks.filter((task) => task.isDone);
        }
        return (
          <Todolist
            key={tl.id}
            todolistId={tl.id}
            title={tl.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            filter={tl.filter}
            removeTodolist={removeTodolist}
          />
        );
      })}
    </div>
  );
}

export default App;

//types
export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type FilterValuesType = "all" | "active" | "completed";

export type TasksStateType = {
  [key: string]: TaskType[];
};
