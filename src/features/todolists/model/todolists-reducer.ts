import type { Todolist } from "features/todolists/api/todolistsApi.types";
import type { Dispatch } from "redux";
import { todolistsApi } from "features/todolists/api/todolistsApi";

const initialState: TodolistDomainType[] = [];

export const todolistsReducer = (
  state: TodolistDomainType[] = initialState,
  action: ActionsType,
): TodolistDomainType[] => {
  switch (action.type) {
    case "SET-TODOLISTS":
      const { todolists } = action.payload;
      return todolists.map((tl) => ({ ...tl, filter: "all" }));

    case "REMOVE-TODOLIST": {
      const { id } = action.payload;
      return state.filter((tl) => tl.id !== id);
    }

    case "ADD-TODOLIST": {
      const { todolist } = action.payload;
      return [{ ...todolist, filter: "all" }, ...state];
    }

    case "CHANGE-TODOLIST-TITLE": {
      const { id, title } = action.payload;
      return state.map((tl) => (tl.id === id ? { ...tl, title } : tl));
    }

    case "CHANGE-TODOLIST-FILTER": {
      const { id, filter } = action.payload;
      return state.map((tl) => (tl.id === id ? { ...tl, filter } : tl));
    }

    default:
      return state;
  }
};

// Action creators
export const setTodolistAC = (todolists: Todolist[]) => {
  return { type: "SET-TODOLISTS", payload: { todolists } } as const;
};

export const removeTodolistAC = (id: string) => {
  return { type: "REMOVE-TODOLIST", payload: { id } } as const;
};

export const addTodolistAC = (todolist: Todolist) => {
  return { type: "ADD-TODOLIST", payload: { todolist } } as const;
};

export const changeTodolistTitleAC = (payload: { id: string; title: string }) => {
  return { type: "CHANGE-TODOLIST-TITLE", payload } as const;
};

export const changeTodolistFilterAC = (payload: { id: string; filter: FilterValuesType }) => {
  return { type: "CHANGE-TODOLIST-FILTER", payload } as const;
};

// thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
  todolistsApi.getTodolists().then((res) => {
    dispatch(setTodolistAC(res.data));
  });
};

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  todolistsApi.createTodolist(title).then((res) => {
    dispatch(addTodolistAC(res.data.data.item));
  });
};

export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
  todolistsApi.deleteTodolist(id).then(() => {
    dispatch(removeTodolistAC(id));
  });
};

export const updateTodolistTitleTC = (arg: { id: string; title: string }) => (dispatch: Dispatch) => {
  todolistsApi.updateTodolist(arg).then(() => {
    dispatch(changeTodolistTitleAC(arg));
  });
};

// Actions types
export type SetTodolistsActionType = ReturnType<typeof setTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>;
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>;

type ActionsType =
  | SetTodolistsActionType
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;

// types
export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = Todolist & {
  filter: FilterValuesType;
};
