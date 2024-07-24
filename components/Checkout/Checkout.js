import React, { useEffect, useState } from "react";
import styles from "./checkout.module.scss";
import { Button, Col, Row } from "react-bootstrap";
import Banner from "../banner/Banner";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { onCheckout } from "../../redux/actions/productActions";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Input from "../common/Input";
import {
  GooglePayIcon,
  PayPassCardIcon,
  PaypalCardIcon,
  VisaCardIcon,
} from "../Icons";

const Checkout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [addressValues, setAddressValues] = useState({
    first_name: "",
    last_name: "",
    country_name: "",
    street_address: "",
    apt_suite_unit: "",
    city: "",
    state: "",
    postal_code: "",
    phone: "",
    save_information: false,
    deliviry_type: "",
    default_billing_address: true,
    default_shipping_address: false,
  });
  const { isDarkTheme, pageLoading } = useSelector((state) => state.auth);
  const { userDetails } = useSelector((state) => state.user);
  const { cartList, attiributeList, buyNowProductDetails, cartListDetails } =
    useSelector((state) => state.product);

  useEffect(() => {
    if (userDetails) {
      const addressList = userDetails?.address;
      for (let i = 0; i < addressList.length; i++) {
        if (addressList[i]?.default_billing_address) {
          setAddressValues(addressList[i]);
        }
      }
    }
  }, [userDetails]);

  const onInputChange = (e) => {
    const { name, value, checked } = e.target;
    setAddressValues({ ...addressValues, [name]: value });

    if (name === "save_information") {
      if (checked) {
        setAddressValues({ ...addressValues, [name]: true });
      } else {
        setAddressValues({ ...addressValues, [name]: false });
      }
    }
  };

  const calculateSubTotal = () => {
    let subTotal = 0;

    if (buyNowProductDetails) {
      if (buyNowProductDetails?.product_type === "Variable") {
        subTotal =
          subTotal +
          Number(buyNowProductDetails?.variation?.varient_price) *
            buyNowProductDetails?.quantity;
      } else {
        subTotal =
          subTotal +
          Number(buyNowProductDetails?.selling_price) *
            buyNowProductDetails?.quantity;
      }
    } else {
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
    }

    return subTotal;
  };

  const calculateTotal = () => {
    let total = 0;

    total = total + calculateSubTotal() + cartListDetails?.shippingAmount;

    return total;
  };

  const handleCheckout = () => {
    const data = {
      user_id: userDetails?._id,
      first_name: addressValues?.first_name,
      last_name: addressValues?.last_name,
      phone: addressValues?.phone,
      country_name: addressValues?.country_name,
      state: addressValues?.state,
      city: addressValues?.city,
      street_address: addressValues?.street_address,
      apt_suite_unit: addressValues?.apt_suite_unit,
      postal_code: addressValues?.postal_code,
      save_information: addressValues?.save_information,
      deliviry_type: addressValues?.deliviry_type,
    };

    if (!addressValues?.first_name) {
      toast.error("Please enter your first name");
    } else if (!addressValues?.last_name) {
      toast.error("Please enter your last name");
    } else if (!addressValues?.phone) {
      toast.error("Please enter your phone number");
    } else if (!addressValues?.country_name) {
      toast.error("Please enter your country name");
    } else if (!addressValues?.state) {
      toast.error("Please enter your state");
    } else if (!addressValues?.city) {
      toast.error("Please enter your city");
    } else if (!addressValues?.street_address) {
      toast.error("Please enter your street address");
    } else if (!addressValues?.apt_suite_unit) {
      toast.error("Please enter your apt suite unit");
    } else if (!addressValues?.postal_code) {
      toast.error("Please enter your postal code");
    } else if (!addressValues?.deliviry_type) {
      toast.error("Please select your delivery type");
    } else {
      dispatch(
        onCheckout(
          data,
          router,
          buyNowProductDetails?.isBuyNowProduct
            ? buyNowProductDetails
            : cartList
        )
      );
    }
  };

  return (
    <>
      <Banner text="checkout" />

      <div
        className={`${styles["checkout_wrapper"]} ${
          isDarkTheme === "light" ? styles["light_checkout_wrapper"] : null
        }`}
      >
        <div className="container">
          <Row className={styles.check_row}>
            <Col lg={7} className={styles.check_col_1}>
              <h4>Billing Details</h4>
              <div className={styles.short_input_div}>
                <div className={styles.label_div}>
                  <label>
                    First Name <b>*</b>{" "}
                  </label>
                  <Input
                    type="text"
                    placeholder="First Name"
                    name="first_name"
                    value={addressValues?.first_name}
                    onChange={onInputChange}
                  />
                </div>
                <div className={styles.label_div}>
                  <label>
                    Last Name <b>*</b>
                  </label>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    name="last_name"
                    value={addressValues?.last_name}
                    onChange={onInputChange}
                  />
                </div>
              </div>
              <div className={styles.short_input_div}>
                <div className={styles.label_div}>
                  <label>
                    Phone <b>*</b>
                  </label>
                  <Input
                    type="number"
                    placeholder="Phone"
                    name="phone"
                    value={addressValues?.phone}
                    onWheel={(e) => e.target.blur()}
                    onChange={onInputChange}
                  />
                </div>
                <div className={styles.label_div}>
                  <label>
                    Country Name <b>*</b>{" "}
                  </label>
                  <Input
                    type="text"
                    placeholder="Country Name"
                    name="country_name"
                    value={addressValues?.country_name}
                    onChange={onInputChange}
                  />
                </div>
              </div>
              <div className={styles.short_input_div}>
                <div className={styles.label_div}>
                  <label>
                    State <b>*</b>
                  </label>
                  <Input
                    type="text"
                    placeholder="State"
                    name="state"
                    value={addressValues?.state}
                    onChange={onInputChange}
                  />
                </div>
                <div className={styles.label_div}>
                  <label>
                    City <b>*</b>{" "}
                  </label>
                  <Input
                    type="text"
                    placeholder="Town / City"
                    name="city"
                    value={addressValues?.city}
                    onChange={onInputChange}
                  />
                </div>
              </div>
              <div className={styles.short_input_div}>
                <div className={styles.label_div}>
                  <label>
                    Street Address <b>*</b>
                  </label>
                  <Input
                    type="text"
                    placeholder="House number and street name"
                    name="street_address"
                    value={addressValues?.street_address}
                    onChange={onInputChange}
                  />
                </div>
                <div className={styles.label_div}>
                  <label>
                    Apt, suite unit <b>*</b>
                  </label>
                  <Input
                    type="text"
                    placeholder="apartment suite"
                    name="apt_suite_unit"
                    value={addressValues?.apt_suite_unit}
                    onChange={onInputChange}
                  />
                </div>
              </div>
              <div className={styles.short_input_div}>
                <div className={styles.label_div}>
                  <label>
                    Postal Code <b>*</b>{" "}
                  </label>
                  <Input
                    type="text"
                    placeholder="Postal Code"
                    name="postal_code"
                    value={addressValues?.postal_code}
                    onChange={onInputChange}
                  />
                </div>
              </div>
              {userDetails?.address?.length !== 0 ? null : (
                <div className={styles.short_check_div}>
                  <Input
                    type="checkbox"
                    name="save_information"
                    onChange={onInputChange}
                  />
                  <span>Save my information for a faster checkout</span>
                </div>
              )}
            </Col>
            <Col lg={5} className={styles.check_col_2}>
              <h3>Order Summary</h3>
              <hr />
              {buyNowProductDetails ? (
                <div className={styles.col2_div}>
                  <img src={buyNowProductDetails?.product_image} alt="" />
                  <div className={styles.checkout_values}>
                    <h2>
                      {buyNowProductDetails?.product_name}
                      {buyNowProductDetails?.product_type === "Variable"
                        ? attiributeList
                            ?.filter((attribute) =>
                              Object.keys(
                                buyNowProductDetails?.variation
                              )?.includes(attribute?.title)
                            )
                            ?.map((attr) => (
                              <span className="text-capitalize">
                                {
                                  buyNowProductDetails?.variation[attr.title]
                                    ?.name
                                }{" "}
                                :{" "}
                                {
                                  buyNowProductDetails?.variation[attr.title]
                                    ?.label
                                }
                                ,{" "}
                              </span>
                            ))
                        : null}
                    </h2>
                    {buyNowProductDetails?.product_type === "Variable" ? (
                      <p>
                        ₹{buyNowProductDetails?.variation?.varient_price}{" "}
                        <i className="fa fa-remove"></i>{" "}
                        {buyNowProductDetails?.quantity}
                      </p>
                    ) : (
                      <p>
                        ₹{buyNowProductDetails?.selling_price}{" "}
                        <i className="fa fa-remove"></i>{" "}
                        {buyNowProductDetails?.quantity}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                cartList?.map((item, index) => (
                  <>
                    <div className={styles.col2_div} key={index}>
                      {item?.product_id ? (
                        <img src={item?.product_id?.product_image} alt="" />
                      ) : (
                        <img src={item?.shopByCategory?.product_image} alt="" />
                      )}
                      <div className={styles.checkout_values}>
                        <h2>
                          {item?.product_id
                            ? item?.product_id?.product_name
                            : item?.shopByCategory?.title}

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
                        </h2>
                        {item?.product_id?.product_type === "Variable" ? (
                          <p>
                            ₹{item?.variation?.varient_price}{" "}
                            <i className="fa fa-remove"></i> {item?.quantity}
                          </p>
                        ) : (
                          <p>
                            ₹
                            {item?.product_id
                              ? item?.product_id?.selling_price
                              : item?.shopByCategory
                                  ?.product_discount_price}{" "}
                            <i className="fa fa-remove"></i> {item?.quantity}
                          </p>
                        )}
                      </div>
                    </div>
                    {index !== cartList?.length - 1 ? <hr /> : null}
                  </>
                ))
              )}

              <div className={styles.col2_divdata}>
                <hr />
                <div className={styles.totaldiv}>
                  <h3>
                    Subtotal <span>( {cartList?.length} items )</span>
                  </h3>

                  <p>₹{calculateSubTotal()}</p>
                </div>
                {/* <div className={styles.totaldiv}>
                  <h3>Savings</h3>
                  <p>-₹30</p>
                </div> */}
              </div>
              <div className={styles.col2_divdata}>
                <hr />
                <div className={styles.totaldiv}>
                  <h3>Shipping</h3>
                  <p>₹{cartListDetails?.shippingAmount}</p>
                </div>
              </div>
              <div className={styles.col2_divdata}>
                <hr />
                <div className={styles.totaldiv}>
                  <h3>Total</h3>
                  <p>₹{calculateTotal()}</p>
                </div>
              </div>
            </Col>
          </Row>
          <Row className={styles.pay_row}>
            <Col lg={7} className={styles.pay_col}>
              <div className={styles.pay_method}>
                <h4 className={styles.pay_head}>Payment Method</h4>

                <div className={styles.icon_div}>
                  <GooglePayIcon />
                  <VisaCardIcon />
                  <PaypalCardIcon />
                  <PayPassCardIcon />
                </div>
                <div className={styles.pay_input_div}>
                  <div className={styles.input_div}>
                    <label htmlFor="">Card Number</label>
                    <Input
                      type="number"
                      className={styles.form_wrapperInput}
                      placeholder="9874-6541-3210"
                    />
                  </div>
                  <div className={styles.input_div}>
                    <label htmlFor="">Card Name</label>
                    <Input
                      type="text"
                      className={styles.form_wrapperInput}
                      placeholder="HDFC Card"
                    />
                  </div>
                  <div className={styles.input_div}>
                    <label htmlFor="">Expiration Date</label>
                    <Input
                      type="text"
                      className={styles.form_wrapperInput}
                      placeholder="10/26"
                    />
                  </div>
                  <div className={styles.input_div}>
                    <label htmlFor="">CVV</label>
                    <Input
                      type="text"
                      className={styles.form_wrapperInput}
                      placeholder="852"
                    />
                  </div>
                </div>
              </div>
              <hr style={{ backgroundColor: "#E9E9E9" }} />
              <div className={styles.cashonDilevery}>
                <Input
                  type="radio"
                  name="deliviry_type"
                  value="Cash On Delivery"
                  onChange={onInputChange}
                />
                <div className={styles.cashonDilevery_div}>
                  <h2>Cash on delivery</h2>
                  <p>Pay with cash upon delivery.</p>
                </div>
              </div>
              <hr style={{ backgroundColor: "#E9E9E9" }} />
              <Button
                onClick={handleCheckout}
                className={styles.btn_of_payment}
              >
                Continue to Payment
              </Button>
            </Col>
            <Col lg={5} className={styles.pay_col2}></Col>
          </Row>
        </div>
      </div>

      {pageLoading ? <LoadingSpinner /> : ""}
    </>
  );
};

export default Checkout;
