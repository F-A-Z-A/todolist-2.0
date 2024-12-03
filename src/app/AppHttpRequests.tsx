import { useEffect, useState } from "react";
import type { Todolist } from "../features/todolists/api/todolistsApi.types";
import type { BaseTask, DomainTask } from "../features/todolists/api/tasksApi.types";
import { todolistsApi } from "../features/todolists/api/todolistsApi";
import { tasksApi } from "../features/todolists/api/tasksApi";
import Checkbox from "@mui/material/Checkbox";
import { AddItemForm, EditableSpan } from "common/components";
import { TaskStatus } from "common/enums";

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([]);
  const [tasks, setTasks] = useState<{
    [key: string]: DomainTask[];
  }>({});

  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      const todolists = res.data;
      setTodolists(todolists);
      todolists.forEach((tl) => {
        tasksApi.getTasks(tl.id).then((res) => {
          setTasks((prevState) => ({ ...prevState, [tl.id]: res.data.items }));
        });
      });
    });
  }, []);

  const createTodolistHandler = (title: string) => {
    todolistsApi.createTodolist(title).then((res) => {
      const newTodolist = res.data.data.item;
      setTodolists([newTodolist, ...todolists]);
      setTasks({ ...tasks, [res.data.data.item.id]: [] });
    });
  };

  const removeTodolistHandler = (id: string) => {
    todolistsApi.deleteTodolist(id).then((res) => {
      const newTodolists = todolists.filter((item) => item.id !== id);
      setTodolists(newTodolists);
    });
  };

  const updateTodolistHandler = (id: string, title: string) => {
    todolistsApi.updateTodolist({ id, title }).then((res) => {
      const newTodolists = todolists.map((item) => (item.id === id ? { ...item, title } : item));
      setTodolists(newTodolists);
    });
  };

  const createTaskHandler = (todolistId: string, title: string) => {
    tasksApi.createTask({ todolistId, title }).then((res) => {
      const newTask = res.data.data.item;
      setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] });
    });
  };

  const removeTaskHandler = (todolistId: string, taskId: string) => {
    tasksApi.deleteTask({ todolistId, taskId }).then((res) => {
      setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter((t) => t.id !== taskId) });
    });
  };

  const updateTaskHandler = (task: DomainTask, updateParams: Partial<BaseTask>) => {
    tasksApi.updateTask({ task, updateParams }).then((res) => {
      const newTasks = tasks[task.todoListId].map((t) => (t.id === task.id ? res.data.data.item : t));
      setTasks({ ...tasks, [task.todoListId]: newTasks });
    });
  };

  return (
    <div style={{ margin: "20px" }}>
      <AddItemForm addItem={createTodolistHandler} />

      {/* Todolists */}
      {todolists.map((tl) => {
        return (
          <div key={tl.id} style={todolist}>
            <div>
              <EditableSpan value={tl.title} onChange={(title: string) => updateTodolistHandler(tl.id, title)} />
              <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
            </div>
            <AddItemForm addItem={(title) => createTaskHandler(tl.id, title)} />

            {/* Tasks */}
            {!!tasks[tl.id] &&
              tasks[tl.id].map((task: DomainTask) => {
                return (
                  <div key={task.id}>
                    <Checkbox
                      checked={task.status === 2}
                      onChange={(e) =>
                        updateTaskHandler(task, {
                          status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New,
                        })
                      }
                    />
                    <EditableSpan value={task.title} onChange={(title) => updateTaskHandler(task, { title })} />
                    <button onClick={() => removeTaskHandler(tl.id, task.id)}>x</button>
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
};

// Styles
const todolist: React.CSSProperties = {
  border: "1px solid black",
  margin: "20px 0",
  padding: "10px",
  width: "300px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
};
