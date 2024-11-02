import { v1 } from "uuid";
import { TasksStateType } from "../App";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from "./tasksReducer";

const todolistID1 = v1();
const todolistID2 = v1();

let initialState: TasksStateType;

beforeEach(() => {
  initialState = {
    [todolistID1]: [
      { id: "011", title: "HTML&CSS", isDone: true },
      { id: "012", title: "JS", isDone: true },
      { id: "013", title: "ReactJS", isDone: false },
    ],
    [todolistID2]: [
      { id: "021", title: "Milk", isDone: true },
      { id: "022", title: "Bread", isDone: false },
    ],
  };
});

test("remove task", () => {
  const endState = tasksReducer(initialState, removeTaskAC(todolistID1, "012"));

  expect(endState[todolistID1].length).toBe(2);
  expect(endState[todolistID1][1].id).toBe("013");
});

test("add task", () => {
  const newTitle = "New Task Title";
  const endState = tasksReducer(initialState, addTaskAC(todolistID1, newTitle));

  expect(endState[todolistID1].length).toBe(4);
  expect(endState[todolistID1][0].title).toBe(newTitle);
});

test("change task status", () => {
  const endState = tasksReducer(initialState, changeTaskStatusAC(todolistID1, "011", false));

  expect(initialState[todolistID1][0].isDone).toBe(true);
  expect(endState[todolistID1][0].isDone).toBe(false);
});

test("change task title", () => {
  const newTitle = "New Task Title";
  const endState = tasksReducer(initialState, changeTaskTitleAC(todolistID1, "011", newTitle));

  expect(initialState[todolistID1][0].title).toBe("HTML&CSS");
  expect(endState[todolistID1][0].title).toBe(newTitle);
});
