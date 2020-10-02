import "./Landing.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavPreLogin from "../NavPreLogin/NavPreLogin";
import GoogleLogin from "react-google-login";

export default function Landing() {
  const [isVisible, setIsVisible] = useState(false);

  const responseGoogleSuccess = (response) => {
    setIsVisible({ isVisible: true });
  };

  const responseGoogleFailure = (response) => {
    console.log(response);
    console.log(response.profileObj);
  };

  return (
    <div className="landing">
      <NavPreLogin />
      <header className="landing__header">
        <h1 className="landing__heading">
          Bringing car enthusiasts together like never before.
        </h1>
        <div className="landing__btn-wrapper">
          <GoogleLogin
            theme="dark"
            className="landing__googleLogin landing__btn"
            clientId="1033919158175-rrif46dii5df6u51v174fklfeumpgjus.apps.googleusercontent.com"
            buttonText="Continue with Google"
            onSuccess={responseGoogleSuccess}
            onFailure={responseGoogleFailure}
            cookiePolicy="single_host_origin"
          />
          {isVisible ? (
            <Link to="/home">
              <button className="landing__btn">CONTINUE</button>
            </Link>
          ) : null}
        </div>
      </header>
    </div>
  );
}
