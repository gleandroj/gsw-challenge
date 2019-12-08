import React, { Component } from "react";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Form, TopBar, Loading } from "../components";
import { addConversion } from "../actions";

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

class ConversionForm extends Component {
  render() {
    const { classes, addConversion, pending, error, ...formValue } = this.props;
    return (
      <Paper className={classes.paper}>
        <TopBar title="Conversão" />
        <Form onSubmit={addConversion} error={error} value={formValue} />
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
  bindActionCreators({ addConversion }, dispatch);

export default compose(
  withStyles(classes),
  connect(mapStateToProps, mapDispatchToProps)
)(ConversionForm);
