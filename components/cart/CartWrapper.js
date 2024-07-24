import React from "react";

const CartWrapper = ({ cartList }) => {
  return (
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
                                src={item?.shopByCategory?.product_image}
                                alt=""
                              />
                            )}
                          </div>
                          <div
                            className={styles.prodcutimg_pricewrapper_prices}
                          >
                            {item?.product_id ? (
                              <h6>{item?.product_id?.product_name}</h6>
                            ) : (
                              <h6>{item?.shopByCategory?.title}</h6>
                            )}
                            {item?.product_id?.product_type === "Variable"
                              ? attiributeList
                                  ?.filter((attribute) =>
                                    Object.keys(item?.variation)?.includes(
                                      attribute.title
                                    )
                                  )
                                  ?.map((attr) => (
                                    <span className="text-capitalize">
                                      {item.variation[attr.title]?.name} :{" "}
                                      {item.variation[attr.title]?.label},{" "}
                                    </span>
                                  ))
                              : null}
                          </div>
                        </div>
                      </td>
                      <td>
                        {item?.product_id?.product_type === "Variable" ? (
                          <div className={styles.Prodduct_prices}>
                            ₹{item?.variation?.varient_price}
                          </div>
                        ) : (
                          <div className={styles.Prodduct_prices}>
                            ₹
                            {item?.product_id
                              ? item?.product_id?.selling_price
                              : item?.shopByCategory?.product_discount_price}
                          </div>
                        )}
                      </td>
                      <td className="text-center">
                        <div className={styles.button_wrapper}>
                          <button onClick={() => handleDeleteQty(item)}>
                            -
                          </button>
                          <span>{item?.quantity}</span>
                          <button onClick={() => handleAddQty(item)}>+</button>
                        </div>
                      </td>
                      <td className="text-center">
                        {item?.product_id?.product_type === "Variable" ? (
                          <div className={styles.Prodduct_prices}>
                            ₹
                            {Number(item?.variation?.varient_price) *
                              Number(item?.quantity)}
                          </div>
                        ) : (
                          <div className={styles.Prodduct_prices}>
                            ₹
                            {item?.product_id
                              ? Number(item?.product_id?.selling_price) *
                                Number(item?.quantity)
                              : Number(
                                  item?.shopByCategory?.product_discount_price
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
            <span>₹10.00</span>
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
  );
};

export default CartWrapper;
