import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { type TasksActionsType, tasksReducer } from "features/todolists/model/tasks-reducer";
import { type TodolistsActionsType, todolistsReducer } from "features/todolists/model/todolists-reducer";
import { appReducer, type ChangeThemeActionType } from "./app-reducer";
import { thunk, type ThunkAction, type ThunkDispatch } from "redux-thunk";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
});

export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>;

export type AppThunk = ThunkAction<void, RootState, unknown, AppActionsType>;

export type AppActionsType = TodolistsActionsType | TasksActionsType | ChangeThemeActionType;

// @ts-ignore
window.store = store;
