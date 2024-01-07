import React from "react";
import classes from "./signup.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/womaneating.jpg";
import { useDispatch } from "react-redux";
import { register } from "../../redux/authSlice";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/auth/register`,
        {
          username,
          email,
          password,
        }
      );
      // const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/register`, {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   method: "POST",
      //   body: JSON.stringify({ username, email, password }),
      // });
      // const data = await res.json();

      dispatch(register(res.data));
      navigate("/");
    } catch (error) {
      alert(error.response.data);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  return (
    <div className={classes.signUpContainer}>
      <div className={classes.signUpWrapper}>
        <div className={classes.left}>
          <img src={img} alt="" className={classes.leftImg} />
        </div>
        <div className={classes.right}>
          <h2 className={classes.title}>Sign Up</h2>
          <form onSubmit={handleSignUp} className={classes.signUpForm}>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className={classes.submitButton}>Sign Up</button>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
          {error && (
            <div className={classes.errorMessage}>
              Wrong credentials! Try different ones
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
