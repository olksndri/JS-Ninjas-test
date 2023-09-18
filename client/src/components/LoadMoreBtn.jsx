import Button from "@mui/material/Button";

export const LoadMoreBtn = ({ onLoad }) => {
  return (
    <Button variant="contained" onClick={onLoad}>
      Load more
    </Button>
  );
};
