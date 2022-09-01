import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "./firebase-config";

function App() {
  const [authUser, setAuthUser] = useState({
    registerEmail: "",
    registerPassword: "",
    loginEmail: "",
    loginPassword: "",
  });

  const [user, setUser] = useState({});

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        authUser.registerEmail,
        authUser.registerPassword
      );
      console.log("user", user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        authUser.loginEmail,
        authUser.loginPassword
      );
      console.log("user", user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setAuthUser({ ...authUser, [name]: value });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <div>
      <div>
        <h3>Register User</h3>

        <input
          name="registerEmail"
          type="text"
          placeholder="Email..."
          value={authUser.registerEmail}
          onChange={onInputChange}
        />

        <input
          name="registerPassword"
          type="text"
          value={authUser.registerPassword}
          placeholder="Password ..."
          onChange={onInputChange}
        />

        <button onClick={register}>Create User</button>
      </div>

      <div>
        <h3>Login</h3>

        <input
          name="loginEmail"
          type="text"
          value={authUser.loginEmail}
          placeholder="Email..."
          onChange={onInputChange}
        />

        <input
          name="loginPassword"
          type="text"
          value={authUser.loginPassword}
          placeholder="Password ..."
          onChange={onInputChange}
        />

        <button onClick={login}>Login</button>
      </div>

      <h4>User Logged In: {user?.email}</h4>

      <button onClick={logout}>Sign Out</button>
    </div>
  );
}

export default App;
