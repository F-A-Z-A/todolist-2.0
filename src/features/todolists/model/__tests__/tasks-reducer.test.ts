import { addTaskAC, removeTaskAC, tasksReducer, TasksStateType, updateTaskAC } from "../tasks-reducer";
import { addTodolistAC, removeTodolistAC } from "../todolists-reducer";

let startState: TasksStateType;

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: 2,
        todoListId: "",
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        startDate: "",
        priority: 0,
      },
      {
        id: "2",
        title: "JS",
        status: 0,
        todoListId: "",
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        startDate: "",
        priority: 0,
      },
      {
        id: "3",
        title: "React",
        status: 2,
        todoListId: "",
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        startDate: "",
        priority: 0,
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: 0,
        todoListId: "",
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        startDate: "",
        priority: 0,
      },
      {
        id: "2",
        title: "milk",
        status: 2,
        todoListId: "",
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        startDate: "",
        priority: 0,
      },
      {
        id: "3",
        title: "tea",
        status: 0,
        todoListId: "",
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        startDate: "",
        priority: 0,
      },
    ],
  };
});

test("correct task should be deleted from correct array", () => {
  const endState = tasksReducer(
    startState,
    removeTaskAC({
      taskId: "2",
      todolistId: "todolistId2",
    }),
  );

  expect(endState).toEqual({
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: 2,
        todoListId: "",
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        startDate: "",
        priority: 0,
      },
      {
        id: "2",
        title: "JS",
        status: 0,
        todoListId: "",
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        startDate: "",
        priority: 0,
      },
      {
        id: "3",
        title: "React",
        status: 2,
        todoListId: "",
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        startDate: "",
        priority: 0,
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: 0,
        todoListId: "",
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        startDate: "",
        priority: 0,
      },
      {
        id: "3",
        title: "tea",
        status: 0,
        todoListId: "",
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        startDate: "",
        priority: 0,
      },
    ],
  });
});

test("correct task should be added to correct array", () => {
  const endState = tasksReducer(
    startState,
    addTaskAC({
      task: {
        id: "4",
        title: "juce",
        status: 0,
        todoListId: "todolistId2",
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        startDate: "",
        priority: 0,
      },
    }),
  );

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("juce");
});

test("status of specified task should be changed", () => {
  const endState = tasksReducer(
    startState,
    updateTaskAC({
      task: {
        id: "2",
        title: "milk",
        status: 0,
        todoListId: "todolistId2",
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        startDate: "",
        priority: 0,
      },
    }),
  );

  expect(startState["todolistId2"][1].status).toBe(2);
  expect(endState["todolistId2"][1].status).toBe(0);
});

test("title of specified task should be changed", () => {
  const endState = tasksReducer(
    startState,
    updateTaskAC({
      task: {
        id: "2",
        title: "GRRR",
        status: 0,
        todoListId: "todolistId2",
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        startDate: "",
        priority: 0,
      },
    }),
  );

  expect(startState["todolistId2"][1].title).toBe("milk");
  expect(endState["todolistId2"][1].title).toBe("GRRR");
});

test("new array should be added when new todolist is added", () => {
  const endState = tasksReducer(
    startState,
    addTodolistAC({
      id: "todolistId3",
      title: "new todolist",
      addedDate: "",
      order: 0,
    }),
  );

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2");
  if (!newKey) {
    throw Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test("property with todolistId should be deleted", () => {
  const endState = tasksReducer(startState, removeTodolistAC("todolistId2"));

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
  // or
  expect(endState["todolistId2"]).toBeUndefined();
});
