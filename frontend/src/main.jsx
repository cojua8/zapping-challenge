import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import UserProvider from "./contexts/userContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <div className="container">
        <App />
      </div>
    </UserProvider>
  </StrictMode>
);
