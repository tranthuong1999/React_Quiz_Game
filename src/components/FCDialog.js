import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";

export const FCDialog = (props) => {
  const {
    open,
    title,
    content,
    handleClose,
    handleCancel,
    handleSubmit,
    nameBtn,
  } = props;
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle style={{ fontWeight: "bolder" }}>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          {nameBtn}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
