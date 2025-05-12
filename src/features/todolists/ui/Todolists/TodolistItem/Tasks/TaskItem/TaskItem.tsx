import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import type { ChangeEvent } from "react"
import { getListItemSx } from "./TaskItem.styles"
import { changeTaskStatus, changeTaskTitle, deleteTask, type Task } from "@/features/todolists/model/tasks-slice.ts"

type Props = {
  task: Task
  todolistId: string
}

export const TaskItem = ({ task, todolistId }: Props) => {
  const dispatch = useAppDispatch()

  const deleteTaskHandler = () => {
    dispatch(deleteTask({ todolistId, taskId: task.id }))
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked
    dispatch(changeTaskStatus({ todolistId, taskId: task.id, isDone: newStatusValue }))
  }

  const changeTaskTitleHandler = (title: string) => {
    dispatch(changeTaskTitle({ todolistId, taskId: task.id, title }))
  }

  return (
    <ListItem sx={getListItemSx(task.isDone)}>
      <div>
        <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
        <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
      </div>
      <IconButton onClick={deleteTaskHandler}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
