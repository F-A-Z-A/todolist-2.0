import { setAppErrorAC, setAppStatusAC } from "app/app-reducer";
import type { Dispatch } from "redux";

export const handleServerNetworkError = (err: { message: string }, dispatch: Dispatch) => {
  dispatch(setAppErrorAC(err.message));
  dispatch(setAppStatusAC("failed"));
};
