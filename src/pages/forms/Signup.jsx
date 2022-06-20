import React from "react";
import "./style.css";
import logger from "./image.png";
import { Link } from "react-router-dom";
const Signup = () => {
  return (
    <div className="main">
      <h3 className="logo">MINESWEEPER</h3>
      <div className="box-form">
        <div class="inner-box">
        <img src={logger} class="carousel-signup" />
          <div class="forms-wrap-signup">
            <form action="index.html" autocomplete="off">
              <div class="heading">
                <h2>Become a Miner</h2>
                <h6>Already have an account? </h6>
                <Link to="/" className="toggle">Sign in</Link>
              </div>
              <div class="actual-form">
                <div class="input-wrap">
                  <input
                    type="text"
                    minlength="4"
                    class="input-field"
                    autocomplete="off"
                    placeholder="Name"
                    required
                  />
                </div>
                <div class="input-wrap">
                  <input
                    type="email"
                    class="input-field"
                    autocomplete="off"
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
                <input type="submit" value="Sign Up" class="sign-btn" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Signup;
