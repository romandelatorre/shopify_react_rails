import React, { useState, useEffect } from "react";

// Utils
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import { Commerce } from "./components/Commerce";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

// Css
import "./App.css";

function App() {
  const [loggin, setLoggin] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3001/logged_in", { withCredentials: true })
      .then((response) =>
        response.data.logged_in ? handleLogin(response) : handleLogout()
      )
      .catch((error) => console.error(error));
  }, []);

  const handleLogin = (response) => {
    setLoggin(true);
    setUser(response.data);
  };

  const handleLogout = () => {
    setLoggin(false);
    setUser({});
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Commerce userDataSession={user} handleLogout={handleLogout} />
            }
          />
          <Route
            exact
            path="/login"
            element={<Login handleLogin={handleLogin} />}
          />
          <Route
            exact
            path="/signup"
            element={<Register handleLogin={handleLogin} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
