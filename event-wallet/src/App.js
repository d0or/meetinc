import React from 'react'
import { Router, Link } from "@reach/router";
import Signup from "./pages/SignUp"
import Home from "./pages/Home"

function App() {
  return (
    <div>
      <div className="container">
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">my events</Link>
            <Link className="navbar-item" to="signup">Sign in</Link>
          </div>
        </nav>
      </div>

      <div className="section">
        <div className="container">
          <Router>
            <Home path="/" />
            <Signup path="signup" />
          </Router>
        </div>
      </div >
    </div>
  );
}

export default App;
