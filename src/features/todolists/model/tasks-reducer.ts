import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer";
import type { Dispatch } from "redux";
import { tasksApi } from "features/todolists/api/tasksApi";
import type { DomainTask, UpdateTaskModel } from "features/todolists/api/tasksApi.types";
import type { RootState } from "app/store";

export type TasksStateType = {
  [key: string]: DomainTask[];
};

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case "SET-TASKS": {
      return { ...state, [action.payload.todolistId]: action.payload.tasks };
    }
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.taskId),
      };
    }
    case "ADD-TASK": {
      const task = action.payload.task;
      return { ...state, [task.todoListId]: [task, ...state[task.todoListId]] };
    }
    case "UPDATE-TASK": {
      const task = action.payload.task;
      return {
        ...state,
        [task.todoListId]: state[task.todoListId].map((t) => (t.id === task.id ? task : t)),
      };
    }
    case "ADD-TODOLIST":
      return { ...state, [action.payload.todolist.id]: [] };
    case "REMOVE-TODOLIST": {
      let copyState = { ...state };
      delete copyState[action.payload.id];
      return copyState;
    }
    default:
      return state;
  }
};

// Action creators
export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
  return { type: "SET-TASKS", payload } as const;
};

export const removeTaskAC = (payload: { todolistId: string; taskId: string }) => {
  return {
    type: "REMOVE-TASK",
    payload,
  } as const;
};

export const addTaskAC = (payload: { task: DomainTask }) => {
  return {
    type: "ADD-TASK",
    payload,
  } as const;
};

export const updateTaskAC = (payload: { task: DomainTask }) => {
  return {
    type: "UPDATE-TASK",
    payload,
  } as const;
};

// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  tasksApi.getTasks(todolistId).then((res) => {
    const tasks = res.data.items;
    dispatch(setTasksAC({ todolistId, tasks }));
  });
};

export const removeTaskTC = (args: { todolistId: string; taskId: string }) => (dispatch: Dispatch) => {
  tasksApi.deleteTask(args).then(() => {
    dispatch(removeTaskAC(args));
  });
};

export const addTaskTC = (args: { todolistId: string; title: string }) => (dispatch: Dispatch) => {
  tasksApi.createTask(args).then((res) => {
    dispatch(addTaskAC({ task: res.data.data.item }));
  });
};

export const updateTaskTC =
  (args: { todolistId: string; taskId: string; updateParams: Partial<UpdateTaskModel> }) =>
  (dispatch: Dispatch, getState: () => RootState) => {
    const { todolistId, taskId, updateParams } = args;
    const tasks = getState().tasks[todolistId];
    const task = tasks.find((t) => t.id === taskId);

    if (!task) throw new Error("task not found");
    const model: UpdateTaskModel = {
      status: task.status,
      title: task.title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      ...updateParams,
    };

    tasksApi.updateTask({ todolistId, taskId, model }).then((res) => {
      dispatch(updateTaskAC({ task: res.data.data.item }));
    });
  };

// Actions types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export type ChangeTaskTitleActionType = ReturnType<typeof updateTaskAC>;
export type SetTasksActionType = ReturnType<typeof setTasksAC>;

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTasksActionType;
