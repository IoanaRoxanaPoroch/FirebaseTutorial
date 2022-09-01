import { signInWithGoogle } from "./firebase-config";

function App() {
  return (
    <div>
      <button onClick={signInWithGoogle}>Sign In with Google</button>

      <h1>{localStorage.getItem("name")}</h1>

      <h1>{localStorage.getItem("email")}</h1>

      <img
        src={`${localStorage.getItem("profilePic")}`}
        alt="avatar"
        referrerpolicy="no-referrer"
      />
    </div>
  );
}

export default App;
