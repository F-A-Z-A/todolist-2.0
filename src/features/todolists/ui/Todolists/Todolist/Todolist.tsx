import { AddItemForm } from "common/components";
import { useAppDispatch } from "common/hooks";
import { addTaskTC } from "../../../model/tasks-reducer";
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons";
import { Tasks } from "./Tasks/Tasks";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";
import type { DomainTodolist } from "features/todolists/model/todolists-reducer";

type Props = {
  todolist: DomainTodolist;
};

export const Todolist = ({ todolist }: Props) => {
  const dispatch = useAppDispatch();

  const addTaskCallback = (title: string) => {
    dispatch(addTaskTC({ todolistId: todolist.id, title }));
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
