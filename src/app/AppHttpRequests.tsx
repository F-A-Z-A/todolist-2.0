import { type CSSProperties, useEffect, useState } from "react"
import Checkbox from "@mui/material/Checkbox"
import { CreateItemForm, EditableSpan } from "@/common/components"
import type { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"
import { tasksApi } from "@/features/todolists/api/tasksApi.ts"
import type { DomainTask } from "@/features/todolists/api/tasksApi.types.ts"
import { TaskStatus } from "@/common/enums/enums.ts"

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([])
  const [tasks, setTasks] = useState<Record<string, DomainTask[]>>({})

  useEffect(() => {
    todolistsApi
      .getTodolists()
      .then((res) => {
        setTodolists(res.data)
        return res.data
      })
      .then((todolists) => {
        todolists.forEach((tl) => {
          tasksApi.getTasks(tl.id).then((res) => {
            setTasks((prev) => ({ ...prev, [tl.id]: res.data.items }))
          })
        })
      })
  }, [])

  const createTodolist = (title: string) => {
    todolistsApi.createTodolist(title).then((res) => {
      setTodolists([res.data.data.item, ...todolists])
      setTasks({ ...tasks, [res.data.data.item.id]: [] })
    })
  }

  const deleteTodolist = (id: string) => {
    todolistsApi.deleteTodolist(id).then(() => {
      setTodolists(todolists.filter((tl) => tl.id !== id))
    })
  }

  const changeTodolistTitle = (id: string, title: string) => {
    todolistsApi.changeTodolistTitle({ id, title }).then(() => {
      setTodolists(todolists.map((tl) => (tl.id === id ? { ...tl, title } : tl)))
    })
  }

  const createTask = (payload: { todolistId: string; title: string }) => {
    const { todolistId } = payload
    tasksApi.createTask(payload).then((res) => {
      setTasks({ ...tasks, [todolistId]: [res.data.data.item, ...tasks[todolistId]] })
    })
  }

  const deleteTask = (payload: { todolistId: string; taskId: string }) => {
    const { todolistId, taskId } = payload
    tasksApi.deleteTask(payload).then(() => {
      setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter((t) => t.id !== taskId) })
    })
  }

  const changeTaskStatus = (task: DomainTask, status: number) => {
    tasksApi.updateTask({ ...task, status }).then((res) => {
      setTasks({
        ...tasks,
        [task.todoListId]: tasks[task.todoListId].map((t) => (t.id === task.id ? { ...res.data.data.item } : t)),
      })
    })
  }

  const changeTaskTitle = (task: DomainTask, title: string) => {
    tasksApi.updateTask({ ...task, title }).then((res) => {
      setTasks({
        ...tasks,
        [task.todoListId]: tasks[task.todoListId].map((t) => (t.id === task.id ? { ...res.data.data.item } : t)),
      })
    })
  }

  return (
    <div style={{ margin: "20px" }}>
      <CreateItemForm onCreateItem={createTodolist} />
      {todolists.map((todolist: Todolist) => (
        <div key={todolist.id} style={container}>
          <div>
            <EditableSpan value={todolist.title} onChange={(title) => changeTodolistTitle(todolist.id, title)} />
            <button onClick={() => deleteTodolist(todolist.id)}>x</button>
          </div>
          <CreateItemForm onCreateItem={(title) => createTask({ todolistId: todolist.id, title })} />
          {tasks[todolist.id]?.map((task) => (
            <div key={task.id}>
              <Checkbox
                checked={task.status === 2}
                onChange={(e) =>
                  changeTaskStatus(task, e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New)
                }
              />
              <EditableSpan value={task.title} onChange={(title) => changeTaskTitle(task, title)} />
              <button onClick={() => deleteTask({ todolistId: todolist.id, taskId: task.id })}>x</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

//styles
const container: CSSProperties = {
  border: "1px solid black",
  margin: "20px 0",
  padding: "10px",
  width: "300px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
}
