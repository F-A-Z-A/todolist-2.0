import { FilterType, TaskType } from "./App";
import { Button } from "./Button";
import { ChangeEvent, useState, KeyboardEvent } from "react";

type PropsType = {
  title: string;
  tasks: TaskType[];
  removeTask: (id: string) => void;
  changeFilter: (filter: FilterType) => void;
  addTask: (title: string) => void;
};

export const Todolist = ({ title, tasks, removeTask, changeFilter, addTask }: PropsType) => {
  const [taskTitle, setTaskTitle] = useState("");
  const addTaskHandler = () => {
    addTask(taskTitle);
    setTaskTitle("");
  };
  const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
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
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input value={taskTitle} onChange={changeTaskTitleHandler} onKeyUp={addTaskOnKeyUpHandler} />
        <Button title={"+"} onClick={addTaskHandler} />
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            const removeTaskHandler = () => {
              removeTask(task.id);
            };
            return (
              <li key={task.id}>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
                <Button title={"x"} onClick={removeTaskHandler} />
              </li>
            );
          })}
        </ul>
      )}
      <div>
        <Button title={"All"} onClick={() => changeFilterTasksHandler("all")} />
        <Button title={"Active"} onClick={() => changeFilterTasksHandler("active")} />
        <Button title={"Completed"} onClick={() => changeFilterTasksHandler("completed")} />
      </div>
    </div>
  );
};
