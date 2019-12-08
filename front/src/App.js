import React, { Component } from "react";
import { bindActionCreators, compose } from "redux";
import { addConversion } from "./actions";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Table from "./components/ConversionTable";
import Grid from "@material-ui/core/Grid";

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
    display: "flex",
    flex: 1,
    flexWrap: "wrap"
  },
  paper: {
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    position: "relative",
    flex: 1,
    height: "100%"
  },
  grid: {
    [theme.breakpoints.down("md")]: {
      marginBottom: 30
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: 15,
      marginRight: 15
    }
  },
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

const rows = [
  // {
  //   code: "2",
  //   message: "A",
  //   _id: "id"
  // }
];

class App extends Component {
  render() {
    const { classes, addConversion, pending, error, ...formValue } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <div className={classes.content}>
          <Container maxWidth="lg" className={classes.container}>
            <Grid className={classes.grid} item xs={12} sm={12} md={4}>
              <Paper className={classes.paper}>
                <TopBar title="Conversão" />
                <Form
                  onSubmit={addConversion}
                  error={error}
                  value={formValue}
                />
                {pending ? (
                  <div className={classes.loadingContainer}>
                    <CircularProgress />
                    <span>Carregando...</span>
                  </div>
                ) : (
                  []
                )}
              </Paper>
            </Grid>
            <Grid className={classes.grid} item xs={12} sm={12} md={7}>
              <Paper className={classes.paper}>
                <TopBar title="Histórico" />
                <Table />
              </Paper>
            </Grid>
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  code: store.conversionState.code,
  message: store.conversionState.message,
  pending: store.conversionState.pending,
  error: store.conversionState.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addConversion }, dispatch);

export default compose(
  withStyles(classes),
  connect(mapStateToProps, mapDispatchToProps)
)(App);
