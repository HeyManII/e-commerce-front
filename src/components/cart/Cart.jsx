import React from "react";
import classes from "./cart.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { products } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let totalPrice = 0;
  products.map((product) => (totalPrice += product.price * product.quantity));

  const handleRemoveProduct = (id) => {
    dispatch(removeProduct({ id: id }));
  };

  const handleOrder = () => {
    if (products.length > 0) {
      navigate("/checkout");
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          {products.length > 0 ? (
            products.map((product) => (
              <div key={products.id} className={classes.product}>
                <div
                  onClick={() => handleRemoveProduct(product.id)}
                  className={classes.closeButton}
                >
                  <AiOutlineClose />
                </div>
                <img
                  src={`${process.env.REACT_APP_SERVER_URL}/image/${product.img}`}
                  className={classes.img}
                  alt=""
                />
                <div className={classes.productData}>
                  <h3 className={classes.title}>{product.title}</h3>
                  <div className={classes.productAndQuantity}>
                    <span className={classes.quantity}>
                      {product.quantity} x{" "}
                    </span>
                    <span className={classes.price}>${product.price}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1 className={classes.noProducts}>
              No product in the cart. Please add your favourite food!
            </h1>
          )}
        </div>
        <div className={classes.right}>
          <div className={classes.totalProductMsg}>
            Total products: {products.length}
          </div>
          <div className={classes.subtotalCheckoutButton}>
            <span className={classes.subtotal}>Subtotal: ${totalPrice}</span>
            <span
              onClick={handleOrder}
              disabled={products.length === 0}
              className={classes.orderNowButton}
            >
              Subtotal: ${totalPrice}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
