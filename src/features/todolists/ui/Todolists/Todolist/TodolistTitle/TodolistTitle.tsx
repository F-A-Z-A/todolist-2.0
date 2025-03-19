import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import { EditableSpan } from "common/components"
import { todolistsApi, useRemoveTodolistMutation, useUpdateTodolistTitleMutation } from "../../../../api/todolistsApi"
import s from "./TodolistTitle.module.css"
import { useAppDispatch } from "common/hooks"
import { RequestStatus } from "../../../../../../app/appSlice"
import { DomainTodolist } from "../../../../lib/types/types"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { title, id, entityStatus } = todolist
  const [removeTodolist] = useRemoveTodolistMutation()
  const [updateTodolistTitle] = useUpdateTodolistTitleMutation()
  const dispatch = useAppDispatch()

  const updateQueryData = (status: RequestStatus) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
        const todolist = state.find((tl) => tl.id === id)
        if (todolist) todolist.entityStatus = status
      }),
    )
  }

  const removeTodolistHandler = () => {
    updateQueryData("loading")
    removeTodolist(id)
      .unwrap()
      .then(() => {
        updateQueryData("succeeded")
      })
      .catch(() => {
        updateQueryData("failed")
      })
  }

  const updateTodolistHandler = (title: string) => {
    updateTodolistTitle({ id, title })
  }

  return (
    <div className={s.container}>
      <h3>
        <EditableSpan value={title} onChange={updateTodolistHandler} disabled={entityStatus === "loading"} />
      </h3>
      <IconButton onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
