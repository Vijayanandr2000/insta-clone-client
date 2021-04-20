import React, { useState, useEffect } from "react";
// import { UserContext } from "../../App";
const Home = () => {
  const [data, setData] = useState([]);
  // const [cmd, setCmd] = useState([]);
  const [like, setLike] = useState(false);
  // const { state, dispatch } = useState(UserContext);
  // const dataUser = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    fetch("https://insta-clone-backend-mern.herokuapp.com/allpost", {
      headers: {
        "content-type": "application/json",
        Authorization: JSON.parse(localStorage.getItem("auth")),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res.user);

        setData(res.user);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="home">
      {data?.map((e) => {
        console.log(e._id);
        return (
          <div className="card home-card">
            <h5>{e.by.name}</h5>
            <div className="card-img">
              <img src={e.photo} alt="" />
            </div>
            <div className="card-content">
              <i
                className={like ? "material-icons icon" : "material-icons"}
                onClick={() => setLike(!like)}
              >
                favorite
              </i>
              <h6>{e.title}</h6>
              <p>{e.description}</p>
              <div className="comment-box">
                <input type="text" placeholder="Comment" />
                <i class="material-icons">add_circle_outline</i>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
