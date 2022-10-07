import { Button } from "@mui/material";

export const FCButton = (props) => {
  const { variant, color, text, type, handleAction } = props;
  return (
    <Button
      variant={variant || "contained"}
      color={color || "primary"}
      type={type}
      onClick={handleAction}
      style={{ marginRight: "20px", marginTop: "60px" }}
    >
      {text}
    </Button>
  );
};
