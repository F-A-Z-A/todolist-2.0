import List from "@mui/material/List";
import { useAppSelector } from "common/hooks/useAppSelector";
import { selectTasks } from "../../../../model/tasksSelectors";
import { Task } from "./Task/Task";
import type { DomainTodolist } from "features/todolists/model/todolists-reducer";
import { TaskStatus } from "common/enums";
import { useAppDispatch } from "common/hooks";
import { fetchTasksTC } from "features/todolists/model/tasks-reducer";
import { useEffect } from "react";

type Props = {
  todolist: DomainTodolist;
};

export const Tasks = ({ todolist }: Props) => {
  const tasks = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTasksTC(todolist.id));
  }, []);

  const allTodolistTasks = tasks[todolist.id];

  const getFilteredTasks = () => {
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
          {getFilteredTasks()?.map((task) => {
            return <Task key={task.id} task={task} todolist={todolist} />;
          })}
        </List>
      )}
    </>
  );
};
