import { FilterType, TaskType } from "./App";
import { Button } from "./Button";
import { ChangeEvent, useState, KeyboardEvent } from "react";

type PropsType = {
  title: string;
  tasks: TaskType[];
  removeTask: (id: string) => void;
  changeFilter: (filter: FilterType) => void;
  addTask: (title: string) => void;
  changeTaskStatus: (taskId: string, status: boolean) => void;
  filter: FilterType;
};

export const Todolist = (props: PropsType) => {
  const { title, tasks, removeTask, changeFilter, addTask, changeTaskStatus, filter } = props;
  const [taskTitle, setTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const addTaskHandler = () => {
    const title = taskTitle.trim();
    if (title) {
      addTask(title);
      setTaskTitle("");
    } else {
      setError("Title is required");
    }
  };
  const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) setError(null);
    setTaskTitle(e.currentTarget.value);
  };
  const addTaskOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTaskHandler();
    }
  };
  const changeFilterTasksHandler = (filter: FilterType) => {
    changeFilter(filter);
  };
  const changeTaskStatusHandler = (taskId: string, taskStatus: boolean) => {
    changeTaskStatus(taskId, taskStatus);
  };
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          className={error ? "error" : undefined}
          value={taskTitle}
          onChange={changeTaskTitleHandler}
          onKeyUp={addTaskOnKeyUpHandler}
        />
        <Button title={"+"} onClick={addTaskHandler} />
        {error && <div className={"error-message"}>{error}</div>}
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map((t) => {
            const removeTaskHandler = () => {
              removeTask(t.id);
            };
            return (
              <li key={t.id}>
                <input
                  type="checkbox"
                  checked={t.isDone}
                  onChange={(e) => changeTaskStatusHandler(t.id, e.currentTarget.checked)}
                />
                <span className={t.isDone ? "is-done" : undefined}>{t.title}</span>
                <Button title={"x"} onClick={removeTaskHandler} />
              </li>
            );
          })}
        </ul>
      )}
      <div>
        <Button
          className={filter === "all" ? "active-filter" : undefined}
          title={"All"}
          onClick={() => changeFilterTasksHandler("all")}
        />
        <Button
          className={filter === "active" ? "active-filter" : undefined}
          title={"Active"}
          onClick={() => changeFilterTasksHandler("active")}
        />
        <Button
          className={filter === "completed" ? "active-filter" : undefined}
          title={"Completed"}
          onClick={() => changeFilterTasksHandler("completed")}
        />
      </div>
    </div>
  );
};
