import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "./firebase-config";

function App() {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);

    await deleteDoc(userDoc);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Name..."
        onChange={(e) => {
          setNewName(e.target.value);
        }}
      />

      <input
        type="number"
        placeholder="Age..."
        onChange={(e) => {
          setNewAge(e.target.value);
        }}
      />

      <button onClick={createUser}>Create User</button>

      {users.map((user, index) => {
        return (
          <div key={index}>
            <h1>Name:{user.name}</h1>

            <h1>Age:{user.age}</h1>

            <button
              onClick={() => {
                updateUser(user.id, user.age);
              }}
            >
              Increase age
            </button>

            <button
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              Delete User
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
