import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../app/App";

export let todolistID1 = v1();
export let todolistID2 = v1();

const initialState: TodolistType[] = [
  { id: todolistID1, title: "What to learn", filter: "all" },
  { id: todolistID2, title: "What to buy", filter: "all" },
];

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.payload.todolistId);
    }

    case "ADD-TODOLIST": {
      const newTodolist: TodolistType = { id: action.payload.todolistId, title: action.payload.title, filter: "all" };
      return [newTodolist, ...state];
    }

    case "CHANGE-TODOLIST-TITLE": {
      return state.map((tl) => (tl.id === action.payload.todolistId ? { ...tl, title: action.payload.title } : tl));
    }

    case "CHANGE-TODOLIST-FILTER": {
      return state.map((tl) => (tl.id === action.payload.todolistId ? { ...tl, filter: action.payload.filter } : tl));
    }

    default:
      return state;
  }
};

// Action creators
export const removeTodolistAC = (payload: { todolistId: string }) => {
  return { type: "REMOVE-TODOLIST", payload } as const;
};

export const addTodolistAC = (payload: { title: string }) => {
  return { type: "ADD-TODOLIST", payload: { ...payload, todolistId: v1() } } as const;
};

export const changeTodolistTitleAC = (payload: { todolistId: string; title: string }) => {
  return { type: "CHANGE-TODOLIST-TITLE", payload } as const;
};

export const changeTodolistFilterAC = (payload: { todolistId: string; filter: FilterValuesType }) => {
  return { type: "CHANGE-TODOLIST-FILTER", payload } as const;
};

// Actions types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>;
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>;

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;
