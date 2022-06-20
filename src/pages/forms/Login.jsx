import React from "react";
import "./style.css";
import logger from "./image.png";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="main">
      <h3 className="logo">MINESWEEPER</h3>
      <div className="box-form">
        <div class="inner-box">
          <img src={logger} class="carousel-login"/>
          <div class="forms-wrap-login">
            <form action="index.html" autocomplete="off">
              <div class="heading">
                <h2>Hello there, Miner</h2>
                <h6>Not registred yet? </h6>
                <Link to="/signup" className="toggle">Sign up</Link>
              </div>
              <div class="actual-form">
                <div class="input-wrap">
                  <input
                    type="email"
                    minlength="4"
                    class="input-field"
                    autoComplete="off"
                    placeholder="Email"
                    required
                  />
                </div>

                <div class="input-wrap">
                  <input
                    type="password"
                    minlength="4"
                    class="input-field"
                    autocomplete="off"
                    placeholder="Password"
                    required
                  />
                </div>
                <input type="submit" value="Sign In" class="sign-btn" />
              </div>
            </form>
            {/* <img src={logger} class="carousel-login"/> */}
          </div>    
        </div>
      </div>
    </div>

  );
};

export default Login;
