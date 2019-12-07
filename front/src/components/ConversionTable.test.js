import React from "react";
import ReactDOM from "react-dom";
import ConversionTable from "./ConversionTable";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ConversionTable />, div);
  ReactDOM.unmountComponentAtNode(div);
});
