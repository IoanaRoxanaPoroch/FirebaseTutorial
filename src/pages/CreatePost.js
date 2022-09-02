import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { db, auth } from "../firebase-config";

export const CreatePost = ({ isAuth }) => {
  const [post, setPost] = useState({ title: "", text: "" });

  const navigate = useNavigate();

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const postsCollectionRef = collection(db, "posts");

  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title: post.title,
      text: post.text,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });

    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);

  return (
    <div className="create-post">
      <div className="create-post__container">
        <h1>CreatePost Page</h1>

        <div className="create-post__container__input-grup">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Title ... "
            value={post.name}
            onChange={onInputChange}
          />
        </div>

        <div className="create-post__container__input-grup">
          <label htmlFor="text">Post:</label>
          <textarea
            id="text"
            name="text"
            placeholder="Post ... "
            value={post.text}
            onChange={onInputChange}
          />
        </div>

        <button onClick={createPost}>Submit Post</button>
      </div>
    </div>
  );
};
