import React, { useState } from "react";
import styles from "./imagegallery.module.scss";
import { useSelector } from "react-redux";
import { ChevronBottomIcon, ChevronTopIcon } from "../Icons";

const ProductImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const { isDarkTheme } = useSelector((state) => state.auth);
  const { productDetails } = useSelector((state) => state.product);

  const handleShowImage = (item) => {
    setSelectedImage(item);
  };

  return (
    <div
      className={`${styles["imagegallery_wrapper"]} ${
        isDarkTheme === "light" ? styles["light_imagegallery"] : null
      }`}
    >
      <div className={styles.galleryimage_thumbnails}>
        {/* <ChevronTopIcon /> */}
        <div className={styles.thumbnail_gallery}>
          {productDetails?.gallery_image?.map((item, key) => (
            <div className={styles.product_thumbnail} key={key}>
              <img src={item} alt="" onClick={() => handleShowImage(item)} />
            </div>
          ))}
        </div>
        {/* <ChevronBottomIcon /> */}
      </div>
      <div className={styles.product_image}>
        <img
          src={selectedImage ? selectedImage : productDetails?.product_image}
          alt=""
        />
      </div>
    </div>
  );
};

export default ProductImageGallery;
