import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
const Profile = () => {
  const [pic, setPic] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  // console.log(state);
  useEffect(() => {
    fetch("https://insta-clone-backend-mern.herokuapp.com/mypost", {
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.parse(localStorage.getItem("auth")),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.user);
        setPic(data.user);
      });
  }, []);
  return (
    <div className="profile-head">
      <div className="pro-top">
        <div>
          <img
            src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
            alt="pic"
            style={{ width: "180px", height: "180px", borderRadius: "90px" }}
          />
        </div>
        <div>
          <h4>{state ? state.name : "loading"}</h4>
          <div className="myself">
            <h5>10 post</h5>
            <h5>10k followers</h5>
            <h5>160 following</h5>
          </div>
        </div>
      </div>

      <div className="posts">
        {pic?.map((e) => {
          // console.log(e);
          return (
            <div>
              <img src={e.photo} alt={e.title} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
