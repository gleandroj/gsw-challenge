import React, { Component, forwardRef } from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConversionForm from "./ConversionForm";

const mockStore = configureStore([
  thunk
]);

describe("ConversionForm", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      conversionState: {
        code: "",
        message: "",
        pending: false,
        error: null
      }
    });
  });

  it("renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <ConversionForm />
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

});