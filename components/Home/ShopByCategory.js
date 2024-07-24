import React, { useRef } from "react";
import styles from "./category.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import Images from "../Images/Images";
import { useSelector } from "react-redux";
import Link from "next/link";

const ShopByCategory = ({ title }) => {
  const slideRef = useRef();
  const { isDarkTheme } = useSelector((state) => state.auth);
  const { shopByCategoryList } = useSelector((state) => state.home);

  var settings = {
    dots: true,
    infinite: shopByCategoryList?.length > 4 ? true : false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const cleanDescription = (description) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = description;
    const textWithoutTags = tempElement.textContent || tempElement.innerText;

    return textWithoutTags;
  };

  return (
    <div
      className={`${styles["category_wrapper"]} ${
        isDarkTheme === "light" ? styles["light_category_wrapper"] : null
      }`}
    >
      <div className="container">
        <div className={styles.category_main}>
          {!title ? <h1>SHOP BY CATEGORY</h1> : null}

          <div className={styles.slider_wrapper}>
            {shopByCategoryList?.length > 4 && (
              <div className={styles.btn_div}>
                <button
                  className={styles.nextbtn}
                  onClick={() => slideRef.current.slickPrev()}
                >
                  <i
                    className="fa fa-chevron-left"
                    style={{ color: "#28d5da" }}
                  ></i>
                </button>
              </div>
            )}
            <Slider {...settings} ref={slideRef}>
              {shopByCategoryList?.map((item, key) => (
                <div className={styles.slider_item} key={key}>
                  <div className={styles.slider_info}>
                    <div className={styles.category_image}>
                      {isDarkTheme === "light" ? (
                        <Image src={Images.lightCategoryBack} alt="" />
                      ) : (
                        <Image src={Images.categoryBackground} alt="" />
                      )}

                      <div className={styles.product_image}>
                        <img src={item.product_image} alt="" />
                        {/* <h6>Lorem Ipsum</h6> */}
                        <p>{cleanDescription(item.description)}</p>
                      </div>
                    </div>
                    <h6 className={styles.product_title}>{item.title}</h6>
                    <Link href={`/category-details/${item._id}`}>
                      <button className={styles.shopnow_btn}>SHOP NOW</button>
                    </Link>
                  </div>
                </div>
              ))}
            </Slider>{" "}
            {shopByCategoryList?.length > 4 && (
              <div className={styles.btn_div2}>
                <button
                  className={styles.nextbtn}
                  onClick={() => slideRef.current.slickNext()}
                >
                  <i
                    className="fa fa-chevron-right"
                    style={{ color: "#28d5da" }}
                  ></i>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopByCategory;
