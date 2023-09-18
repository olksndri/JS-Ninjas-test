import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export const DeleteBtn = ({ deleteHandler }) => {
  return (
    <IconButton aria-label="delete" color="primary" onClick={deleteHandler}>
      <DeleteIcon />
    </IconButton>
  );
};
