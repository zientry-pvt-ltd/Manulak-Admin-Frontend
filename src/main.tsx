import "./index.css";

import ReactDOM from "react-dom/client";

import { App } from "@/app/index";
import { AppProvider } from "@/app/provider";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  // <React.StrictMode>
  <AppProvider>
    <App />
  </AppProvider>,
  // </React.StrictMode>,
);
