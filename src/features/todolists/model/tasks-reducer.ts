import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer";
import type { Dispatch } from "redux";
import type { RootState } from "app/store";
import { tasksApi } from "features/todolists/api/tasksApi";
import { type DomainTask, UpdateTaskModel } from "features/todolists/api/tasksApi.types";

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case "SET-TASK":
      const { todolistId, tasks } = action.payload;
      return { ...state, [todolistId]: tasks };

    case "REMOVE-TASK": {
      const { todolistId, taskId } = action.payload;
      return {
        ...state,
        [todolistId]: state[todolistId].filter((t) => t.id !== taskId),
      };
    }

    case "ADD-TASK": {
      const { task } = action.payload;
      return { ...state, [task.todoListId]: [task, ...state[task.todoListId]] };
    }

    case "UPDATE_TASK": {
      const { task } = action.payload;
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
  return { type: "SET-TASK", payload } as const;
};

export const removeTaskAC = (payload: { taskId: string; todolistId: string }) => {
  return { type: "REMOVE-TASK", payload } as const;
};

export const addTaskAC = (payload: { task: DomainTask }) => {
  return { type: "ADD-TASK", payload } as const;
};

export const updateTaskAC = (payload: { task: DomainTask }) => {
  return { type: "UPDATE_TASK", payload } as const;
};

// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch, getState: () => RootState) => {
  tasksApi.getTasks(todolistId).then((res) => {
    dispatch(setTasksAC({ todolistId, tasks: res.data.items }));
  });
};

export const removeTaskTC = (arg: { todolistId: string; taskId: string }) => (dispatch: Dispatch) => {
  tasksApi.deleteTask(arg).then(() => {
    dispatch(removeTaskAC(arg));
  });
};

export const addTaskTC = (arg: { todolistId: string; title: string }) => (dispatch: Dispatch) => {
  tasksApi.createTask(arg).then((res) => {
    dispatch(addTaskAC({ task: res.data.data.item }));
  });
};

export const updateTaskTC = (arg: { task: DomainTask }) => (dispatch: Dispatch) => {
  const { task } = arg;
  const model: UpdateTaskModel = {
    description: task.description,
    title: task.title,
    deadline: task.deadline,
    priority: task.priority,
    status: task.status,
    startDate: task.startDate,
  };
  tasksApi.updateTask({ todolistId: task.todoListId, taskId: task.id, model }).then((res) => {
    dispatch(updateTaskAC({ task: res.data.data.item }));
  });
};

// Actions types
export type SetTaskActionType = ReturnType<typeof setTasksAC>;
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>;

type ActionsType =
  | SetTaskActionType
  | RemoveTaskActionType
  | AddTaskActionType
  | UpdateTaskActionType
  | AddTodolistActionType
  | RemoveTodolistActionType;

// types
export type TasksStateType = {
  [key: string]: DomainTask[];
};
