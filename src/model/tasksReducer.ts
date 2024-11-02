import { TasksStateType } from "../App";
import { v1 } from "uuid";
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolistsReducer";

export const tasksReducer = (state: TasksStateType = {}, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.payload.todoId]: state[action.payload.todoId].filter((t) => t.id !== action.payload.taskId),
      };
    }
    case "ADD-TASK":
      const newTask = { id: v1(), title: action.payload.title, isDone: false };
      return {
        ...state,
        [action.payload.todoId]: [newTask, ...state[action.payload.todoId]],
      };
    case "CHANGE-TASK-STATUS":
      return {
        ...state,
        [action.payload.todoId]: state[action.payload.todoId].map((t) =>
          t.id === action.payload.taskId ? { ...t, isDone: action.payload.newStatus } : t,
        ),
      };
    case "CHANGE-TASK-TITLE": {
      return {
        ...state,
        [action.payload.todoId]: state[action.payload.todoId].map((t) =>
          t.id === action.payload.taskId ? { ...t, title: action.payload.newTitle } : t,
        ),
      };
    }
    case "ADD-TODOLIST":
      return { ...state, [action.payload.todoId]: [] };
    case "REMOVE-TODOLIST": {
      const newState = { ...state };
      delete newState[action.payload.todoId];
      return newState;
    }
    default:
      return state;
  }
};

// ----action creators
export const removeTaskAC = (todoId: string, taskId: string): RemoveTasksActionType => {
  return { type: "REMOVE-TASK", payload: { todoId, taskId } } as const;
};
export const addTaskAC = (todoId: string, title: string): AddTaskActionType => {
  return { type: "ADD-TASK", payload: { todoId, title } };
};
export const changeTaskStatusAC = (todoId: string, taskId: string, newStatus: boolean): ChangeTaskStatusActionType => {
  return { type: "CHANGE-TASK-STATUS", payload: { todoId, taskId, newStatus } };
};
export const changeTaskTitleAC = (todoId: string, taskId: string, newTitle: string): ChangeTaskTitleActionType => {
  return { type: "CHANGE-TASK-TITLE", payload: { todoId, taskId, newTitle } };
};

// ----types
type RemoveTasksActionType = {
  type: "REMOVE-TASK";
  payload: { todoId: string; taskId: string };
};
type AddTaskActionType = {
  type: "ADD-TASK";
  payload: { todoId: string; title: string };
};
type ChangeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS";
  payload: { todoId: string; taskId: string; newStatus: boolean };
};
type ChangeTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE";
  payload: { todoId: string; taskId: string; newTitle: string };
};
type ActionsType =
  | RemoveTasksActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType;
