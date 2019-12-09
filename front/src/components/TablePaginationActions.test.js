import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import expect from 'expect';
import { render, fireEvent } from "@testing-library/react";
import TablePaginationActions from "./TablePaginationActions";


describe("TablePaginationActions", () => {
  let container = null;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it("renders without crashing", () => {
    render(<TablePaginationActions />, container);
  });

  it("handle onchange when click next page button", () => {
    const onChange = jest.fn();
    const page = 0;
    const perPage = 5;
    const total = 10;

    act(() => {
      render(<TablePaginationActions page={page} count={total} rowsPerPage={perPage} onChangePage={onChange} />, container);
    });

    const button = document.querySelector('[aria-label="next page"]');
    expect(button.children[0].children[0].innerHTML).toBe("keyboard_arrow_right");
    fireEvent.click(button);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toBe(1);
  });

  it("handle onchange when click prev page button", () => {
    const onChange = jest.fn();
    const page = 1;
    const perPage = 5;
    const total = 10;

    act(() => {
      render(<TablePaginationActions page={page} count={total} rowsPerPage={perPage} onChangePage={onChange} />, container);
    });

    const button = document.querySelector('[aria-label="previous page"]');
    expect(button.children[0].children[0].innerHTML).toBe("keyboard_arrow_left");
    fireEvent.click(button);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toBe(0);
  });

  it("handle onchange when click last page button", () => {
    const onChange = jest.fn();
    const page = 0;
    const perPage = 5;
    const total = 15;

    act(() => {
      render(<TablePaginationActions page={page} count={total} rowsPerPage={perPage} onChangePage={onChange} />, container);
    });

    const button = document.querySelector('[aria-label="last page"]');
    expect(button.children[0].children[0].innerHTML).toBe("last_page");
    fireEvent.click(button);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toBe(2);
  });


  it("handle onchange when click first page button", () => {
    const onChange = jest.fn();
    const page = 2;
    const perPage = 5;
    const total = 15;

    act(() => {
      render(<TablePaginationActions page={page} count={total} rowsPerPage={perPage} onChangePage={onChange} />, container);
    });

    const button = document.querySelector('[aria-label="first page"]');
    expect(button.children[0].children[0].innerHTML).toBe("first_page");
    fireEvent.click(button);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toBe(0);
  });
});
