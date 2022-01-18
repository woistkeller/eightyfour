import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

//redux stuff
import { store } from "./app/store";
import { persistor } from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { createTheme, ThemeProvider } from "@mui/material/styles";

var theme = createTheme({
  palette: {
    primary: {
      main: "#141414",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
