import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import styles from "./TodolistTitle.module.css"
import { changeTodolistTitleTC, deleteTodolistTC } from "@/features/todolists/model/todolists-slice.ts"
import type { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"

type Props = {
  todolist: Todolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title } = todolist

  const dispatch = useAppDispatch()

  const deleteTodolistHandler = () => {
    dispatch(deleteTodolistTC({ id }))
  }

  const changeTodolistTitleHandler = (title: string) => {
    dispatch(changeTodolistTitleTC({ id, title }))
  }

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
      </h3>
      <IconButton onClick={deleteTodolistHandler}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
