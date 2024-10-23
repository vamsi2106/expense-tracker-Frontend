// src/index.tsx
import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot for React 18
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store"; // Adjust the import path as needed
import App from "./App";

// Get the root DOM element
const container = document.getElementById("root");


// Ensure the container exists before calling createRoot
if (container) {
  const root = createRoot(container); // Use createRoot instead of ReactDOM.render

  root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}
