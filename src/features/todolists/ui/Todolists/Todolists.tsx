import { Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useAppSelector } from "common/hooks";
import { selectTodolists } from "features/todolists/model/todolistsSelectors";
import { Todolist } from "features/todolists/ui/Todolists/Todolist/Todolist";

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists);

  return (
    <>
      {todolists.map((tl) => {
        return (
          <Grid key={tl.id}>
            <Paper sx={{ p: "0 20px 20px 20px" }}>
              <Todolist key={tl.id} todolist={tl} />
            </Paper>
          </Grid>
        );
      })}
    </>
  );
};
