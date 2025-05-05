import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { tasksReducer } from "../model/tasks-reducer.ts"
import { todolistsReducer } from "../model/todolists-reducer.ts"
import { useDispatch, useSelector } from "react-redux"

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

// @ts-ignore
window.store = store
