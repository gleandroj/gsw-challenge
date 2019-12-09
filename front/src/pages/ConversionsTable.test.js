import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConversionsTable from "./ConversionsTable";
import { FETCH_CONVERSIONS_PENDING } from "../actions/actionTypes";

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

    const expectedPayload = { type: FETCH_CONVERSIONS_PENDING, page: 0, perPage: 5 };
    expect(store.getActions()).toEqual([expectedPayload]);

    ReactDOM.unmountComponentAtNode(div);
  });

});