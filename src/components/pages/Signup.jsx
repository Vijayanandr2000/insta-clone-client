import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css";

const Signup = () => {
  const [hide, setHide] = useState(false);

  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [path, setPath] = useState("");

  useEffect(() => {
    if (mail.length > 0 && password.length > 0 && name.length > 0)
      setHide(false);
    else setHide(true);
  }, [mail, password, name]);

  const submit = (e) => {
    // e.preventDefault();
    // console.log(name, mail, password);

    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        mail
      )
    ) {
      M.toast({ html: "Invalid Email Address", classes: "red" });
      return;
    }
    var data = {
      name: name,
      mail: mail,

      password: password,
    };
    fetch("https://insta-clone-backend-mern.herokuapp.com/signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // alert(data.message);

        if (data.message == "Registered") {
          window.location = "/login";
          M.toast({
            html: data.message + " " + "Successfully",
            classes: "green",
          });
        } else {
          M.toast({ html: data.message, classes: "red" });
        }
      });

    setMail("");
    setPassword("");
    setName("");

    // console.log(message);
  };

  return (
    <div className="login">
      <div className="card login-card ">
        <h2>Sign-Up</h2>
        <input
          type="text"
          placeholder="User_Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="E-mail"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <div class="file-field input-field">
          <div class="btn">
            <span>Upload Profile-Pic</span>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div class="file-path-wrapper">
            <input class="file-path validate" type="text" />
          </div>
        </div> */}
        <button
          disabled={hide}
          onClick={submit}
          className="btn waves-effect waves-light"
        >
          Signup
        </button>
        <h6>
          <Link to="/login">Login</Link>
        </h6>
      </div>
    </div>
  );
};

export default Signup;
