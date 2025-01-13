import { BaseResponse } from "common/types"
import { Todolist } from "./todolistsApi.types"
import type { DomainTodolist } from "features/todolists/model/todolistsSlice"
import { baseApi } from "app/baseApi"

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTodolists: build.query<DomainTodolist[], void>({
      query: () => "todo-lists",
      transformResponse(todolists: Todolist[]): DomainTodolist[] {
        return todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
      },
      providesTags: ["Todolist"],
    }),
    addTodolist: build.mutation<BaseResponse<{ item: Todolist }>, string>({
      query: (title) => ({
        method: "POST",
        url: "todo-lists",
        body: { title },
      }),
      invalidatesTags: ["Todolist"],
    }),
    removeTodolist: build.mutation<BaseResponse, string>({
      query: (id) => ({
        method: "DELETE",
        url: `todo-lists/${id}`,
      }),
      invalidatesTags: ["Todolist"],
    }),
    updateTodolist: build.mutation<BaseResponse, { id: string; title: string }>({
      query: ({ id, title }) => ({
        method: "PUT",
        url: `todo-lists/${id}`,
        body: { title },
      }),
      invalidatesTags: ["Todolist"],
    }),
  }),
})

export const { useGetTodolistsQuery, useAddTodolistMutation, useRemoveTodolistMutation, useUpdateTodolistMutation } =
  todolistsApi
