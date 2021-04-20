import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import M from "materialize-css";

const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const [hide, setHide] = useState(false);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (mail.length > 0 && password.length > 0) setHide(false);
    else setHide(true);
  }, [mail, password]);

  const submit = (e) => {
    e.preventDefault();
    var data = {
      mail: mail,
      password: password,
    };
    fetch("https://insta-clone-backend-mern.herokuapp.com/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message == "allow") {
          //   console.log(data.userToken);
          localStorage.setItem("auth", JSON.stringify(data.userToken));
          localStorage.setItem("user", JSON.stringify(data.user));

          dispatch({ type: "USER", payload: data.user });

          window.location = "/profile";
        } else {
          //   alert(data.message);
          M.toast({ html: data.message, classes: "red" });
        }
      });
    setMail("");
    setPassword("");

    // console.log(message);
  };
  return (
    <div className="login">
      <div className="card login-card ">
        <h2>Instagram</h2>
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
        <button
          disabled={hide}
          onClick={submit}
          className="btn waves-effect waves-light"
        >
          Login
        </button>
        <h6>
          <Link to="/signup">Don't have an accout?Signup</Link>
        </h6>
      </div>
    </div>
  );
};

export default Login;
