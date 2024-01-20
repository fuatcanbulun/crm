import React, { useState } from "react";

import "./App.css";
import Home from "./pages/home";
import Login from "./pages/login";
import { StoreProvider } from "./contexts/StoreContext";
function App() {
  const [authorization, setAuthorization] = useState(false);

  return (
    <StoreProvider>
      <Home />
      {/* {authorization ? <Home /> : <Login setAuthorization={setAuthorization} />} */}
    </StoreProvider>
  );
}

export default App;
