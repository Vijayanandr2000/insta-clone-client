import React, { useState, useEffect } from "react";
import M from "materialize-css";
import { useHistory } from "react-router-dom";

const Createpost = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pic, setPic] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (url) {
      const data1 = {
        title: title,
        description: description,
        photo: url,
      };
      fetch("https://insta-clone-backend-mern.herokuapp.com/createpost", {
        method: "POST",
        body: JSON.stringify(data1),
        headers: {
          "content-type": "application/json",

          Authorization: JSON.parse(localStorage.getItem("auth")),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message == "ok") {
            M.toast({ html: "Successfully posted", classes: "green" });
            history.push("/");
          } else {
            M.toast({ html: data.message, classes: "red" });
          }
        });
    }
  }, [url]);
  const post = () => {
    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "Insta-clone");
    data.append("cloud_name", "vijay-cloud");
    fetch("https://api.cloudinary.com/v1_1/vijay-cloud/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
    // setTitle("");
    // setDescription("");
    // setPic("");
  };
  return (
    <div className="card create-card">
      <div className="box">
        <div className="box-head">
          <h3>Create Post</h3>
        </div>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <input
          type="text"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <div class="file-field input-field">
          <div class="btn">
            <span>Upload Picture</span>
            <input type="file" onChange={(e) => setPic(e.target.files[0])} />
          </div>
          <div class="file-path-wrapper">
            <input class="file-path validate" type="text" />
          </div>
        </div>
        <button
          className="btn center waves-effect waves-light #64b5f6 blue darken-1"
          onClick={post}
        >
          Create Post
        </button>
      </div>
    </div>
  );
};
export default Createpost;
