import React from "react";
import ReactDOM from "react-dom/client";

import App from "./components/App";

import { GlobalStyle } from "style";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <GlobalStyle />
    <App />
  </>
);
