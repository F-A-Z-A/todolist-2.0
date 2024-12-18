import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { errorAppStatus } from "app/appSelectors";
import { setAppErrorAC } from "app/app-reducer";

export const ErrorSnackbar = () => {
  // const [open, setOpen] = useState(true);
  const dispatch = useAppDispatch();
  const error = useAppSelector(errorAppStatus);

  const handleClose = () => {
    dispatch(setAppErrorAC(null));
  };

  return (
    <Snackbar open={!!error} autoHideDuration={5000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: "100%" }}>
        {error}
      </Alert>
    </Snackbar>
  );
};
