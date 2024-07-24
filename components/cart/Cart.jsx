"use client";

import React, { useEffect, useState } from "react";
import Banner from "../banner/Banner";
import styles from "./cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Images from "../Images/Images";
import Link from "next/link";
import {
  onApplyCoupon,
  onDeleteCart,
  setCartItems,
} from "../../redux/actions/productActions";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import EmptyComponent from "../empty/EmptyComponent";
import Input from "../common/Input";
import { DeleteIcon } from "../Icons";

const Cart = () => {
  const dispatch = useDispatch();
  const { isDarkTheme, isAuthenticated, pageLoading } = useSelector(
    (state) => state.auth
  );
  const [couponCode, setCouponCode] = useState("");
  let cartList = useSelector((state) => state.product.cartList);
  const { attiributeList, cartListDetails } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (!isAuthenticated) {
      redirect("/registration");
    }
  }, [isAuthenticated]);

  const handleDeleteCart = (item) => {
    dispatch(onDeleteCart(item._id));
  };

  const handleDeleteQty = (data) => {
    if (data.quantity > 1) {
      cartList = cartList?.map((item) =>
        item._id === data._id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      );
      dispatch(setCartItems(cartList));
    }
  };

  const handleAddQty = (data) => {
    cartList = cartList?.map((item) =>
      item._id === data._id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );
    dispatch(setCartItems(cartList));
  };

  const handleChangeCoupon = (e) => {
    setCouponCode(e.target.value);
  };

  const handleCouponSubmit = (e) => {
    e.preventDefault();

    const data = {
      couponCode: couponCode,
      totalPrice: calculateSubTotal(),
      category_id: cartList?.map((cart) => cart?.product_id?.category_id),
    };

    if (!couponCode) {
      toast.error("Please Enter Your Coupon Code");
    } else {
      dispatch(onApplyCoupon(data, setCouponCode));
    }
  };

  const calculateSubTotal = () => {
    let subTotal = 0;

    cartList?.forEach((product) => {
      if (product?.product_id) {
        if (product?.product_id?.product_type === "Variable") {
          subTotal =
            subTotal +
            Number(product?.variation?.varient_price) * product?.quantity;
        } else {
          subTotal =
            subTotal +
            Number(product?.product_id?.selling_price) * product?.quantity;
        }
      } else {
        subTotal =
          subTotal +
          Number(product?.shopByCategory?.product_discount_price) *
            product?.quantity;
      }
    });

    return subTotal;
  };

  const calculateTotal = () => {
    let total = 0;

    total = total + calculateSubTotal() + cartListDetails?.shippingAmount;

    return total;
  };

  return (
    <>
      <Banner text="My cart" />
      <div
        className={`${styles["cart_wrapper"]} ${
          isDarkTheme === "light" ? styles["light_cart_wrapper"] : null
        }`}
      >
        <div className="container">
          {cartList?.length === 0 ? (
            <EmptyComponent
              heading={"Your Cart is empty"}
              para={"Create your first Cart request"}
              image={
                isDarkTheme === "light"
                  ? Images.emptyCartLight
                  : Images.emptyCartlist
              }
              isProduct={true}
            />
          ) : (
            <div className={styles.privacy_main}>
              <div className={styles.main_wrapper}>
                <div className={styles.first_div}>
                  <div className={styles.second_div}>
                    <div className={styles.third_div}>
                      <table>
                        <thead>
                          <tr>
                            <th scope="col" className="px-6 py-3 font-medium">
                              Product Details
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                              Price
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-center font-medium"
                            >
                              Quantity
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-center font-medium"
                            >
                              subtotal
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-center font-medium"
                            >
                              action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartList?.map((item, key) => (
                            <tr key={key}>
                              <td>
                                <div className={styles.prodcutimg_pricewrapper}>
                                  <div className={styles.prodcutimg}>
                                    {item?.product_id ? (
                                      <img
                                        src={item?.product_id?.product_image}
                                        alt=""
                                      />
                                    ) : (
                                      <img
                                        src={
                                          item?.shopByCategory?.product_image
                                        }
                                        alt=""
                                      />
                                    )}
                                  </div>
                                  <div
                                    className={
                                      styles.prodcutimg_pricewrapper_prices
                                    }
                                  >
                                    {item?.product_id ? (
                                      <h6>{item?.product_id?.product_name}</h6>
                                    ) : (
                                      <h6>{item?.shopByCategory?.title}</h6>
                                    )}
                                    {item?.product_id?.product_type ===
                                    "Variable"
                                      ? attiributeList
                                          ?.filter((attribute) =>
                                            Object.keys(
                                              item?.variation
                                            )?.includes(attribute.title)
                                          )
                                          ?.map((attr) => (
                                            <span className="text-capitalize">
                                              {item.variation[attr.title]?.name}{" "}
                                              :{" "}
                                              {
                                                item.variation[attr.title]
                                                  ?.label
                                              }
                                              ,{" "}
                                            </span>
                                          ))
                                      : null}
                                  </div>
                                </div>
                              </td>
                              <td>
                                {item?.product_id?.product_type ===
                                "Variable" ? (
                                  <div className={styles.Prodduct_prices}>
                                    ₹{item?.variation?.varient_price}
                                  </div>
                                ) : (
                                  <div className={styles.Prodduct_prices}>
                                    ₹
                                    {item?.product_id
                                      ? item?.product_id?.selling_price
                                      : item?.shopByCategory
                                          ?.product_discount_price}
                                  </div>
                                )}
                              </td>
                              <td className="text-center">
                                <div className={styles.button_wrapper}>
                                  <button onClick={() => handleDeleteQty(item)}>
                                    -
                                  </button>
                                  <span>{item?.quantity}</span>
                                  <button onClick={() => handleAddQty(item)}>
                                    +
                                  </button>
                                </div>
                              </td>
                              <td className="text-center">
                                {item?.product_id?.product_type ===
                                "Variable" ? (
                                  <div className={styles.Prodduct_prices}>
                                    ₹
                                    {Number(item?.variation?.varient_price) *
                                      Number(item?.quantity)}
                                  </div>
                                ) : (
                                  <div className={styles.Prodduct_prices}>
                                    ₹
                                    {item?.product_id
                                      ? Number(
                                          item?.product_id?.selling_price
                                        ) * Number(item?.quantity)
                                      : Number(
                                          item?.shopByCategory
                                            ?.product_discount_price
                                        ) * Number(item?.quantity)}
                                  </div>
                                )}
                              </td>
                              <td className="text-center">
                                <div
                                  className={styles.deleteIcon}
                                  onClick={() => handleDeleteCart(item)}
                                >
                                  <DeleteIcon />
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.checkout_wrapper}>
                {isAuthenticated ? (
                  <div className={styles.coupun_div}>
                    <h4>Discount Codes</h4>
                    <p>Enter your coupon code if you have one</p>
                    <div className={styles.send_message}>
                      <form
                        onSubmit={handleCouponSubmit}
                        className={styles.send_message_box}
                      >
                        <Input
                          type="text"
                          placeholder="Enter Code"
                          value={couponCode}
                          onChange={handleChangeCoupon}
                        />
                        <button type="submit" className={styles.send_icon}>
                          Apply coupon
                        </button>
                      </form>
                    </div>
                    <div className={styles.conti_btn}>
                      <button>Continue Shopping</button>
                    </div>
                  </div>
                ) : null}
                <div className={styles.checkout_btn}>
                  <div className={styles.pricings}>
                    <h4>Sub Total</h4>
                    <span>₹{calculateSubTotal()}</span>
                  </div>
                  <div className={styles.pricings}>
                    <h4>Shipping</h4>
                    <span>₹{cartListDetails?.shippingAmount}</span>
                  </div>
                  <div className={styles.pricings}>
                    <h4>Grand Total</h4>
                    <span>₹{calculateTotal()}</span>
                  </div>
                  <hr />
                  <Link href="/checkout" className="text-decoration-none">
                    <div className={styles.check_btn}>
                      <button>Procede to checkout</button>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {pageLoading ? <LoadingSpinner /> : ""}
    </>
  );
};

export default Cart;

{
  /* <div className={styles.cart_list_wrapper}>
<div className={styles.product_topline}>
  <span className={styles.producttag}>
    <b>Product</b>
  </span>
  <div className={styles.tag_wrap}>
    <span className={styles.price_tag} id="price-mobiview">
      <b>Price</b>
    </span>
    <span className={styles.price_tag}>
      <b>Quantity</b>
    </span>
    <span className={styles.price_tag} id="price-mobiview">
      <b>Total</b>
    </span>
    <span className={styles.price_tag} id="price-mobiview">
      <b>Remove</b>
    </span>
  </div>
</div>
<div className={styles.cartswrapped}>
  <div className={styles.carts_line}>
    <div className={styles.products_name_wrapper}>
      <div className={styles.imgs_bg}>
        <img src="" className="img-fluid" />
      </div>
      <span className={styles.product_name}>.name</span>
    </div>

    <div className={styles.price_wrap}>
      <span className={styles.product_price} id="productmobview">
        .s_price
      </span>
      <div className={styles.product_price2}>
        <button className={styles.decrement_btn}>-</button>
        <div className={styles.product_number}>.qty</div>
        <button className={styles.increment_btn}>+</button>
      </div>
      <span className={styles.product_price3} id="productmobview">
        <span>s_price</span>
      </span>
      <div className={styles.product_prices}>
        <i
          className="far fa-trash-alt "
          style={{ color: "red", cursor: "pointer" }}
        />
      </div>
    </div>
  </div>
</div>
</div> */
}
