import { AddItemForm } from "common/components";
import { useAppDispatch } from "common/hooks";
import { addTaskAC } from "features/todolists/model/tasks-reducer";
import type { TodolistType } from "features/todolists/model/todolists-reducer";
import { FilterTasksButtons } from "features/todolists/ui/Todolists/Todolist/FilterTasksButtons/FilterTasksButtons";
import { Tasks } from "features/todolists/ui/Todolists/Todolist/Tasks/Tasks";
import { TodolistTitle } from "features/todolists/ui/Todolists/Todolist/TodolistTitle/TodolistTitle";

type Props = {
  todolist: TodolistType;
};

export const Todolist = ({ todolist }: Props) => {
  const dispatch = useAppDispatch();

  const addTaskCallback = (title: string) => {
    dispatch(addTaskAC({ title, todolistId: todolist.id }));
  };

  return (
    <>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCallback} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </>
  );
};
