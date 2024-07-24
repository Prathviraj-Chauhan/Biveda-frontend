import React from "react";
import styles from "./favourite.module.scss";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  onAddToCart,
  onRemoveFromWishlist,
} from "../../../redux/actions/productActions";
import EmptyComponent from "../../empty/EmptyComponent";
import Images from "../../Images/Images";
import Link from "next/link";
import { DeleteIcon, ProductImageIcon } from "@/components/Icons";

const Favourite = () => {
  const dispatch = useDispatch();
  const { isDarkTheme } = useSelector((state) => state.auth);
  const { wishlist } = useSelector((state) => state.product);
  const { userDetails } = useSelector((state) => state.user);

  const handleRemoveFromWishList = (item) => {
    dispatch(onRemoveFromWishlist(item._id));
  };

  const handleAddToCart = (item) => {
    const data = {
      user_id: userDetails?._id,
      product_id: item?.product_id._id,
      quantity: 1,
    };

    dispatch(onAddToCart(data));
  };

  const lowestPriceItem = (object) => {
    const sortedArray = object?.sort(
      (a, b) => parseFloat(a.varient_price) - parseFloat(b.varient_price)
    );
    const lowestPriceItem = sortedArray && sortedArray[0];
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
    <div
      className={`${styles["favrouite_wrapper"]} ${
        isDarkTheme === "light" ? styles["lightevents_wrapper"] : null
      }`}
    >
      {wishlist?.length === 0 ? (
        <EmptyComponent
          heading={"Your Wishlist is empty"}
          para={"Create your first Wishlist request"}
          image={
            isDarkTheme === "light"
              ? Images.emptyWishlistLight
              : Images.emptyWishlist
          }
          isProduct={true}
        />
      ) : (
        wishlist?.map((item, key) => (
          <div className={styles.fav} key={key}>
            <div className={styles.img_divs}>
              <div className={styles.img_divs_main}>
                <img src={item?.product_id?.product_image} alt="" />
              </div>

              <div className={styles.product_info}>
                <Link
                  href={{
                    pathname: "/product-details",
                    query: { slug: item?.product_id?._id },
                  }}
                  className="text-decoration-none"
                >
                  <h6>{item?.product_id?.product_name}</h6>
                </Link>
                {/* <p>
                  MG <span className={styles.para_span}>: 100</span>
                </p> */}
              </div>
            </div>
            <div className={styles.divs2}>
              <p>
                Total :{" "}
                {item?.product_id?.product_type === "Variable" ? (
                  <span className={styles.para_span}>
                    ₹{lowestPriceItem(item?.product_id?.object)} - ₹
                    {highestPriceItem(item?.product_id?.object)}
                  </span>
                ) : (
                  <span className={styles.para_span}>
                    ₹{item?.product_id?.selling_price}
                  </span>
                )}
              </p>
              <div className={styles.btn_div}>
                {item?.product_id?.product_type === "Variable" ? (
                  <Link
                    href={{
                      pathname: "/product-details",
                      query: { slug: item?.product_id?._id },
                    }}
                    className="text-decoration-none"
                  >
                    <Button>View</Button>
                  </Link>
                ) : (
                  <Button onClick={() => handleAddToCart(item)}>
                    Add To Cart
                  </Button>
                )}
                <Button
                  className={styles.delete_btn}
                  onClick={() => handleRemoveFromWishList(item)}
                >
                  <DeleteIcon />
                </Button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Favourite;
