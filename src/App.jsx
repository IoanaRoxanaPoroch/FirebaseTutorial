import { useState } from "react";
import { signInWithGoogle } from "./firebase-config";

function App() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    profilePic: "",
  });

  const onClickSignIn = async () => {
    const result = await signInWithGoogle();
    setUserData(result);
  };

  return (
    <div>
      <button onClick={onClickSignIn}>Sign In with Google</button>

      <h1>{userData.name}</h1>

      <h1>{userData.email}</h1>

      <img src={userData.profilePic} alt="avatar" />
    </div>
  );
}

export default App;
