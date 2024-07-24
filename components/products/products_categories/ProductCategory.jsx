"use client";
import React, { useState } from "react";
import styles from "./categoery.module.scss";
import stylesA from "../../accordiean/accordian.module.scss";
import { useSelector } from "react-redux";

const ProductCategory = ({ handleSelectCategory }) => {
  const { isDarkTheme } = useSelector((state) => state.auth);
  const { productCategoryList } = useSelector((state) => state.home);

  const [open, setOpen] = useState({});
  const accordianClickHandler = (data) => {
    setOpen({ ...open, [data?._id]: open[data?._id] ? false : true });
    handleSelectCategory(data);
  };

  return (
    <>
      <div
        className={`${styles["products_category_wrap"]} ${
          isDarkTheme === "light" ? styles["lightevents__wrapper"] : null
        }`}
      >
        <h1>PRODUCT CATEGORIES</h1>
        <hr />
        <div
          className={`${stylesA["faq_wrapper"]} ${
            isDarkTheme === "light" ? stylesA["lightevents_wrapper3"] : null
          }`}
        >
          <div className={stylesA.main_div}>
            <div className={stylesA.acord_div}>
              {productCategoryList?.map((item, key) => (
                <div className={stylesA.acordian_div} key={key}>
                  <div className={stylesA.categories_sections}>
                    <div
                      className={stylesA.plus_div}
                      onClick={() => accordianClickHandler(item)}
                    >
                      <h4
                        className={`${
                          open[item?._id] ? stylesA.head2 : stylesA.head1
                        }`}
                      >
                        {item.category_name}
                      </h4>
                      {/* {open[item?._id] ? (
                        <i
                          id="minusicon"
                          className="fa fa-minus"
                          aria-hidden="true"
                          style={{ color: "#0CEAEF" }}
                        ></i>
                      ) : (
                        <i
                          id="plusicon"
                          className="fa fa-plus"
                          aria-hidden="true"
                          style={{ color: "#0CEAEF" }}
                        ></i>
                      )} */}
                    </div>
                    {/* {open[item?._id] && (
                      <div className={stylesA.categories_items_div}>
                        <p>{item.para1}</p>
                      </div>
                    )} */}
                  </div>
                </div>
              ))}
              <div className={stylesA.other_categories_div}>
                <p>Hot deals</p>
                <p>Toprating</p>
                <p>Most View</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCategory;
