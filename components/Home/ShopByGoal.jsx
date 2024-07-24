import React, { useRef } from "react";
import styles from "./shopbygoal.module.scss";
import Slider from "react-slick";
import Image from "next/image";
import Images from "../Images/Images";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { setProductFilterValues } from "@/redux/actions/productActions";
import { useRouter } from "next/navigation";

const ShopByGoal = () => {
  const slideRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();
  const { isDarkTheme } = useSelector((state) => state.auth);
  const { productCategoryList } = useSelector((state) => state.home);
  const { productFilterValues } = useSelector((state) => state.product);

  var settings = {
    dots: false,
    infinite: productCategoryList?.length > 3 ? true : false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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

  const goToProducts = (item) => {
    dispatch(
      setProductFilterValues({ ...productFilterValues, _id: item?._id })
    );
    router.push("products");
  };

  return (
    <div
      className={`${styles["shopbygoal_wrapper"]} ${
        isDarkTheme === "light" ? styles["light_shopbygoal"] : null
      }`}
    >
      <div className="container">
        <div className={styles.shopbygoal_main}>
          <h1>SHOP BY GOAL</h1>

          <div className={styles.slider_wrapper}>
            {productCategoryList?.length > 3 && (
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
              {productCategoryList?.map((item, key) => (
                <div key={key} className={styles.slider_item}>
                  <div className={styles.slider_info}>
                    <div className={styles.category_image}>
                      <Image
                        src={Images.shopBack}
                        alt=""
                        className={styles.shopBack_image}
                      />
                      <Image
                        src={Images.shopGoal1}
                        alt=""
                        className={styles.person_image}
                      />
                      <div className={styles.product_image}>
                        <img src={item.category_image} alt="" />
                      </div>
                    </div>
                    <h6 className={styles.product_title}>
                      {item.category_name}
                    </h6>

                    <button
                      className={styles.shopnow_btn}
                      onClick={() => goToProducts(item)}
                    >
                      SHOP NOW
                    </button>
                  </div>
                </div>
              ))}
              {/* <div className={styles.slider_item}>
                <div className={styles.slider_info}>
                  <div className={styles.category_image}>
                    <Image
                      src={Images.shopBack}
                      alt=""
                      className={styles.shopBack_image}
                    />{" "}
                    <Image
                      src={Images.shopGoal1}
                      alt=""
                      className={styles.person_image}
                    />
                    <div className={styles.product_image}>
                      <Image src={Images.productImage1} alt="" />
                    </div>
                  </div>
                  <h6 className={styles.product_title}>Sports Performance</h6>
                  <button className={styles.shopnow_btn}>SHOP NOW</button>
                </div>
              </div>
              <div className={styles.slider_item}>
                <div className={styles.slider_info}>
                  <div className={styles.category_image}>
                    <Image
                      src={Images.shopBack}
                      alt=""
                      className={styles.shopBack_image}
                    />{" "}
                    <Image
                      src={Images.shopGoal3}
                      alt=""
                      className={styles.person_image}
                    />
                    <div className={styles.product_image}>
                      <Image src={Images.productImage1} alt="" />
                    </div>
                  </div>
                  <h6 className={styles.product_title}>Weight Loss</h6>
                  <button className={styles.shopnow_btn}>SHOP NOW</button>
                </div>
              </div>
              <div className={styles.slider_item}>
                <div className={styles.slider_info}>
                  <div className={styles.category_image}>
                    <Image
                      src={Images.shopBack}
                      alt=""
                      className={styles.shopBack_image}
                    />{" "}
                    <Image
                      src={Images.shopGoal3}
                      alt=""
                      className={styles.person_image}
                    />
                    <div className={styles.product_image}>
                      <Image src={Images.productImage1} alt="" />
                    </div>
                  </div>
                  <h6 className={styles.product_title}>Weight Loss</h6>
                  <button className={styles.shopnow_btn}>SHOP NOW</button>
                </div>
              </div> */}
            </Slider>
            {productCategoryList?.length > 3 && (
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

export default ShopByGoal;
