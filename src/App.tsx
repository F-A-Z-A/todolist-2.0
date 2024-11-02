import "./App.css";
import { Todolist } from "./Todolist";
import React, { useReducer, useState } from "react";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import { MenuButton } from "./MenuButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import CssBaseline from "@mui/material/CssBaseline";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from "./model/todolistsReducer";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from "./model/tasksReducer";

export function App() {
  const todolistID1 = v1();
  const todolistID2 = v1();

  const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ]);

  const [tasks, dispatchTasks] = useReducer(tasksReducer, {
    [todolistID1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "Bread", isDone: false },
    ],
  });

  const [themeMode, setThemeMode] = useState<ThemeMode>("light");

  const theme = createTheme({
    palette: {
      mode: themeMode === "light" ? "light" : "dark",
      primary: {
        main: "#087EA4",
      },
    },
  });

  // function for tasks
  const removeTask = (taskId: string, todolistId: string) => {
    dispatchTasks(removeTaskAC(todolistId, taskId));
  };

  const addTask = (title: string, todolistId: string) => {
    dispatchTasks(addTaskAC(todolistId, title));
  };

  const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
    dispatchTasks(changeTaskStatusAC(todolistId, taskId, taskStatus));
  };

  const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    dispatchTasks(changeTaskTitleAC(todolistId, taskId, title));
  };

  // function for todolists
  const removeTodolist = (todolistId: string) => {
    dispatchTodolists(removeTodolistAC(todolistId));
    dispatchTasks(removeTodolistAC(todolistId));
  };

  const addTodolist = (title: string) => {
    const todolistId = v1();
    dispatchTodolists(addTodolistAC(todolistId, title));
    dispatchTasks(addTodolistAC(todolistId, title));
  };

  const changeTodolistFilter = (filter: FilterValuesType, todolistId: string) => {
    dispatchTodolists(changeTodolistFilterAC(todolistId, filter));
  };

  const changeTodolistTitle = (todolistId: string, title: string) => {
    dispatchTodolists(changeTodolistTitleAC(todolistId, title));
  };

  const changeModeHandler = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" sx={{ mb: "30px" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            <MenuButton>Login</MenuButton>
            <MenuButton>Logout</MenuButton>
            <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
            <Switch color={"default"} onChange={changeModeHandler} />
          </div>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container sx={{ mb: "30px" }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>

        <Grid container spacing={4}>
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
              <Grid key={tl.id}>
                <Paper sx={{ p: "0 20px 20px 20px" }}>
                  <Todolist
                    todolistId={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeTodolistFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    updateTask={changeTaskTitle}
                    updateTodolist={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

// ----types
export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: TaskType[];
};

type ThemeMode = "dark" | "light";
