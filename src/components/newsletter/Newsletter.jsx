import React from "react";
import classes from "./newsletter.module.css";
import { AiOutlineSend } from "react-icons/ai";
import newsletterIllustration from "../../assets/get-newsletter-updates.svg";

const Newsletter = () => {
  return (
    <section id="Newsletter" className={classes.container}>
      <div className={classes.wrapper}>
        <h4 className={classes.subtitle}>Get our latest offers</h4>
        <h2 className={classes.title}>Newsletter</h2>
        <div className={classes.inputContainer}>
          <input type="text" placeholder="Enter your email" />
          <AiOutlineSend className={classes.sendIcon} />
        </div>
        <img
          src={newsletterIllustration}
          className={classes.illustration}
          alt=""
        ></img>
      </div>
    </section>
  );
};

export default Newsletter;
