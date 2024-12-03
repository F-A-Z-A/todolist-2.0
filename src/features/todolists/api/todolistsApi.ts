import { instance } from "common/instance";
import type { Todolist } from "./todolistsApi.types";
import type { BaseResponse } from "common/types";

export const todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>("todo-lists");
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>("todo-lists", { title });
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse<{}>>(`todo-lists/${id}`);
  },
  updateTodolist(payload: { id: string; title: string }) {
    const { id, title } = payload;
    return instance.put<BaseResponse<{}>>(`todo-lists/${id}`, { title });
  },
};
