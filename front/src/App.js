import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import ConversionForm from "./pages/ConversionForm";
import ConversionsTable from "./pages/ConversionsTable";

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
  grid: {
    [theme.breakpoints.down("md")]: {
      marginBottom: 30
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: 15,
      marginRight: 15
    }
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <div className={classes.content}>
          <Container maxWidth="lg" className={classes.container}>
            <Grid className={classes.grid} item xs={12} sm={12} md={4}>
              <ConversionForm />
            </Grid>
            <Grid className={classes.grid} item xs={12} sm={12} md={7}>
              <ConversionsTable />
            </Grid>
          </Container>
        </div>
      </div>
    );
  }
}

export default withStyles(classes)(App);
