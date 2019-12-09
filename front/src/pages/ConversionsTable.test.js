import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { act } from "react-dom/test-utils";
import expect from 'expect';
import { render, fireEvent } from "@testing-library/react";
import { FETCH_CONVERSIONS_PENDING } from "../actions/actionTypes";
import ConversionsTable from "./ConversionsTable";

const mockStore = configureStore([
  thunk
]);

describe("ConversionsTable", () => {
  let store;
  let container = null;

  beforeEach(() => {
    store = mockStore({
      conversionsState: {
        page: 0,
        perPage: 5,
        total: 10,
        data: []
      }
    });
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });


  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <ConversionsTable />
      </Provider>,
      container
    );
    const expectedPayload = { type: FETCH_CONVERSIONS_PENDING, page: 0, perPage: 5 };
    expect(store.getActions()).toEqual([expectedPayload]);
  });

  it("should fetch conversions on table change", () => {

    act(() => {
      render(
        <Provider store={store}>
          <ConversionsTable />
        </Provider>,
        container
      );
    });

    const button = document.querySelector('[aria-label="next page"]');
    expect(button.children[0].children[0].innerHTML).toBe("keyboard_arrow_right");

    fireEvent.click(button);

    expect(store.getActions()).toEqual([
      { type: FETCH_CONVERSIONS_PENDING, page: 0, perPage: 5 },
      { type: FETCH_CONVERSIONS_PENDING, page: 1, perPage: 5 }
    ]);
  });

});
