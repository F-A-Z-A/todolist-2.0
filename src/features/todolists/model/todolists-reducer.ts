import type { Todolist } from "features/todolists/api/todolistsApi.types";
import type { Dispatch } from "redux";
import { todolistsApi } from "features/todolists/api/todolistsApi";

const initialState: DomainTodolist[] = [];

export const todolistsReducer = (state: DomainTodolist[] = initialState, action: ActionsType): DomainTodolist[] => {
  switch (action.type) {
    case "SET-TODOLISTS": {
      return action.todolists.map((tl) => ({ ...tl, filter: "all" }));
    }
    case "ADD-TODOLIST": {
      const newTodolist: DomainTodolist = {
        ...action.payload.todolist,
        filter: "all",
      };
      return [newTodolist, ...state];
    }
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.payload.id);
    }
    case "CHANGE-TODOLIST-TITLE": {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl));
    }
    case "CHANGE-TODOLIST-FILTER": {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl));
    }
    default:
      return state;
  }
};

// Action creators
export const setTodolistsAC = (todolists: Todolist[]) => {
  return { type: "SET-TODOLISTS", todolists } as const;
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
    dispatch(setTodolistsAC(res.data));
  });
};

export const addTodolistTC = (args: { title: string }) => (dispatch: Dispatch) => {
  const { title } = args;
  todolistsApi.createTodolist(title).then((res) => {
    dispatch(addTodolistAC(res.data.data.item));
  });
};

export const removeTodolistTC = (args: { id: string }) => (dispatch: Dispatch) => {
  const { id } = args;
  todolistsApi.deleteTodolist(id).then(() => {
    dispatch(removeTodolistAC(id));
  });
};

export const updateTodolistTitleTC = (args: { id: string; title: string }) => (dispatch: Dispatch) => {
  const { id, title } = args;
  todolistsApi.updateTodolist({ id, title }).then((res) => {
    dispatch(changeTodolistTitleAC({ id, title }));
  });
};

// Actions types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>;
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>;
export type setTodolistsActionType = ReturnType<typeof setTodolistsAC>;

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | setTodolistsActionType;

// types
export type FilterValuesType = "all" | "active" | "completed";

export type DomainTodolist = Todolist & {
  filter: FilterValuesType;
};
