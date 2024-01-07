import React from "react";
import classes from "./login.module.css";
import img from "../../assets/womaneating2.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/auth/login`,
        {
          email,
          password,
        }
      );
      // console.log("fdf", res.data);
      dispatch(login(res.data));
      navigate("/");
    } catch (error) {
      // console.log("fdf", error);
      alert(error.response.data);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  return (
    <div className={classes.loginContainer}>
      <div className={classes.loginWrapper}>
        <div className={classes.loginLeft}>
          <img src={img} alt="" className={classes.leftImg} />
        </div>
        <div className={classes.loginRight}>
          <h2 className={classes.title}>Login</h2>
          <form onSubmit={handleLogin} className={classes.loginForm}>
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
            <button type="submit" className={classes.submitButton}>
              Login
            </button>
            <p>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </form>
          {error && (
            <div className={classes.errorMessage}>
              Wrong credentials! Try differnt ones
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
