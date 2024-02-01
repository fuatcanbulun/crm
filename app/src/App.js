import React, { useState, useEffect } from "react";

import "./App.css";
import Home from "./pages/home";
import Login from "./pages/login";
import { Provider } from "react-redux";
import store from "./redux/app/store";
import { checkToken } from "./services/token";

function App() {
  const [authorization, setAuthorization] = useState(null);

  useEffect(() => {
    tryToken();
  }, []);

  const tryToken = async () => {
    const isTokenValid = await checkToken();
    if (isTokenValid === true) {
      setAuthorization(true);
    } else {
      setAuthorization(false);
    }
  };

  return (
    <Provider store={store}>
      {authorization === true && <Home />}
      {authorization === false && <Login setAuthorization={setAuthorization} />}
    </Provider>
  );
}

export default App;
