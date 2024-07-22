import { v1 } from "uuid";
import { TasksStateType } from "../App";
import { AddTodolistActionType, RemoveTodolistActionType, todolistID1, todolistID2 } from "./todolists-reducer";

const initialState: TasksStateType = {
  [todolistID1]: [
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
  ],
  [todolistID2]: [
    { id: v1(), title: "Milk", isDone: true },
    { id: v1(), title: "Bread", isDone: false },
  ],
};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType) => {
  switch (action.type) {
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.taskId),
      };
    }
    case "ADD-TASK": {
      const newTask = {
        id: v1(),
        title: action.payload.title,
        isDone: false,
      };
      return { ...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]] };
    }
    case "CHANGE-TASK-STATUS":
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id === action.payload.taskId
            ? {
                ...t,
                isDone: action.payload.status,
              }
            : t,
        ),
      };
    case "CHANGE-TASK-TITLE":
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id === action.payload.taskId
            ? {
                ...t,
                title: action.payload.newTitle,
              }
            : t,
        ),
      };
    case "ADD-TODOLIST":
      return { ...state, [action.payload.todolistId]: [] };
    case "REMOVE-TODOLIST":
      const copyState = { ...state };
      delete copyState[action.payload.todolistId];
      return copyState;
    default:
      return state;
  }
};

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
  return { type: "REMOVE-TASK", payload: { todolistId, taskId } } as const;
};

export const addTaskAC = (todolistId: string, title: string): AddTaskActionType => {
  return { type: "ADD-TASK", payload: { todolistId, title } } as const;
};

export const changeTaskStatusAC = (todolistId: string, taskId: string, status: boolean): ChangeTaskStatusActionType => {
  return { type: "CHANGE-TASK-STATUS", payload: { todolistId, taskId, status } } as const;
};

export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string): ChangeTaskTitleActionType => {
  return { type: "CHANGE-TASK-TITLE", payload: { todolistId, taskId, newTitle } } as const;
};

// types
export type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  payload: {
    todolistId: string;
    taskId: string;
  };
};

export type AddTaskActionType = {
  type: "ADD-TASK";
  payload: {
    todolistId: string;
    title: string;
  };
};

export type ChangeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS";
  payload: {
    todolistId: string;
    taskId: string;
    status: boolean;
  };
};

export type ChangeTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE";
  payload: {
    todolistId: string;
    taskId: string;
    newTitle: string;
  };
};

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType;
