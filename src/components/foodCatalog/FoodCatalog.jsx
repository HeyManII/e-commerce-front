import React from "react";
import classes from "./foodCatalog.module.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const FoodCatalog = () => {
  const [filteredFoods, setFilteredFoods] = useState([]);
  const location = useLocation();
  // e.g. ['', 'foods', 'burger']
  const foodEndpoint = location.pathname.split("/")[2];
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchFoodType = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/product?category=${foodEndpoint}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setFilteredFoods(data);
    };
    fetchFoodType();
  }, [foodEndpoint, token]);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        {filteredFoods?.length !== 0 && (
          <h2 className={classes.title}>
            The best {foodEndpoint} in the region
          </h2>
        )}
        <div className={classes.foods}>
          {filteredFoods.length !== 0 ? (
            filteredFoods.map((food) => (
              <Link
                to={`/food/${food.id}`}
                key={food.id}
                className={classes.food}
              >
                <div className={classes.imgContainer}>
                  <img
                    src={`${process.env.REACT_APP_SERVER_URL}/image/${food.img}`}
                    className={classes.foodImg}
                    alt={food.desc}
                  />
                </div>
                <div className={classes.foodDetails}>
                  <h4 className={classes.Title}>{food.title}</h4>
                  <span className={classes.price}>
                    <span>$ </span>
                    {food.price}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <h1 className={classes.noQuantity}>No {foodEndpoint} right now</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCatalog;
