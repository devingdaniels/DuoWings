import React from "react";
import ReactDOM from "react-dom/client";
import DuoWingsApp from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
// Redux
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
// Redux persist
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./app/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* UPDATE TO HASHROUTER(?) FOR PRODUCTION */}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <DuoWingsApp />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
