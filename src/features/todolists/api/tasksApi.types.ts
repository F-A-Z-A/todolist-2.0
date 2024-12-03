import { TaskPriority, TaskStatus } from "common/enums";

export type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: DomainTask[];
};

export type DomainTask = BaseTask & {
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type BaseTask = {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  startDate: string;
  deadline: string;
};
