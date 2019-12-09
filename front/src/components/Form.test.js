import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import expect from 'expect';
import { render, fireEvent } from "@testing-library/react";
import Form from './Form';


describe("Form", () => {
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
    render(<Form />, container);
  });

  it("should mask code field correct", () => {
    const value = {
      code: "89_9INVALIDO",
      message: ""
    };

    act(() => {
      render(<Form value={value} />, container);
    });

    const input = document.getElementById('code');
    expect(input).toBeTruthy();
    expect(input.value).toEqual("89_9");
  });

  it("should handle onSubmit when submit form", async () => {
    const onSubmit = jest.fn();
    const value = {
      code: "89",
      message: ""
    };

    act(() => {
      render(<Form value={value} onSubmit={onSubmit} />, container);
    });

    const button = document.querySelector('button[type="submit"]');
    expect(button).toBeTruthy();
    await act(async () => {
      fireEvent.click(button);
    });
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual(value);
  });

});