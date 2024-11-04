import { TasksStateType } from "../App";
import { v1 } from "uuid";
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer";

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.taskId),
      };
    }
    case "ADD-TASK": {
      const newTask = { id: v1(), title: action.payload.title, isDone: false };
      return {
        ...state,
        [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]],
      };
    }
    case "CHANGE-TASK-STATUS": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id === action.payload.taskId ? { ...t, isDone: action.payload.isDone } : t,
        ),
      };
    }
    case "CHANGE-TASK-TITLE": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id === action.payload.taskId ? { ...t, title: action.payload.title } : t,
        ),
      };
    }
    case "ADD-TODOLIST": {
      return { [action.payload.todolistId]: [], ...state };
    }
    case "REMOVE-TODOLIST": {
      const newState = state;
      delete newState[action.payload.id];
      return newState;
    }
    default:
      return state;
  }
};

// Action creators
export const removeTaskAC = (payload: { todolistId: string; taskId: string }) => {
  return { type: "REMOVE-TASK", payload } as const;
};
export const addTaskAC = (payload: { todolistId: string; title: string }) => {
  return { type: "ADD-TASK", payload } as const;
};
export const changeTaskStatusAC = (payload: { todolistId: string; taskId: string; isDone: boolean }) => {
  return { type: "CHANGE-TASK-STATUS", payload } as const;
};
export const changeTaskTitleAC = (payload: { todolistId: string; taskId: string; title: string }) => {
  return { type: "CHANGE-TASK-TITLE", payload } as const;
};

// Actions types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>;

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType;
