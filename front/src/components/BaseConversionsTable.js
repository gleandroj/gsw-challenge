import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TablePaginationActions from "./TablePaginationActions";
import TableHead from "@material-ui/core/TableHead";

const classes = theme => ({
  root: {
    width: "100%"
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: "auto"
  },
  emptyState: {
    fontWeight: "bold"
  }
});

class BaseConversionsTable extends Component {
  handleChangePage = (event, page) => {
    const { perPage, onChange } = this.props;
    onChange({ perPage, page });
  };

  handleChangeRowsPerPage = event => {
    const { page, onChange } = this.props;
    const perPage = parseInt(event.target.value, 10);
    onChange({ perPage, page });
  };

  render() {
    const { classes, rows = [], page, perPage, total } = this.props;
    const emptyRows = rows.length === 0;

    return (
      <div className={classes.tableWrapper}>
        <Table className={classes.table} aria-label="conversion table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Código</TableCell>
              <TableCell align="center">Mensagem</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row._id}>
                <TableCell align="center">{row.code}</TableCell>
                <TableCell align="center">{row.message}</TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell align="center" colSpan={6}>
                  <span className={classes.emptyState}>
                    Nenhuma conversão realizada.
                  </span>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "Tudo", value: -1 }]}
                colSpan={3}
                count={total}
                rowsPerPage={perPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "Qtd. Itens" },
                  native: true
                }}
                labelRowsPerPage="Qtd. Itens"
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to === -1 ? count : to} de ${count}`
                }
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    );
  }
}

export default withStyles(classes)(BaseConversionsTable);
