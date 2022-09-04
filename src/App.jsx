import { useEffect, useState } from "react";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

import { storage } from "./firebase-config";

import "./App.css";

function App() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);

  const imageListRef = ref(storage, "images/");

  const uploadImage = () => {
    if (imageUpload == null) return;

    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);

    const upload = async () => {
      const response = await uploadBytes(imageRef, imageUpload);

      const res = await getDownloadURL(response.ref);

      setImageList((prev) => [...prev, res]);
    };

    upload();
  };

  const onInputChange = (e) => {
    setImageUpload(e.target.files[0]);
  };

  useEffect(() => {
    listAll(imageListRef).then((response) =>
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      })
    );
  }, []);

  return (
    <div className="App">
      <input type="file" onChange={onInputChange} />

      <button onClick={uploadImage}>Upload Image</button>

      {imageList.map((url, index) => {
        return <img src={url} alt="pic" key={index} />;
      })}
    </div>
  );
}

export default App;
