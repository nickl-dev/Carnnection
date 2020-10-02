import "./NavPreLogin.scss";
import React from "react";
import { Link } from "react-router-dom";
import CarnnectionLogo from "../../assets/car-icon.svg";

export default function NavPreLogin() {
  const handleScroll = () => {
    window.scroll({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="navbar-pre">
      <Link className="navbar-pre__anchor" to="/">
        <h1 className="navbar-pre__title" onClick={handleScroll}>
          CARNNECTION
        </h1>
      </Link>
      <img
        className="navbar-pre__logo"
        src={CarnnectionLogo}
        alt="Carnnection logo"
      />
    </nav>
  );
}
