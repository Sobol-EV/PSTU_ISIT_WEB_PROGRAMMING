import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

it("Рендер прошёл без сбоев", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
