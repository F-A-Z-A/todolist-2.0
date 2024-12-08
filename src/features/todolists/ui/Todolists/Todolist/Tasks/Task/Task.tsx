import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import { ChangeEvent } from "react";
import { EditableSpan } from "common/components";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { removeTaskTC, updateTaskTC } from "../../../../../model/tasks-reducer";
import { getListItemSx } from "./Task.styles";
import type { DomainTodolist } from "features/todolists/model/todolists-reducer";
import type { DomainTask } from "features/todolists/api/tasksApi.types";
import { TaskStatus } from "common/enums";

type Props = {
  task: DomainTask;
  todolist: DomainTodolist;
};

export const Task = ({ task, todolist }: Props) => {
  const dispatch = useAppDispatch();

  const removeTaskHandler = () => {
    dispatch(removeTaskTC({ todolistId: task.todoListId, taskId: task.id }));
  };

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New;
    dispatch(updateTaskTC({ todolistId: todolist.id, taskId: task.id, updateParams: { status } }));
  };

  const changeTaskTitleHandler = (title: string) => {
    dispatch(updateTaskTC({ todolistId: todolist.id, taskId: task.id, updateParams: { title } }));
  };

  return (
    <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatus.Completed)}>
      <div>
        <Checkbox checked={task.status === TaskStatus.Completed} onChange={changeTaskStatusHandler} />
        <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
      </div>
      <IconButton onClick={removeTaskHandler}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};
