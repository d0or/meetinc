import React from 'react'
import { Router, Link } from "@reach/router";
import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> <Link to="dashboard">Dashboard</Link>
      </nav>
      <Router>
        <Home path="/" />
        <Dashboard path="dashboard" />
      </Router>
    </div>
  );
}

export default App;
