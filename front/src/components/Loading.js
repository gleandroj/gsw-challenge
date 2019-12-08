import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const classes = theme => ({
  loadingContainer: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    zIndex: 10,
    backgroundColor: "rgba(255, 255, 255, .9)",
    height: "100%",
    width: "100%"
  }
});

const Loading = ({ classes, pending }) => {
  if (!pending) {
    return [];
  }

  return (
    <div className={classes.loadingContainer}>
      <CircularProgress />
      <span>Carregando...</span>
    </div>
  );
};

export default withStyles(classes)(Loading);
