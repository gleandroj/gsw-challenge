import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

const classes = theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2)
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20
  }
});

class Form extends Component {
  state = {
    code: "",
    message: ""
  };

  componentDidMount() {
    const { value = {} } = this.props;
    const { code = "", message = "" } = value;
    this.setState({
      code,
      message
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { value = {} } = this.props;
    const { code = "", message = "" } = value;
    const prevValue = prevProps.value;

    if (
      prevValue &&
      (code != prevValue.code || message !== prevValue.message)
    ) {
      this.setState({
        ...this.state,
        code,
        message
      });
    }
  }

  setCode = event => {
    this.setState({
      ...this.state,
      code: event.target.value
    });
  };

  setMessage = event => {
    this.setState({
      ...this.state,
      message: event.target.value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const { onSubmit } = this.props;
    if (onSubmit) {
      onSubmit(this.state);
    }
  };

  render() {
    const { classes } = this.props;
    const { code = "", message = "" } = this.state;

    return (
      <form
        onSubmit={this.onSubmit}
        className={classes.form}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="code"
          label="Código"
          variant="filled"
          multiline={true}
          rows={4}
          inputProps={{ maxLength: 255 }}
          value={code}
          onChange={this.setCode}
        />
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            endIcon={<Icon>compare_arrows</Icon>}
          >
            Converter e Salvar
          </Button>
        </div>
        <TextField
          id="message"
          label="Mensagem de texto"
          variant="filled"
          multiline={true}
          rows={4}
          inputProps={{ maxLength: 255 }}
          value={message}
          onChange={this.setMessage}
        />
      </form>
    );
  }
}

export default withStyles(classes)(Form);
