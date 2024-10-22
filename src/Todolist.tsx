import React, { ChangeEvent } from "react";
import { FilterValuesType, TaskType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/material";
import { filterButtonsContainerSx, getListItemOpacitySx, listItemContainerSx } from "./Todolist.styles";

type PropsType = {
  title: string;
  todolistId: string;
  tasks: TaskType[];
  removeTask: (taskId: string, todolistId: string) => void;
  changeFilter: (filter: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void;
  filter: FilterValuesType;
  removeTodolist: (todolistId: string) => void;
  updateTask: (todolistId: string, taskId: string, title: string) => void;
  updateTodolist: (todolistId: string, title: string) => void;
};

export const Todolist = (props: PropsType) => {
  const {
    title,
    tasks,
    filter,
    removeTask,
    changeFilter,
    addTask,
    changeTaskStatus,
    todolistId,
    removeTodolist,
    updateTask,
    updateTodolist,
  } = props;

  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    changeFilter(filter, props.todolistId);
  };

  const removeTodolistHandler = () => {
    removeTodolist(todolistId);
  };

  const addTaskCallback = (title: string) => {
    addTask(title, props.todolistId);
  };

  const updateTodolistHandler = (title: string) => {
    updateTodolist(props.todolistId, title);
  };

  return (
    <div>
      <div className={"todolist-title-container"}>
        <h3>
          <EditableSpan value={title} onChange={updateTodolistHandler} />
        </h3>
        <IconButton onClick={removeTodolistHandler} color="secondary">
          <DeleteIcon />
        </IconButton>
      </div>
      <AddItemForm addItem={addTaskCallback} />
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasks.map((task) => {
            const removeTaskHandler = () => {
              removeTask(task.id, todolistId);
            };

            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              const newStatusValue = e.currentTarget.checked;
              changeTaskStatus(task.id, newStatusValue, todolistId);
            };

            const changeTaskTitleHandler = (title: string) => {
              updateTask(todolistId, task.id, title);
            };

            return (
              <ListItem key={task.id} sx={listItemContainerSx}>
                <Box sx={getListItemOpacitySx(task.isDone)}>
                  <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} size="small" color={"primary"} />
                  <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
                </Box>
                <IconButton onClick={removeTaskHandler} color="success" size={"small"}>
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </ListItem>
            );
          })}
        </List>
      )}
      <Box sx={filterButtonsContainerSx}>
        <Button
          variant={filter === "all" ? "outlined" : "text"}
          onClick={() => changeFilterTasksHandler("all")}
          color={"inherit"}
        >
          All
        </Button>
        <Button
          variant={filter === "active" ? "outlined" : "text"}
          onClick={() => changeFilterTasksHandler("active")}
          color={"primary"}
        >
          Active
        </Button>
        <Button
          variant={filter === "completed" ? "outlined" : "text"}
          onClick={() => changeFilterTasksHandler("completed")}
          color={"secondary"}
        >
          Completed
        </Button>
      </Box>
    </div>
  );
};
