import Checkbox from "@mui/material/Checkbox";
import React, { ChangeEvent, useEffect, useState } from "react";
import { AddItemForm } from "../common/components/AddItemForm/AddItemForm";
import { EditableSpan } from "../common/components/EditableSpan/EditableSpan";
import axios from "axios";
import { apiKey, tkKey } from "./keys";

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([]);
  const [tasks, setTasks] = useState<{ [key: string]: DomainTask[] }>({});

  useEffect(() => {
    axios
      .get<Todolist[]>("https://social-network.samuraijs.com/api/1.1/todo-lists", {
        headers: { Authorization: tkKey },
      })
      .then((res) => {
        const todolists = res.data;
        setTodolists(todolists);
        todolists.forEach((tl) => {
          axios
            .get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${tl.id}/tasks`, {
              headers: { Authorization: tkKey, "API-KEY": apiKey },
            })
            .then((res) => {
              setTasks((prevTasks) => ({ ...prevTasks, [tl.id]: res.data.items }));
            });
        });
      });
  }, []);

  const createTodolistHandler = (title: string) => {
    axios
      .post<CreateTodolistResponse>(
        "https://social-network.samuraijs.com/api/1.1/todo-lists",
        { title },
        {
          headers: { Authorization: tkKey, "API-KEY": apiKey },
        },
      )
      .then((res) => {
        console.log(res);
        setTodolists([res.data.data.item, ...todolists]);
      });
  };

  const removeTodolistHandler = (id: string) => {
    axios
      .delete<DeleteTodolistResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {
        headers: { Authorization: tkKey, "API-KEY": apiKey },
      })
      .then((res) => {
        setTodolists(todolists.filter((tl) => tl.id !== id));
        const copyTasks = { ...tasks };
        delete copyTasks[id];
        setTasks(copyTasks);
      });
  };

  const updateTodolistHandler = (id: string, title: string) => {
    axios
      .put<UpdateTodolistResponse>(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
        { title },
        {
          headers: { Authorization: tkKey, "API-KEY": apiKey },
        },
      )
      .then((res) => {
        setTodolists(todolists.map((tl) => (tl.id === id ? { ...tl, title } : tl)));
      });
  };

  const createTaskHandler = (title: string, todolistId: string) => {
    axios
      .post<CreateTaskResponse>(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
        { title },
        {
          headers: { Authorization: tkKey, "API-KEY": apiKey },
        },
      )
      .then((res) => {
        const newTask = res.data.data.item;
        setTasks({ ...tasks, [todolistId]: tasks[todolistId] ? [newTask, ...tasks[todolistId]] : [newTask] });
      });
  };

  const removeTaskHandler = (taskId: string, todolistId: string) => {
    axios
      .delete<DeleteTaskResponse>(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`,
        {
          headers: { Authorization: tkKey, "API-KEY": apiKey },
        },
      )
      .then((res) => {
        console.log(res.data);
        setTasks({
          ...tasks,
          [todolistId]: tasks[todolistId].filter((t) => t.id !== taskId),
        });
      });
  };

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
    const status = e.currentTarget.checked ? 2 : 0;
    const model: UpdateTaskModel = {
      status,
      title: task.title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
    };

    axios
      .put<UpdateTaskResponse>(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`,
        model,
        {
          headers: { Authorization: tkKey, "API-KEY": apiKey },
        },
      )
      .then((res) => {
        // console.log(res.data);
        setTasks({
          ...tasks,
          [task.todoListId]: tasks[task.todoListId].map((t) => (t.id === task.id ? { ...t, ...model } : t)),
        });
      });
  };

  const changeTaskTitleHandler = (title: string, task: any) => {
    const model: UpdateTaskModel = {
      status: task.status,
      title: title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
    };

    axios
      .put<UpdateTaskResponse>(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`,
        model,
        {
          headers: { Authorization: tkKey, "API-KEY": apiKey },
        },
      )
      .then((res) => {
        // console.log(res.data);
        setTasks({
          ...tasks,
          [task.todoListId]: tasks[task.todoListId].map((t) => (t.id === task.id ? { ...t, ...model } : t)),
        });
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
            <AddItemForm addItem={(title) => createTaskHandler(title, tl.id)} />

            {/* Tasks */}
            {!!tasks[tl.id] &&
              tasks[tl.id].map((task: DomainTask) => {
                return (
                  <div key={task.id}>
                    <Checkbox checked={task.status === 2} onChange={(e) => changeTaskStatusHandler(e, task)} />
                    <EditableSpan value={task.title} onChange={(title) => changeTaskTitleHandler(title, task)} />
                    <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
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

// todolists types
export type Todolist = {
  addedDate: string;
  id: string;
  order: number;
  title: string;
};

type FieldError = {
  error: string;
  field: string;
};

type CreateTodolistResponse = {
  resultCode: number;
  messages: string[];
  fieldsErrors: FieldError[];
  data: {
    item: Todolist;
  };
};

type DeleteTodolistResponse = {
  resultCode: number;
  messages: string[];
  fieldsErrors: FieldError[];
  data: {};
};

type UpdateTodolistResponse = {
  resultCode: number;
  messages: string[];
  fieldsErrors: FieldError[];
  data: {};
};

// tasks types
type DomainTask = {
  description: string;
  title: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: DomainTask[];
};

type CreateTaskResponse = {
  resultCode: number;
  messages: string[];
  fieldsErrors: FieldError[];
  data: {
    item: DomainTask;
  };
};

type UpdateTaskModel = {
  title: string;
  description: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
};

type UpdateTaskResponse = {
  resultCode: number;
  messages: string[];
  data: {
    item: DomainTask;
  };
};

type DeleteTaskResponse = {
  resultCode: number;
  messages: string[];
  data: {};
};
