import React, { Component } from "react";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { TopBar, BaseConversionsTable } from "../components";
import { fetchConversions } from "../actions";

const classes = theme => ({
  paper: {
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    position: "relative",
    flex: 1,
    height: "100%"
  }
});

class ConversionsTable extends Component {
  render() {
    const { classes, pending, error, ...other } = this.props;
    console.log(other);
    return (
      <Paper className={classes.paper}>
        <TopBar title="Histórico" />
        <BaseConversionsTable />
        <Loading pending={pending} />
      </Paper>
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
  bindActionCreators({ fetchConversions }, dispatch);

export default compose(
  withStyles(classes),
  connect(mapStateToProps, mapDispatchToProps)
)(ConversionsTable);
