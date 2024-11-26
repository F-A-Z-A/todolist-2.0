import List from "@mui/material/List";
import { Task } from "./Task/Task";
import type { TodolistType } from "../../../../model/todolists-reducer";
import { useAppSelector } from "../../../../../../common/hooks/useAppSelector";
import { selectTasks } from "../../../../model/tasksSelectors";

type Props = {
  todolist: TodolistType;
};

export const Tasks = ({ todolist }: Props) => {
  const tasks = useAppSelector(selectTasks)[todolist.id];

  const getTasks = () => {
    let filteredTasks = tasks;
    if (todolist.filter === "active") {
      filteredTasks = tasks.filter((task) => !task.isDone);
    }
    if (todolist.filter === "completed") {
      filteredTasks = tasks.filter((task) => task.isDone);
    }
    return filteredTasks;
  };

  return (
    <>
      {tasks.length === 0 ? (
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
