import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { TrelloProvider } from "./context/TrelloContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <TrelloProvider>
    <App />
  </TrelloProvider>
);
