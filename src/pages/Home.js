import { useState, useEffect } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";

import { auth, db } from "../firebase-config";

export const Home = ({ isAuth }) => {
  const [postLists, setPostList] = useState([]);

  const postsCollectionRef = collection(db, "posts");

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, [deletePost, postsCollectionRef]);

  return (
    <div className="home">
      {postLists.map((post) => {
        return (
          <div key={post.id} className="home__post">
            <div className="home__post__header">
              <div className="title">
                <h1> {post.title}</h1>

                <div className="delete-post">
                  {isAuth && post.author.id === auth.currentUser.uid && (
                    <button
                      onClick={() => {
                        deletePost(post.id);
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="home__post__text">{post.text}</div>

            <h3>@{post.author.name}</h3>
          </div>
        );
      })}
    </div>
  );
};
