import React, { useEffect } from "react";
import classes from "./foodDetails.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { addProduct } from "../../redux/cartSlice";

const FoodDetails = () => {
  const [foodDetails, setFoodDetails] = useState("");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchFoodDetails = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/product/find/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setFoodDetails(data);
    };
    fetchFoodDetails();
  }, [id, token]);

  const changeQuantity = (type) => {
    if (type === "dec") {
      if (quantity === 1) return;
      setQuantity(quantity - 1);
    } else if (type === "add") {
      setQuantity(quantity + 1);
    }
  };

  const addToCart = () => {
    dispatch(addProduct({ ...foodDetails, quantity }));
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          {!!foodDetails?.img && (
            <img
              src={`${process.env.REACT_APP_SERVER_URL}/image/${foodDetails?.img}`}
              alt=""
            />
          )}
        </div>
        <div className={classes.right}>
          <h2 className={classes.title}>{foodDetails?.title}</h2>
          <div className={classes.price}>
            Price: <span>$</span> {foodDetails?.price}
          </div>
          <div className={classes.quantity}>
            <button
              disabled={quantity === 1}
              onClick={() => changeQuantity("dec")}
            >
              -
            </button>
            <span className={classes.quantityNumber}> {quantity} </span>
            <button onClick={() => changeQuantity("add")}> + </button>
          </div>
          <div className={classes.category}>
            <h3>Category: </h3>
            <span className={classes.categoryName}>
              {foodDetails?.category}
            </span>
          </div>
          <div className={classes.desc}>
            <div>Description: </div>
            <p>
              {foodDetails?.desc?.length > 40
                ? `${foodDetails?.desc}`.slice(0, 40)
                : `${foodDetails?.desc}`}
            </p>
          </div>
          <button onClick={addToCart} className={classes.addToCart}>
            Add To Cart
            <AiOutlineShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
