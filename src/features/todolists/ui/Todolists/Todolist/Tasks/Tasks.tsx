import List from "@mui/material/List";
import { useAppSelector } from "common/hooks/useAppSelector";
import { selectTasks } from "../../../../model/tasksSelectors";
import { Task } from "./Task/Task";
import { type TodolistDomainType } from "features/todolists/model/todolists-reducer";
import { useEffect } from "react";
import { fetchTasksTC } from "features/todolists/model/tasks-reducer";
import { useAppDispatch } from "common/hooks";
import { TaskStatus } from "common/enums";

type Props = {
  todolist: TodolistDomainType;
};

export const Tasks = ({ todolist }: Props) => {
  const tasks = useAppSelector(selectTasks);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTasksTC(todolist.id));
  }, []);

  const allTodolistTasks = tasks[todolist.id];

  const getTasks = () => {
    let tasksForTodolist = allTodolistTasks;
    if (todolist.filter === "active") {
      tasksForTodolist = allTodolistTasks.filter((task) => task.status === TaskStatus.New);
    }
    if (todolist.filter === "completed") {
      tasksForTodolist = allTodolistTasks.filter((task) => task.status === TaskStatus.Completed);
    }
    return tasksForTodolist;
  };

  return (
    <>
      {allTodolistTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {getTasks()?.map((task) => {
            return <Task key={task.id} task={task} todolist={todolist} />;
          })}
        </List>
      )}
    </>
  );
};
