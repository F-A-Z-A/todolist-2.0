import { v1 } from "uuid";
import { TodolistType } from "../App";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from "./todolists-reducer";

test("correct todolist should be removed", () => {
  let todolistID1 = v1();
  let todolistID2 = v1();

  const startState: TodolistType[] = [
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ];

  const endState: TodolistType[] = todolistsReducer(startState, removeTodolistAC(todolistID1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistID2);
});

test("correct todolist should be added", () => {
  let todolistID1 = v1();
  let todolistID2 = v1();

  const startState: TodolistType[] = [
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ];

  const newTodoTitle = "What to What";

  const endState: TodolistType[] = todolistsReducer(startState, addTodolistAC(newTodoTitle));

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodoTitle);
});

test("correct todolist should change its name", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const startState: TodolistType[] = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];

  const newTitleValue = "What to What";

  const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTitleValue));

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTitleValue);
});

test("correct filter of todolist should be changed", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const startState: TodolistType[] = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];

  const newFilterValue = "completed";

  const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, newFilterValue));

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilterValue);
});
