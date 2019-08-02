import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  },
  paperTitleBand: {
    width: "100%",
    padding: "30px 20px 5px 20px",
    borderRadius: "0px",
    marginBottom: "50px"
  },
  overlay: {
    position: "fixed",
    display: "none",
    width: "100%",
    height: "100%",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: "2",
    cursor: "pointer"
  },
  spinn: {
    width: '70px !important',
    height: '70px !important'
  }
}));

const Spinner = props => {
  const classes = useStyles();

  return (
    <div id="myNav" className="overlay">
      <div className="overlay-content">
        <CircularProgress
          indeterminate="true"
          className={classnames(classes.spinn)}
        />
      </div>
    </div>
  );
};

export default Spinner;
