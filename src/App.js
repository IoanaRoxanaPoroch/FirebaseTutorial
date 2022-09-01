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
import { useId } from "react";

function App() {
  const id = useId();
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const [newUser, setNewUserData] = useState({
    name: "",
    age: "",
  });

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  const createUser = async () => {
    await addDoc(usersCollectionRef, {
      name: newUser.name,
      age: Number(newUser.age),
    });
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

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData({
      ...newUser,
      [name]: value,
    });
  };
  return (
    <div>
      <label for={id}>dwadwadaw</label>
      <input
        id={id}
        type="text"
        placeholder="Name..."
        value={newUser.name}
        name="name"
        tabIndex={1}
        onChange={onInputChange}
      />
      <input
        type="number"
        value={newUser.age}
        name="age"
        tabIndex={3}
        placeholder="Age..."
        onChange={onInputChange}
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
