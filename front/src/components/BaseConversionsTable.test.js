import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import BaseConversionsTable from "./BaseConversionsTable";
import expect from 'expect';
import { render, fireEvent } from "@testing-library/react";


describe("BaseConversionsTable", () => {
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
    render(<BaseConversionsTable />, container);
  });

  it("handle onchange when click pagination button", () => {
    const onChange = jest.fn();
    const page = 0;
    const perPage = 5;
    const total = 10;

    act(() => {
      render(<BaseConversionsTable page={page} perPage={perPage} total={total} onChange={onChange} />, container);
    });

    const button = document.querySelector('[aria-label="next page"]');
    expect(button.children[0].children[0].innerHTML).toBe("keyboard_arrow_right");

    act(() => {
      fireEvent.click(button);
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toBeCalledWith({ page: 1, perPage });
  });

  it("should show total when selected per page is -1", () => {
    const onChange = jest.fn();
    const page = 0;
    const perPage = -1;
    const total = 10;

    act(() => {
      render(<BaseConversionsTable page={page} perPage={perPage} total={total} onChange={onChange} />, container);
    });

    const elements = document.getElementsByClassName("MuiTypography-root MuiTablePagination-caption MuiTypography-body2 MuiTypography-colorInherit");
    expect(elements).toBeTruthy();
    const p = elements[1];
    expect(p).toBeTruthy();
    expect(p.innerHTML).toEqual(`1-${total} de ${total}`);
  });

  it("handle onchange when change itens per page", () => {
    const onChange = jest.fn();
    const page = 0;
    const perPage = 5;
    const total = 10;

    act(() => {
      render(<BaseConversionsTable page={page} perPage={perPage} total={total} onChange={onChange} />, container);
    });

    const select = document.querySelector('[aria-label="Qtd. Itens"]');
    act(() => {
      fireEvent.change(select, { target: { value: 10 } });
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toBeCalledWith({ page: 0, perPage: 10 });
  });

  it("should render rows", () => {
    const onChange = jest.fn();
    const page = 0;
    const perPage = 5;
    const total = 10;
    const rows = [
      {
        _id: "1",
        code: "8",
        message: "G"
      }
    ];

    act(() => {
      render(<BaseConversionsTable rows={rows} page={page} perPage={perPage} total={total} onChange={onChange} />, container);
    });

    const body = document.getElementsByClassName("MuiTableBody-root")[0];
    expect(body).toBeTruthy();
    const tr = body.children[0];
    expect(tr).toBeTruthy();
    expect(tr.children[0]).toBeTruthy();
    expect(tr.children[0].innerHTML).toEqual(rows[0].code);
    expect(tr.children[1].innerHTML).toEqual(rows[0].message);
  });
});
