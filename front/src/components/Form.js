import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { Formik } from "formik";
import * as Yup from "yup"
import MaskedInput from 'react-text-mask';

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

const useStyle = makeStyles(classes);

const validationSchema = Yup.object({
  code: Yup.string(),
  message: Yup.string().when('code', {
    is: code => !code || code.length === 0,
    then: Yup.string()
      .required('Digite a mensagem ou o código.')
      .typeError('Digite a mensagem ou o código.'),
    otherwise: Yup.string()
  })
});

const mask = (input) => {
  const digitReg = /[2-9]|[0]/;
  const underReg = /\_/;

  return input.split('').map((char, index) => {
    if (digitReg.test(char)) {
      return digitReg;
    } else if (underReg.test(char)) {
      const lc = input.charAt(index - 1);
      return underReg.test(lc) ? null : underReg;
    }
  });
};

const TextMaskCustom = ({ inputRef, ...other }) => {
  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={mask}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

const MaterialForm = (props) => {

  const {
    values: { code, message },
    errors,
    touched,
    handleSubmit,
    handleChange,
    isValid,
    setFieldTouched,
    error
  } = props;

  const classes = useStyle();

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={classes.form}
      noValidate
      autoComplete="off"
    >
      {/* <TextField
        id="code"
        label="Código"
        variant="filled"
        inputProps={{ style: { textTransform: 'uppercase' } }}
        helperText={touched.code ? errors.code : ""}
        error={!isValid || !!error}
        value={code}
        onChange={change.bind(null, "code")}
        fullWidth
        multiline={true}
        rows={4}
      /> */}

      <TextField
        id="code"
        label="Código"
        variant="filled"
        inputProps={{ style: { textTransform: 'uppercase' } }}
        helperText={touched.code ? errors.code : ""}
        error={!isValid || !!error}
        value={code}
        onChange={change.bind(null, "code")}
        fullWidth
        multiline={true}
        rows={4}
        InputProps={{
          inputComponent: TextMaskCustom,
        }}
      />

      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!isValid}
          endIcon={<Icon>compare_arrows</Icon>}
        >
          Converter e Salvar
      </Button>
      </div>
      <TextField
        id="message"
        label="Mensagem de texto"
        variant="filled"
        helperText={touched.message ? errors.message : (error ? error : "")}
        error={!isValid || !!error}
        value={message}
        onChange={change.bind(null, "message")}
        fullWidth
        multiline={true}
        rows={4}
        inputProps={{ style: { textTransform: 'uppercase' }, ...{ maxLength: 255 } }}
      />
    </form>
  );
}

class Form extends Component {
  render() {
    const { value = {}, onSubmit, error } = this.props;
    return (
      <Formik
        enableReinitialize={true}
        initialValues={value}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {props => <MaterialForm {...props} error={error} />}
      </Formik>
    );
  }
}

export default Form;
