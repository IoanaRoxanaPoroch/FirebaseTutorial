import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { signOut } from "firebase/auth";

import { CreatePost } from "./pages/CreatePost";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { auth } from "./firebase-config";

import "./App.css";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };
  return (
    <>
      <Router>
        <nav>
          <Link to="/">Home</Link>

          {!isAuth ? (
            <Link to="/login">Login</Link>
          ) : (
            <>
              <Link to="/create-post">Create Post</Link>

              <button onClick={signUserOut}>Log Out</button>
            </>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<Home isAuth={isAuth} />} />

          <Route path="/create-post" element={<CreatePost isAuth={isAuth} />} />

          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
