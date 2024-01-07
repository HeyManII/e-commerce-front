import React from "react";
import classes from "./create.module.css";
import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [review, setReview] = useState("");
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const cate = ["burger", "gyros", "pizza", "pasta"];

  const onChangeFile = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCloseImg = (e) => {
    setImage("");
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    try {
      const fromData = new FormData();
      let filename = null;

      if (image) {
        filename = Date.now() + image.name;
        fromData.append("filename", filename);
        fromData.append("file", image);
        console.log(filename);
        console.log(image);

        await fetch(`${process.env.REACT_APP_SERVER_URL}/image`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
          body: fromData,
        });
      }

      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/product`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify({
          title,
          desc: description,
          category,
          img: filename,
          price,
          review,
        }),
      });

      const food = await res.json();

      navigate(`/food/${food.id}`);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2 className={classes.title}>Create food</h2>
        <form onSubmit={handleCreateProduct} encType="multipart/form-data">
          <div className={classes.inputWrapper}>
            <label>Title: </label>
            <input
              type="text"
              placeholder="Title"
              className={classes.input}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={classes.inputWrapper}>
            <label>Description: </label>
            <input
              type="text"
              placeholder="Description"
              className={classes.input}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className={classes.inputWrapper}>
            <label>Category: </label>
            <div className={classes.radioinputwrapper}>
              {cate.map((c) => (
                <div className={classes.ratioOption}>
                  <input
                    // className={classes.input}
                    type="radio"
                    id={c}
                    name="category"
                    value={c}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <label htmlFor={c} className={classes.radioLabel}>
                    {c}
                  </label>
                </div>
              ))}
            </div>
            {/* <input
              type="text"
              placeholder="Category"
              className={classes.input}
              onChange={(e) => setCategory(e.target.value)}
            /> */}
          </div>
          <div className={classes.inputWrapperImage}>
            <label htmlFor="image" className={classes.labelFileInput}>
              Image: <span>Upload here</span>
            </label>
            <input
              id="image"
              type="file"
              placeholder="Image"
              className={classes.input}
              onChange={onChangeFile}
              style={{ display: "none" }}
            />
            {image && (
              <p className={classes.imageName}>
                {image.name}{" "}
                <AiOutlineCloseCircle
                  onClick={handleCloseImg}
                  className={classes.closeIcon}
                />
              </p>
            )}
          </div>
          <div className={classes.inputWrapper}>
            <label>Price: </label>
            <input
              step={0.01}
              type="number"
              placeholder="Price"
              className={classes.input}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className={classes.inputWrapper}>
            <label>Review: </label>
            <input
              step={0.1}
              min={1}
              max={5}
              type="number"
              placeholder="Review"
              className={classes.input}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>
          <div className={classes.buttonWrapper}>
            <button type="submit" className={classes.submitButton}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
