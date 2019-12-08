import React from "react";
import ReactDOM from "react-dom";
import BaseConversionsTable from "./BaseConversionsTable";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BaseConversionsTable />, div);
  ReactDOM.unmountComponentAtNode(div);
});
