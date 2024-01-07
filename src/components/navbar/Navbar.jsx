import React from "react";
import { Link } from "react-router-dom";
import classes from "./navbar.module.css";
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";

const Navbar = () => {
  const { products } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    alert("Logout Successfully");
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  if (!user) {
    return (
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <div className={classes.left}>
            <Link to="/" className={classes.title}>
              FOOOOOOD APP
            </Link>
          </div>
          <div className={classes.center}>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </div>
          <div className={classes.right}>
            <button onClick={() => handleLogin()} className={classes.logout}>
              Login
            </button>
            <div>/</div>
            <button onClick={() => handleSignUp()} className={classes.logout}>
              SignUp
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <div className={classes.left}>
            <Link to="/" className={classes.title}>
              FOOOOOOD APP
            </Link>
          </div>
          <div className={classes.left}>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <Link to="/">Home</Link>
              </li>
              <li className={classes.listItem}>
                <a href="/#foods">Food</a>
              </li>
              {user.role === "ADMIN" && (
                <li className={classes.listItem}>
                  <Link to="/create">Create</Link>
                </li>
              )}
            </ul>
          </div>
          <div className={classes.right}>
            <AiOutlineUser className={classes.userIcon} />
            <Link to="/cart" className={classes.cartContainer}>
              <AiOutlineShoppingCart className={classes.cartIcon} />
              <div className={classes.cartQuantity}>{products.length}</div>
            </Link>
            <button onClick={() => handleLogout()} className={classes.logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Navbar;
