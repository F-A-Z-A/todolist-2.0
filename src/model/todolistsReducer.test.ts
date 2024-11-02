import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from "./todolistsReducer";

const todolistID1 = v1();
const todolistID2 = v1();

let initialState: TodolistType[];

beforeEach(() => {
  initialState = [
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ];
});

test("remove todolist", () => {
  const endState = todolistsReducer(initialState, removeTodolistAC(todolistID1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistID2);
});

test("add todolist", () => {
  const todolistId = v1();
  const newTitle = "New Todo Title";
  const endState = todolistsReducer(initialState, addTodolistAC(todolistId, newTitle));

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTitle);
});

test("change todolist filter", () => {
  const newFilter: FilterValuesType = "completed";
  const endState = todolistsReducer(initialState, changeTodolistFilterAC(todolistID1, newFilter));

  expect(endState[0].filter).toBe(newFilter);
});

test("change todolist title", () => {
  const newTitle = "New Todo Title";
  const endState = todolistsReducer(initialState, changeTodolistTitleAC(todolistID1, newTitle));

  expect(endState[0].title).toBe(newTitle);
});
