import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";

export default function ConfirmationModal({
  open,
  setOpen,
  handleConfirm,
  data,
}) {
  const handleClose = (value) => {
    handleConfirm(value, data);
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography variant="p" color={"red"}>
            Are you sure want to delete?
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="secondary"
          onClick={() => handleClose(true)}
          sx={{
            padding: "5px 10px",
            marginRight: 1,
            fontSize: "12px",
            bgcolor: "rgb(177, 73, 73)",
            color: "white",
            "&:hover": {
              bgcolor: "rgb(177, 73, 73)",
              color: "white",
            },
          }}
          autoFocus
        >
          Confirm
        </Button>
        <Button
          onClick={() => handleClose(false)}
          variant="secondary"
          sx={{
            padding: "5px 10px",
            marginRight: 1,
            fontSize: "12px",
            whiteSpace: "nowrap",
            bgcolor: "rgb(70, 66, 85)",
            color: "white",
            "&:hover": {
              bgcolor: "rgb(70, 66, 85)",
              color: "white",
            },
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
