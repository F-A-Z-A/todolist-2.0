import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App";

let todolistID1 = v1();
let todolistID2 = v1();

const initialState: TodolistType[] = [
  { id: todolistID1, title: "What to learn", filter: "all" },
  { id: todolistID2, title: "What to buy", filter: "all" },
];

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType) => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.payload.todolistId);
    }
    case "ADD-TODOLIST": {
      const newTodoList = { id: v1(), title: action.payload.title, filter: "all" };
      return [newTodoList, ...state];
    }
    case "CHANGE-TODOLIST-TITLE": {
      return state.map((tl) => (tl.id === action.payload.todolistId ? { ...tl, title: action.payload.title } : tl));
    }
    case "CHANGE-TODOLIST-FILTER": {
      return state.map((tl) => (tl.id === action.payload.todolistId ? { ...tl, filter: action.payload.filter } : tl));
    }
    default:
      throw new Error("I don't understand this type");
  }
};

// const action = {
//   type: "todos/todoAdded",
//   payload: {
//     id: "1eb42cac-f809-4c16-b6b0-f3c6169d83b0",
//   },
// };

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return { type: "REMOVE-TODOLIST", payload: { todolistId } } as const;
};

export const addTodolistAC = (title: string): AddTodolistActionType => {
  return { type: "ADD-TODOLIST", payload: { title } } as const;
};

export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
  return { type: "CHANGE-TODOLIST-TITLE", payload: { todolistId, title } } as const;
};

export const changeTodolistFilterAC = (
  todolistId: string,
  filter: FilterValuesType,
): ChangeTodolistFilterActionType => {
  return { type: "CHANGE-TODOLIST-FILTER", payload: { todolistId, filter } } as const;
};

// types
export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  payload: {
    todolistId: string;
  };
};

export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  payload: {
    title: string;
  };
};

export type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  payload: {
    todolistId: string;
    title: string;
  };
};

export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  payload: {
    todolistId: string;
    filter: FilterValuesType;
  };
};

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;
