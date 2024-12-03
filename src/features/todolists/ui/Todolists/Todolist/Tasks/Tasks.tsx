import List from "@mui/material/List";
import { useAppSelector } from "common/hooks/useAppSelector";
import { selectTasks } from "features/todolists/model/tasksSelectors";
import type { TodolistType } from "features/todolists/model/todolists-reducer";
import { Task } from "features/todolists/ui/Todolists/Todolist/Tasks/Task";

type Props = {
  todolist: TodolistType;
};

export const Tasks = ({ todolist }: Props) => {
  const tasks = useAppSelector(selectTasks);

  const allTodolistTasks = tasks[todolist.id];

  let tasksForTodolist = allTodolistTasks;

  if (todolist.filter === "active") {
    tasksForTodolist = allTodolistTasks.filter((task) => !task.isDone);
  }

  if (todolist.filter === "completed") {
    tasksForTodolist = allTodolistTasks.filter((task) => task.isDone);
  }

  return (
    <>
      {tasksForTodolist.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasksForTodolist.map((task) => {
            return <Task task={task} todolist={todolist} />;
          })}
        </List>
      )}
    </>
  );
};
