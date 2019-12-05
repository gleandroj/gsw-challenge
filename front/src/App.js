import React, { Component } from "react";
import { bindActionCreators, compose } from "redux";
import { convertValues } from "./actions";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
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
    paddingBottom: theme.spacing(4)
  },
  paper: {
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  }
});

class App extends Component {
  render() {
    const { classes, convertValues, ...formValue } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>
          <Container maxWidth="lg" className={classes.container}>
            <Paper className={classes.paper}>
              <TopBar />
              <Form onSubmit={convertValues} value={formValue} />
            </Paper>
          </Container>
        </main>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  code: store.convertState.code,
  message: store.convertState.message
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ convertValues }, dispatch);

export default compose(
  withStyles(classes),
  connect(mapStateToProps, mapDispatchToProps)
)(App);
