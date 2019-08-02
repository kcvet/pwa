import React from "react";
import { toast } from "react-toastify";
import { CheckCircle, Error, Warning, ErrorOutline } from "@material-ui/icons";
import { Grid, Box } from "@material-ui/core";

const CustomMessage = ({ message, variant }) => {
  return (
    <Grid container direction="row" alignItems="center">
      { variant === "success" && <Box mr={2}><CheckCircle /></Box> }
      { variant === "error" && <Box mr={2}><Error /></Box> }
      { variant === "info" && <Box mr={2}><ErrorOutline /></Box> }
      { variant === "warn" && <Box mr={2}><Warning /></Box> }
      <b>{message}</b>
    </Grid>
  );
};

export const notifySuccess = message => {
  toast.success(<CustomMessage message={message} variant="success" />, {
    className: "toast-success",
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
};
export const notifyError = message => {
  toast.error(<CustomMessage message={message} variant="error" />, {
    className: "toast-error",
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
};
export const notifyInfo = message => {
  toast.info(<CustomMessage message={message} variant="info" />, {
    className: "toast-success",
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
};
export const notifyWarn = message => {
  toast.warn(<CustomMessage message={message} variant="warn" />, {
    className: "toast-success",
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
};
