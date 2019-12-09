import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConversionsTable from "./ConversionsTable";

const mockStore = configureStore([
  thunk
]);

describe("ConversionsTable", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      conversionsState: {
        page: 0,
        perPage: 5,
        data: []
      }
    });
  });

  it("renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <ConversionsTable />
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

});