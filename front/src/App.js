import React, { Component } from "react";
import { bindActionCreators, compose } from "redux";
import { convertValues } from "./actions";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Form, TopBar } from "./components";

const classes = theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    position: "relative"
  },
  loadingContainer: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, .9)',
    height: "100%",
    width: "100%"
  }
});

class App extends Component {
  render() {
    const { classes, convertValues, pending, ...formValue } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <div className={classes.content}>
          <Container maxWidth="lg" className={classes.container}>
            <Paper className={classes.paper}>
              <TopBar />
              <Form onSubmit={convertValues} value={formValue} />
              {
                pending ? <div className={classes.loadingContainer}>
                  <CircularProgress />
                  <span>Carregando...</span>
                </div> : []
              }
            </Paper>
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  code: store.convertState.code,
  message: store.convertState.message,
  pending: store.convertState.pending,
  error: store.convertState.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ convertValues }, dispatch);

export default compose(
  withStyles(classes),
  connect(mapStateToProps, mapDispatchToProps)
)(App);
