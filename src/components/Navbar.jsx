import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";

const Navbar = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const renderList = () => {
    if (state) {
      return [
        <li>
          <Link to="profile">Profile</Link>
        </li>,
        <li>
          <Link to="createpost">CreatePost</Link>
        </li>,

        <button
          className="btn"
          onClick={() => {
            localStorage.clear();
            history.push("/login");
          }}
        >
          Logout
        </button>,
      ];
    } else {
      return [
        <li>
          <Link to="login">Login</Link>
        </li>,
        <li>
          <Link to="signup">Signup</Link>
        </li>,
      ];
    }
  };
  return (
    <nav>
      <div className="nav-wrapper nav-h white">
        <Link to={state ? "/" : "/signup"} className="brand-logo left">
          Instagram
        </Link>
        <ul id="nav-mobile" className="right ">
          {renderList()}
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
