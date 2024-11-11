import { ChangeEvent } from "react";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import { filterButtonsContainerSx, getListItemSx } from "./Todolist.styles";
import { FilterValuesType, TaskType } from "./app/App";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./app/store";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./model/tasks-reducer";

type PropsType = {
  title: string;
  todolistId: string;
  changeFilter: (filter: FilterValuesType, todolistId: string) => void;
  filter: FilterValuesType;
  removeTodolist: (todolistId: string) => void;
  updateTodolist: (todolistId: string, title: string) => void;
};

export const Todolist = (props: PropsType) => {
  const { title, filter, changeFilter, todolistId, removeTodolist, updateTodolist } = props;

  const tasks = useSelector<RootState, TaskType[]>((state) => state.tasks[todolistId]);

  const dispatch = useDispatch();

  const getTasks = () => {
    let filteredTasks = tasks;
    if (filter === "active") filteredTasks = tasks.filter((task) => !task.isDone);
    if (filter === "completed") filteredTasks = tasks.filter((task) => task.isDone);
    return filteredTasks;
  };

  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    changeFilter(filter, todolistId);
  };

  const removeTodolistHandler = () => {
    removeTodolist(todolistId);
  };

  const addTaskCallback = (title: string) => {
    dispatch(addTaskAC({ todolistId, title }));
  };

  const updateTodolistHandler = (title: string) => {
    updateTodolist(todolistId, title);
  };

  return (
    <div>
      <div className={"todolist-title-container"}>
        <h3>
          <EditableSpan value={title} onChange={updateTodolistHandler} />
        </h3>
        <IconButton onClick={removeTodolistHandler}>
          <DeleteIcon />
        </IconButton>
      </div>
      <AddItemForm addItem={addTaskCallback} />
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {getTasks().map((task) => {
            const removeTaskHandler = () => {
              dispatch(removeTaskAC({ todolistId, taskId: task.id }));
            };

            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              const newStatusValue = e.currentTarget.checked;
              dispatch(changeTaskStatusAC({ todolistId, taskId: task.id, isDone: newStatusValue }));
            };

            const changeTaskTitleHandler = (title: string) => {
              dispatch(changeTaskTitleAC({ todolistId, taskId: task.id, title }));
            };
            return (
              <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                <div>
                  <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
                  <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
                </div>
                <IconButton onClick={removeTaskHandler}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            );
          })}
        </List>
      )}
      <Box sx={filterButtonsContainerSx}>
        <Button
          variant={filter === "all" ? "outlined" : "text"}
          color={"inherit"}
          onClick={() => changeFilterTasksHandler("all")}
        >
          All
        </Button>
        <Button
          variant={filter === "active" ? "outlined" : "text"}
          color={"primary"}
          onClick={() => changeFilterTasksHandler("active")}
        >
          Active
        </Button>
        <Button
          variant={filter === "completed" ? "outlined" : "text"}
          color={"secondary"}
          onClick={() => changeFilterTasksHandler("completed")}
        >
          Completed
        </Button>
      </Box>
    </div>
  );
};
