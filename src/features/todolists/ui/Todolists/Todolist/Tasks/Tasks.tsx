// @flow
import * as React from "react";
import List from "@mui/material/List";
import { TodolistType } from "../../../../model/todolists-reducer";
import { Task } from "./Task/Task";
import { useAppSelector } from "../../../../../../common/hooks/useAppSelector";
import { selectTasks } from "../../../../model/tasksSelectors";

type Props = {
  todolist: TodolistType;
};
export const Tasks = ({ todolist }: Props) => {
  const tasks = useAppSelector(selectTasks);

  const getTasks = () => {
    let filteredTasks = tasks[todolist.id];
    if (todolist.filter === "active") {
      filteredTasks = tasks[todolist.id].filter((task) => !task.isDone);
    }
    if (todolist.filter === "completed") {
      filteredTasks = tasks[todolist.id].filter((task) => task.isDone);
    }
    return filteredTasks;
  };

  return (
    <>
      {tasks[todolist.id].length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {getTasks().map((task) => {
            return <Task key={task.id} task={task} todolist={todolist} />;
          })}
        </List>
      )}
    </>
  );
};
