import { FilterValuesType, TodolistType } from "../App";

export const todolistsReducer = (state: TodolistType[] = [], action: ActionsType): TodolistType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.payload.todoId);
    }
    case "ADD-TODOLIST": {
      const newTodo: TodolistType = { id: action.payload.todoId, title: action.payload.title, filter: "all" };
      return [newTodo, ...state];
    }
    case "CHANGE-TODOLIST-FILTER": {
      return state.map((tl) => (tl.id === action.payload.todoId ? { ...tl, filter: action.payload.filter } : tl));
    }
    case "CHANGE-TODOLIST-TITLE":
      return state.map((tl) => (tl.id === action.payload.todoId ? { ...tl, title: action.payload.title } : tl));
    default:
      return state;
  }
};

// ----action creators
export const removeTodolistAC = (todoId: string): RemoveTodolistActionType => {
  return { type: "REMOVE-TODOLIST", payload: { todoId } } as const;
};
export const addTodolistAC = (todoId: string, title: string): AddTodolistActionType => {
  return { type: "ADD-TODOLIST", payload: { todoId, title } } as const;
};
export const changeTodolistFilterAC = (todoId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
  return { type: "CHANGE-TODOLIST-FILTER", payload: { todoId, filter } } as const;
};
export const changeTodolistTitleAC = (todoId: string, title: string): ChangeTodolistTitleActionType => {
  return { type: "CHANGE-TODOLIST-TITLE", payload: { todoId, title } } as const;
};

// ----types
export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  payload: { todoId: string };
};
export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  payload: { todoId: string; title: string };
};
type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  payload: { todoId: string; filter: FilterValuesType };
};
type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  payload: { todoId: string; title: string };
};

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistFilterActionType
  | ChangeTodolistTitleActionType;
