import "./NavPostLogin.scss";
import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import AddIcon from "@material-ui/icons/Add";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

export default function NavPostLogin() {
  const handleScroll = () => {
    window.scroll({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="navbar-post">
      <h1 className="navbar-post__heading">CARNNECTION</h1>
      <div className="navbar-post__icon-container">
        <Link to="/home" onClick={handleScroll}>
          <HomeIcon
            style={{
              fontSize: "32px",
              border: "1px solid #cb356b",
              borderRadius: "50%",
              padding: "3px",
            }}
            className="navbar-post__icon"
          />
        </Link>
        <Link to="/newPost">
          <AddIcon
            style={{
              fontSize: "32px",
              border: "1px solid #cb356b",
              borderRadius: "50%",
              padding: "3px",
            }}
            className="navbar-post__icon"
          />
        </Link>
        <Link to="/">
          <ExitToAppIcon
            style={{
              fontSize: "32px",
              border: "1px solid #cb356b",
              borderRadius: "50%",
              padding: "3px",
            }}
            className="navbar-post__icon"
          />
        </Link>
      </div>
    </nav>
  );
}
