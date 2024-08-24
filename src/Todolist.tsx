import React from "react";
import { Button } from "./Button";

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

type TodolistPropsType = {
  title: string;
  tasks: TaskType[];
  date?: string;
};

export const Todolist = ({ title, tasks, date }: TodolistPropsType) => {
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input />
        <Button title={"+"} />
      </div>
      {tasks.length === 0 ? (
        <p>Тасрк нет</p>
      ) : (
        <ul>
          {tasks.map((task: TaskType) => {
            return (
              <li key={task.id}>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
              </li>
            );
          })}
        </ul>
      )}
      <div>
        <Button title={"All"} />
        <Button title={"Active"} />
        <Button title={"Completed"} />
      </div>
      {/*<div>{date}</div>*/}
    </div>
  );
};
