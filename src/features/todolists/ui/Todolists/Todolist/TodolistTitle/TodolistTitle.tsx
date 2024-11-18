import s from "./TodolistTitle.module.css";
import { EditableSpan } from "../../../../../../common/components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { changeTodolistTitleAC, removeTodolistAC, TodolistType } from "../../../../model/todolists-reducer";
import { useAppDispatch } from "../../../../../../common/hooks/useAppDispatch";

type Props = {
  todolist: TodolistType;
};
export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title } = todolist;
  const dispatch = useAppDispatch();

  const removeTodolist = () => {
    dispatch(removeTodolistAC(id));
  };

  const updateTodolist = (title: string) => {
    dispatch(changeTodolistTitleAC({ id, title }));
  };

  return (
    <div className={s.container}>
      <h3>
        <EditableSpan value={title} onChange={updateTodolist} />
      </h3>
      <IconButton onClick={removeTodolist}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};
