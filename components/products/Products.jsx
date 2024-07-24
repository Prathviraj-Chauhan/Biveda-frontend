"use client";

import React, { useEffect, useState } from "react";
import Banner from "../banner/Banner";
import styles from "./products.module.scss";
import ProductCategory from "./products_categories/ProductCategory";
import FilterBy from "./products_categories/FilterBy";
import BestSellerProducts from "./products_categories/BestSellerProducts";
import Image from "next/image";
import Images from "../Images/Images";
import Pagination from "../Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductList,
  onAddToWishlist,
  onRemoveFromWishlist,
  setProductFilterValues,
} from "../../redux/actions/productActions";
import Link from "next/link";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import EmptyComponent from "../empty/EmptyComponent";

const Products = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [openFilter, setOpenFilter] = useState(false);
  const { isDarkTheme, pageLoading, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const { productList, wishlist, productFilterValues } = useSelector(
    (state) => state.product
  );
  const { userDetails } = useSelector((state) => state.user);

  useEffect(() => {
    const searchParams = new URLSearchParams();
    if (productFilterValues?._id) {
      searchParams.append("category_id", productFilterValues?._id);
    }
    searchParams.append(
      "page",
      productFilterValues?._id ||
        productFilterValues?.stock ||
        productFilterValues?.max_price
        ? 1
        : productFilterValues?.page
    );
    searchParams.append("limit", 9);
    if (productFilterValues?.stock) {
      searchParams.append("stock", productFilterValues?.stock);
    }
    searchParams.append("min_price", 0);
    if (productFilterValues?.max_price) {
      searchParams.append("max_price", productFilterValues?.max_price);
    }

    dispatch(getProductList(searchParams));
  }, [productFilterValues]);

  const handleFilterBtn = () => {
    setOpenFilter(!openFilter);
  };

  const handleAddToWishList = (item) => {
    if (isAuthenticated) {
      const data = {
        user_id: userDetails?._id,
        category_id: item.category_id,
        product_id: item._id,
      };
      dispatch(onAddToWishlist(data));
    } else {
      router.push("/registration");
      toast.error("Please login");
    }
  };

  const handleRemoveFromWishList = (item) => {
    dispatch(onRemoveFromWishlist(item._id));
  };

  const handleSelectCategory = (data) => {
    dispatch(setProductFilterValues({ ...productFilterValues, ...data }));
  };

  const handleClearFilter = () => {
    dispatch(
      setProductFilterValues({
        category_id: "",
        page: "",
        stock: "",
        min_price: "",
        max_price: "",
      })
    );
  };

  const onInputChange = (e) => {
    dispatch(
      setProductFilterValues({
        ...productFilterValues,
        [e.target.name]: e.target.value,
      })
    );
  };

  return (
    <>
      <Banner text="Products" />
      <div
        className={`${styles["privacy_wrapper"]} ${
          isDarkTheme === "light" ? styles["lightevents__wrapper"] : null
        }`}
      >
        <div className="container">
          <button className={styles.filter_btn} onClick={handleFilterBtn}>
            Filter
            <i className="fa fa-filter"></i>
          </button>
          <div className={styles.products_main}>
            <div className={styles.left_div}>
              <ProductCategory handleSelectCategory={handleSelectCategory} />
              <FilterBy
                onInputChange={onInputChange}
                productFilterValues={productFilterValues}
                handleClearFilter={handleClearFilter}
                productList={productList?.pagination}
              />

              {/* <BestSellerProducts /> */}
            </div>
            <div className={styles.right_div}>
              <div className={styles.somethingdiv}>
                {productList?.data?.length === 0 ? (
                  <EmptyComponent
                    heading={"Your Products is empty"}
                    image={
                      isDarkTheme === "light"
                        ? Images.emptyProductLight
                        : Images.emptyProduct
                    }
                  />
                ) : (
                  productList?.data?.map((item, key) => (
                    <div className={styles.products_wrap} key={key}>
                      <div className={styles.products_wrap_items}>
                        <div className={styles.product_backg_img}>
                          {isDarkTheme === "light" ? (
                            <Image src={Images.lightCategoryBack} alt="" />
                          ) : (
                            <Image src={Images.categoryBackground} alt="" />
                          )}
                          <div className={styles.product_img}>
                            <img src={item.product_image} alt="" />
                          </div>

                          {wishlist?.find(
                            (data) => data?.product_id?._id === item?._id
                          ) ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="26"
                              height="23"
                              viewBox="0 0 26 23"
                              fill="none"
                              onClick={
                                !wishlist?.find(
                                  (data) => data?.product_id?._id == item?._id
                                )
                                  ? () => handleAddToWishList(item)
                                  : () =>
                                      handleRemoveFromWishList(
                                        wishlist?.find(
                                          (data) =>
                                            data?.product_id?._id == item?._id
                                        )
                                      )
                              }
                            >
                              <path
                                d="M23.4763 1.56445C20.6936 -0.82054 16.555 -0.391547 14.0007 2.25901L13.0004 3.29574L12 2.25901C9.45083 -0.391547 5.30716 -0.82054 2.5244 1.56445C-0.664599 4.30183 -0.832174 9.21481 2.02168 12.182L11.8477 22.3859C12.4824 23.0447 13.5133 23.0447 14.148 22.3859L23.974 12.182C26.8329 9.21481 26.6653 4.30183 23.4763 1.56445Z"
                                fill="white"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="35"
                              height="35"
                              viewBox="0 0 35 35"
                              fill="none"
                              onClick={
                                !wishlist?.find(
                                  (data) => data?.product_id == item?._id
                                )
                                  ? () => handleAddToWishList(item)
                                  : () =>
                                      handleRemoveFromWishList(
                                        wishlist?.find(
                                          (data) =>
                                            data?.product_id == item?._id
                                        )
                                      )
                              }
                            >
                              <path
                                d="M17.5 28.9297L17.0625 28.5469C7.10937 20.4531 4.42969 17.6094 4.42969 12.9609C4.42969 9.13281 7.54687 6.07031 11.3203 6.07031C14.4922 6.07031 16.2969 7.87499 17.5 9.24218C18.7031 7.87499 20.5078 6.07031 23.6797 6.07031C27.5078 6.07031 30.5703 9.18749 30.5703 12.9609C30.5703 17.6094 27.8906 20.4531 17.9375 28.5469L17.5 28.9297ZM11.3203 7.49218C8.31249 7.49218 5.85156 9.95312 5.85156 12.9609C5.85156 16.9531 8.36718 19.5781 17.5 27.0703C26.6328 19.5781 29.1484 16.9531 29.1484 12.9609C29.1484 9.95312 26.6875 7.49218 23.6797 7.49218C20.9453 7.49218 19.4687 9.13281 18.3203 10.4453L17.5 11.375L16.6797 10.4453C15.5312 9.13281 14.0547 7.49218 11.3203 7.49218Z"
                                fill="white"
                              />
                            </svg>
                          )}
                        </div>
                        <h1>{item.product_name}</h1>
                        <Link href={`/product-details/${item._id}`}>
                          <button className={styles.shop_btn}>SHOP NOW</button>
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <Pagination productList={productList} />
            </div>
          </div>
        </div>
      </div>
      {pageLoading ? <LoadingSpinner /> : ""}
    </>
  );
};

export default Products;
