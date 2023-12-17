import React, { useState } from "react";
import '../src/App.css';
import {Login} from "./components/Login";
import {Register} from "./components/Register";
import GroceryListApp from "./components/GroceryListApp";

function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  }

  return (
    <div className="App">
      {isLoggedIn ? (
        <GroceryListApp />
      ) : (
        currentForm === "login" ? (
          <Login onFormSwitch={toggleForm} onLoginSuccess={handleLoginSuccess} />
        ) : (
          <Register onFormSwitch={toggleForm} />
        )
      )}
    </div>
  );
}

export default App;