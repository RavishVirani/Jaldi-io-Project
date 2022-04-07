import React, { useState, useMemo, useEffect } from "react";
import { UserContext } from "./routes/UserContext";

import logo from './logo.svg';
import './App.css';
import Routes from './Routes';

function App() {
  const [user, setUser] = useState(localStorage.getItem('user') || "");
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <div className="App">
      <UserContext.Provider value={value}>
        <Routes />
      </UserContext.Provider>
      
    </div>
  );
}

export default App;
