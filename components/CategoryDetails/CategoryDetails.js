"use client";

import React, { useEffect } from "react";
import Banner from "../banner/Banner";
import styles from "./categorydetails.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getShopByCategoryId } from "../../redux/actions/homeActions";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { onAddToCart } from "../../redux/actions/productActions";
import StripeCheckout from "react-stripe-checkout";

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY;

const CategoryDetails = ({ slug }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isDarkTheme, pageLoading, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const { shopCategoryDetails } = useSelector((state) => state.home);
  const { userDetails } = useSelector((state) => state.user);

  useEffect(() => {
    // if (typeof window !== undefined) {
    //   const url = window.location.href;
    //   const params = new URLSearchParams(url?.split("?")[1]);
    //   const slug = params.get("slug");
    if (slug) {
      dispatch(getShopByCategoryId(slug));
    }
    // }
  }, [slug]);

  const handleAddToCart = () => {
    if (isAuthenticated) {
      const data = {
        user_id: userDetails?._id,
        shopByCategory: shopCategoryDetails?._id,
        quantity: 1,
      };

      dispatch(onAddToCart(data));
    } else {
      router.push("/registration");
      toast.error("Please login!");
    }
  };

  const handleAddCard = (token) => {
    console.log(token);
    // if (token) {
    //   if (isAuthenticated) {
    //     const data = {
    //       user_id: userDetails?._id,
    //       shopByCategory: shopCategoryDetails?._id,
    //       quantity: 1,
    //     };

    //     dispatch(onAddToCart(data));
    //   } else {
    //     router.push("/registration");
    //     toast.error("Please login!");
    //   }
    // }
  };

  const lowestPriceItem = (object) => {
    const lowToHightPriceArray = object?.sort(
      (a, b) => parseFloat(a.varient_price) - parseFloat(b.varient_price)
    );

    const lowestPriceItem = lowToHightPriceArray && lowToHightPriceArray[0];

    return lowestPriceItem?.varient_price;
  };

  const highestPriceItem = (object) => {
    const highToLowPriceArray = object?.sort(
      (a, b) => parseFloat(b.varient_price) - parseFloat(a.varient_price)
    );
    const highestPriceItem = highToLowPriceArray && highToLowPriceArray[0];

    return highestPriceItem?.varient_price;
  };

  return (
    <>
      <Banner text="Category Details" />
      <div
        className={`${styles["privacy_wrapper"]} ${
          isDarkTheme === "light" ? styles["light_blogdetails"] : null
        }`}
      >
        <div className="container">
          <div className={styles.privacy_main}>
            <div className={styles.product_info}>
              <h4 className={styles.privacy_main_headings}>
                Product Description
              </h4>

              <p
                dangerouslySetInnerHTML={{
                  __html: shopCategoryDetails?.description,
                }}
              ></p>
            </div>
            <div className={styles.product_img}>
              <img src={shopCategoryDetails?.image} alt="" />
            </div>
          </div>

          <div className={styles.products_wrap}>
            {shopCategoryDetails?.product_id?.map((data, key) => (
              <div className={styles.products_wrap_info} key={key}>
                <div className={styles.products_wrap_info_img}>
                  <img src={data.product_image} alt="" />
                </div>
                <hr />
                <div className={styles.products_wrap_info_prices}>
                  <h4>{data?.product_name}</h4>
                  {data.product_type === "Variable" ? (
                    <span>
                      ₹{lowestPriceItem(data.object)} - ₹
                      {highestPriceItem(data.object)}
                    </span>
                  ) : (
                    <span>₹{data.selling_price}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.product_saving_wrapper}>
            <div className={styles.left_product}>
              <div className={styles.left_product_prodctimg}>
                <img src={shopCategoryDetails?.product_image} alt="" />
              </div>
              <div className={styles.left_product_prices}>
                <h4>{shopCategoryDetails?.product_title}</h4>
                <p>
                  <span>₹{shopCategoryDetails?.product_actual_price}</span> ₹
                  {shopCategoryDetails?.product_discount_price}
                </p>
              </div>
            </div>

            <div className={styles.right_product}>
              <div className={styles.right_product_prices}>
                <h4>Buy As a Packge and save</h4>
                <p>
                  <span>₹{shopCategoryDetails?.product_actual_price}</span> ₹
                  {shopCategoryDetails?.product_discount_price}
                </p>
                <div className={styles.btn}>
                  <select name="">
                    <option value="">Select Month</option>
                    <option value={1}>1 Month</option>
                    <option value={3}>3 Month</option>
                    <option value={6}>6 Month</option>
                    <option value={12}>12 Month</option>
                  </select>
                  {isAuthenticated ? (
                    <StripeCheckout
                      label="Add Card"
                      token={handleAddCard}
                      stripeKey={stripeKey}
                    >
                      <button className={styles.addbtn}>Add to cart</button>
                    </StripeCheckout>
                  ) : (
                    <button className={styles.addbtn} onClick={handleAddToCart}>
                      Add to cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {pageLoading ? <LoadingSpinner /> : ""}
    </>
  );
};

export default CategoryDetails;
