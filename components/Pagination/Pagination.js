import React from "react";
import styles from "./Pagination.module.scss";
import { NextIcon, PrevIcon } from "../Icons";
import { useDispatch, useSelector } from "react-redux";
import { setProductFilterValues } from "@/redux/actions/productActions";

const Pagination = ({ productList }) => {
  const dispatch = useDispatch();
  const totalPages = [];
  const paginationData = productList?.pagination;
  const { isDarkTheme } = useSelector((state) => state.auth);
  const { productFilterValues } = useSelector((state) => state.product);

  const handlePrev = () => {
    if (productFilterValues?.page > 1) {
      dispatch(
        setProductFilterValues({
          ...productFilterValues,
          page: productFilterValues?.page - 1,
        })
      );
    }
  };

  const handleNext = () => {
    if (productFilterValues?.page < paginationData?.next?.page) {
      dispatch(
        setProductFilterValues({
          ...productFilterValues,
          page: productFilterValues?.page + 1,
        })
      );
    }
  };

  const handleSelectPage = (number) => {
    dispatch(setProductFilterValues({ ...productFilterValues, page: number }));
  };

  for (let i = 1; i < paginationData?.total_pages + 1; i++) {
    totalPages.push(i);
  }

  return paginationData?.total_pages > 1 ? (
    <div
      className={`${styles["pagination_wrapper"]} ${
        isDarkTheme === "light" ? styles["light_pagination"] : null
      }`}
    >
      <h6 className={styles.page_text}>
        Showing 1-{productList?.data?.length} of {paginationData?.limit} item(s)
      </h6>
      <div className={styles.pagination}>
        <button
          className={styles.prev_btn}
          onClick={handlePrev}
          disabled={paginationData?.current_page == 1}
        >
          <PrevIcon />
        </button>
        <ul>
          {totalPages?.map((number, key) => (
            <li
              key={key}
              className={
                number == paginationData?.current_page ? styles.active_list : ""
              }
              onClick={() => handleSelectPage(number)}
            >
              <span>{number}</span>
            </li>
          ))}
          {/* <li className={styles.active_list}>
            <span>2</span>
          </li>
          <li>3</li>
          <li>....</li>
          <li>4</li>
          <li>5</li>
          <li>6</li> */}
        </ul>
        <button
          className={styles.next_btn}
          onClick={handleNext}
          disabled={paginationData?.current_page == paginationData?.total_pages}
        >
          <NextIcon />
        </button>
      </div>
    </div>
  ) : null;
};

export default Pagination;
