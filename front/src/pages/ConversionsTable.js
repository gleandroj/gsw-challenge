import React, { Component } from "react";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { TopBar, BaseConversionsTable, Loading } from "../components";
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
  componentDidMount() {
    const { fetchConversions, page, perPage } = this.props;
    fetchConversions({ page, perPage });
  }

  onTableChange = ({ page, perPage }) => {
    const { fetchConversions } = this.props;
    fetchConversions({ page, perPage });
  };

  render() {
    const { classes, pending, error, rows, page, perPage, total } = this.props;
    return (
      <Paper className={classes.paper}>
        <TopBar title="Histórico" />
        <BaseConversionsTable
          rows={rows}
          page={page}
          perPage={perPage}
          total={total}
          onChange={this.onTableChange}
        />
        <Loading pending={pending} />
      </Paper>
    );
  }
}

const mapStateToProps = store => ({
  rows: store.conversionsState.data,
  total: store.conversionsState.total,
  page: store.conversionsState.page,
  perPage: store.conversionsState.perPage,
  pending: store.conversionsState.pending,
  error: store.conversionsState.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchConversions }, dispatch);

export default compose(
  withStyles(classes),
  connect(mapStateToProps, mapDispatchToProps)
)(ConversionsTable);
