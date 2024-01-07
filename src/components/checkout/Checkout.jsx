import React from "react";
import classes from "./checkout.module.css";
import { useSelector } from "react-redux";

const Checkout = () => {
  const { products } = useSelector((state) => state.cart);

  let totalPrice = 0;
  products.map((product) => (totalPrice += product.price * product.quantity));

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Your order is successful</h2>
        <p>Expect it in 3 minutes</p>
        <span>Total Price: {totalPrice}</span>
      </div>
    </div>
  );
};

export default Checkout;
