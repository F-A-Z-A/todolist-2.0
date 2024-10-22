import { SxProps } from "@mui/material";

export const filterButtonsContainerSx: SxProps = {
  display: "flex",
  justifyContent: "space-between",
};

export const listItemContainerSx: SxProps = {
  p: 0,
  justifyContent: "space-between",
};

export const getListItemOpacitySx = (isDone: boolean): SxProps => ({
  opacity: isDone ? 0.5 : 1,
});
