import React from "react";
import classes from "./hero.module.css";
import { AiOutlineArrowDown } from "react-icons/ai";
import manEating from "../../assets/man-having-his-meal.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Hero = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleOrder = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/cart");
    }
  };

  return (
    <section id="home" className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <h2 className={classes.title}>Do you crave delicious food</h2>
          <p className={classes.firstMsg}>
            But going out to take <span>food costs time...</span>
          </p>
          <p className={classes.secondMsg}>
            Why not order <span>pizza</span> or something{" "}
            <span>delicious </span> from our restaurant
          </p>
          <p className={classes.desc}>
            Our restaurant always puts the client above. They are out single
            most important thing for our business.
          </p>
          <div className={classes.buttons}>
            <button
              onClick={() => handleOrder()}
              className={classes.buttonOrder}
            >
              Order now!
            </button>
            <button className={classes.buttonSee}>
              <a href="#foods">
                See what's available <AiOutlineArrowDown />
              </a>
            </button>
          </div>
        </div>
        <div className={classes.right}></div>
        <img src={manEating} alt="" className={classes.manEatingImg} />
      </div>
    </section>
  );
};

export default Hero;
