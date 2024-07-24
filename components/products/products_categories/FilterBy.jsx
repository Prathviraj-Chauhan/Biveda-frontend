import React from "react";
import styles from "./categoery.module.scss";
import { useSelector } from "react-redux";
import Input from "@/components/common/Input";

const FilterBy = ({
  onInputChange,
  productFilterValues,
  handleClearFilter,
  productList,
}) => {
  const { isDarkTheme } = useSelector((state) => state.auth);

  return (
    <div
      className={`${styles["filter_by_wrap"]} ${
        isDarkTheme === "light" ? styles["lightevents__wrapper1"] : null
      }`}
    >
      <h1>FILTER BY</h1>
      <hr />

      <div>
        <label>AVAILABILITY</label>
        <div className={styles.checkbpx_wrapper_div}>
          <div className="checkbox check_transparent">
            <div className={styles.checkbox_wrapper}>
              <Input
                type="radio"
                id="cutOfCheckbox"
                className={styles.custom_checkbox}
                name="stock"
                value="In-Stock"
                onChange={onInputChange}
              />
              <label htmlFor="cutOfCheckbox">
                In stock {`(${productList?.totalInStock || 0})`}
              </label>
            </div>
          </div>
          <div className="checkbox check_transparent">
            <div className={styles.checkbox_wrapper}>
              <Input
                type="radio"
                id="cutOfCheckbox1"
                className={styles.custom_checkbox}
                name="stock"
                value="Out-Of-Stock"
                onChange={onInputChange}
              />
              <label htmlFor="cutOfCheckbox1">
                out of stock {`(${productList?.totalOutOfStock || 0})`}
              </label>
            </div>
          </div>
        </div>
        <hr />

        <label>PRICE</label>
        <div className={styles["filter_range_popup"]}>
          <div className={styles["filter_price_div"]}>
            <div className={styles["filter_price"]}>
              <span>₹0</span>
              <span>₹{productFilterValues?.max_price || 1000}</span>
            </div>
            <Input
              type="range"
              name="max_price"
              max={1000}
              value={productFilterValues?.max_price}
              onChange={onInputChange}
            />
          </div>
        </div>

        {/* <div>
          <div className={styles.radio_wrap}>
            <Input type="radio" />
            <label htmlFor="">$25.00-$26.00(1)</label>
          </div>
          <div className={styles.radio_wrap}>
            <Input type="radio" />
            <label htmlFor="">$30.00-$34.00 (3)</label>
          </div>
          <div className={styles.radio_wrap}>
            <Input type="radio" />
            <label htmlFor="">$30.00-$34.00 (3)</label>
          </div>
          <div className={styles.radio_wrap}>
            <Input type="radio" />
            <label htmlFor="">$30.00-$34.00 (3)</label>
          </div>
          <div className={styles.radio_wrap}>
            <Input type="radio" />
            <label htmlFor="">$30.00-$34.00 (3)</label>
          </div>
        </div> */}
        {/* <hr /> */}

        {/* <label htmlFor="">SIZE</label>
        <div className={styles.checkbpx_wrapper_div}>
          <div className="checkbox check_transparent">
            <div className={styles.checkbox_wrapper}>
              <Input
                type="checkbox"
                id="cutOfCheckbox2"
                className={styles.custom_checkbox}
              />
              <label htmlFor="cutOfCheckbox">S(1)</label>
            </div>
          </div>
          <div className="checkbox check_transparent">
            <div className={styles.checkbox_wrapper}>
              <Input
                type="checkbox"
                id="cutOfCheckbox2"
                className={styles.custom_checkbox}
              />
              <label htmlFor="cutOfCheckbox1">M(1)</label>
            </div>
          </div>
          <div className="checkbox check_transparent">
            <div className={styles.checkbox_wrapper}>
              <Input
                type="checkbox"
                id="cutOfCheckbox2"
                className={styles.custom_checkbox}
              />
              <label htmlFor="cutOfCheckbox1">L(1)</label>
            </div>
          </div>
          <div className="checkbox check_transparent">
            <div className={styles.checkbox_wrapper}>
              <Input
                type="checkbox"
                id="cutOfCheckbox2"
                className={styles.custom_checkbox}
              />
              <label htmlFor="cutOfCheckbox1">One size(1)</label>
            </div>
          </div>
        </div> */}
        <button className={styles.apply_filter} onClick={handleClearFilter}>
          Clear Filter
        </button>
      </div>
    </div>
  );
};

export default FilterBy;
