import { beforeEach, expect, test } from "vitest"
import { TaskPriority, TaskStatus } from "@/common/enums/enums.ts"
import { createTask, deleteTask, tasksReducer, TasksState } from "../tasks-slice.ts"

let startState: TasksState = {}

const taskDefaultValues = {
  description: "",
  deadline: "",
  addedDate: "",
  startDate: "",
  priority: TaskPriority.Low,
  order: 0,
}

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatus.Completed,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
      {
        id: "3",
        title: "React",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatus.New,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },
      {
        id: "2",
        title: "milk",
        status: TaskStatus.Completed,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatus.New,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },
    ],
  }
})

test("correct task should be deleted", () => {
  const endState = tasksReducer(
    startState,
    deleteTask.fulfilled({ todolistId: "todolistId2", taskId: "2" }, "requestId", {
      todolistId: "todolistId2",
      taskId: "2",
    }),
  )

  expect(endState).toEqual({
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatus.Completed,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
      {
        id: "3",
        title: "React",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatus.New,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatus.New,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },
    ],
  })
})

test("correct task should be created at correct array", () => {
  const newTasks = {
    id: "1",
    title: "juice",
    status: TaskStatus.New,
    todoListId: "todolistId2",
    ...taskDefaultValues,
  }

  const endState = tasksReducer(
    startState,
    createTask.fulfilled({ task: newTasks }, "requestId", {
      todolistId: newTasks.todoListId,
      title: newTasks.title,
    }),
  )

  expect(endState.todolistId1.length).toBe(3)
  expect(endState.todolistId2.length).toBe(4)
  expect(endState.todolistId2[0].id).toBeDefined()
  expect(endState.todolistId2[0].title).toBe("juice")
})

// test.skip("correct task should change its status", () => {
//   const endState = tasksReducer(
//     startState,
//     updateTask.fulfilled({
//       todolistId: "todolistId2",
//       taskId: "2",
//       isDone: false,
//     }),
//   )
//
//   expect(endState.todolistId2[1].isDone).toBe(false)
//   expect(endState.todolistId1[1].isDone).toBe(true)
// })
//
// test.skip("correct task should change its title", () => {
//   const endState = tasksReducer(
//     startState,
//     updateTask.fulfilled({ todolistId: "todolistId2", taskId: "2", title: "coffee" }),
//   )
//
//   expect(endState.todolistId2[1].title).toBe("coffee")
//   expect(endState.todolistId1[1].title).toBe("JS")
// })
//
// test.skip("array should be created for new todolist", () => {
//   const endState = tasksReducer(startState, createTodolist("New todolist"))
//
//   const keys = Object.keys(endState)
//   const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2")
//   if (!newKey) {
//     throw Error("New key should be added")
//   }
//
//   expect(keys.length).toBe(3)
//   expect(endState[newKey]).toEqual([])
// })
//
// test.skip("property with todolistId should be deleted", () => {
//   const endState = tasksReducer(startState, deleteTodolist.fulfilled({ id: "todolistId2" }))
//
//   const keys = Object.keys(endState)
//
//   expect(keys.length).toBe(1)
//   expect(endState["todolistId2"]).not.toBeDefined()
//   // or
//   expect(endState["todolistId2"]).toBeUndefined()
// })
