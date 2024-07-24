import React, { useEffect, useState } from "react";
import styles from "./track.module.scss";
import { Row } from "react-bootstrap";
import Feedback from "./Feedback";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import FeedbackPopup from "@/components/Popups/FeedbackPopup";
import { getOrderDetails } from "@/redux/actions/orderActions";
import { getFeedbackList } from "@/redux/actions/feedbackActions";

const TrackYourOrder = ({ handleChangeTab, setOpenPopup }) => {
  const dispatch = useDispatch();
  const [orderId, setOrderId] = useState();
  const { isDarkTheme } = useSelector((state) => state.auth);
  const { orderDetails } = useSelector((state) => state.order);
  const { attiributeList } = useSelector((state) => state.product);
  const { applyFeedback } = useSelector((state) => state.feedback);

  useEffect(() => {
    if (typeof window !== undefined) {
      const url = window.location.href;
      const params = new URLSearchParams(url?.split("?")[1]);
      const token = params.get("id");
      setOrderId(token);
    }
  }, []);

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [orderId]);

  useEffect(() => {
    if (orderDetails) {
      dispatch(
        getFeedbackList(
          orderDetails?.user_id?._id,
          orderDetails?.healthExpertId._id
        )
      );
    }
  }, [orderDetails, applyFeedback]);

  return (
    <>
      <div
        className={`${styles["tracker_wrapper"]} ${
          isDarkTheme === "light" ? styles["lightevents_wrapper"] : null
        }`}
      >
        <h4 onClick={() => handleChangeTab("my-orders")}>
          <i className="fa fa-chevron-left" aria-hidden="true"></i>
          Order Details
        </h4>
        <Row className={styles.order_row}>
          <div className={styles.order_detail_div1}>
            <h4>Order no: {orderDetails?.order_id}</h4>
          </div>
          <div className={styles.order_detail_div2}>
            <p>
              Order Date{" "}
              <span>
                {" "}
                : {moment(orderDetails?.date).format("DD MMMM YYYY")}
              </span>{" "}
            </p>
            <p>
              Order Status <span> : {orderDetails?.order_status}</span>{" "}
            </p>
          </div>
          <div className={styles.order_detail_div2}>
            <p>
              Estimated Delivery Date{" "}
              <span>
                {" "}
                :{" "}
                {moment(
                  orderDetails?.delivery_date,
                  "M/D/YYYYTH:mm:ss A"
                ).format("DD MMMM YYYY")}
              </span>{" "}
            </p>
            <p>
              Payment Method
              <span> : {orderDetails?.delivery_type} </span>{" "}
            </p>
          </div>
        </Row>

        <div className={styles.trackproress_div}>
          <div className={styles.trackproress}>
            {orderDetails?.tracking_status?.map((item, index) =>
              item.status ? (
                <div className={styles.div_span_data} key={index}>
                  <div className={styles.trackproress_complete}></div>
                  <span>{item.title}</span>
                </div>
              ) : (
                <div className={styles.div_span_data} key={index}>
                  <div className={styles.trackproress_process}>
                    <div className={styles.process_inprocess}></div>
                  </div>
                  <span>{item.title}</span>
                </div>
              )
            )}
            {/* 
            <div className={styles.div_span_data}>
              <div className={styles.trackproress_waiting}></div>
              <span>shipped</span>
            </div>
            <div className={styles.div_span_data}>
              <div className={styles.trackproress_waiting}></div>
              <span>Delivered</span>
            </div> */}
          </div>
        </div>
        <Row className={styles.order_row}>
          {orderDetails?.items?.map((item, key) => (
            <div className={styles.details_data} key={key}>
              <div className={styles.img_of_active_div}>
                <div className={styles.img_divs_main}>
                  {item?.product_id ? (
                    <img src={item?.product_id?.product_image} alt="" />
                  ) : (
                    <img src={item?.shopByCategory?.product_image} alt="" />
                  )}
                </div>
                <div className={styles.product_info}>
                  <h6 className={styles.product_title}>
                    {item?.product_id
                      ? item?.product_id?.product_name
                      : item?.shopByCategory?.title}
                  </h6>
                  <p className="text-capitalize">
                    {item?.product_id
                      ? item?.product_id?.product_type === "Variable"
                        ? attiributeList
                            ?.filter((attribute) =>
                              Object.keys(item?.variation)?.includes(
                                attribute.title
                              )
                            )
                            ?.map((attr, key) => (
                              <React.Fragment key={key}>
                                {item.variation[attr.title]?.name} :{" "}
                                <span>
                                  {item.variation[attr.title]?.label},{" "}
                                </span>
                              </React.Fragment>
                            ))
                        : null
                      : item?.shopByCategory?.product_id?.map(
                          (product, key) => (
                            <span key={key}>{product?.product_name}, </span>
                          )
                        )}
                  </p>
                </div>
              </div>
              <div className={styles.qty_div}>
                <p>
                  Qty : <span> {item.quantity}</span>
                </p>
                <p>
                  Total:{" "}
                  {item?.product_id ? (
                    item?.product_id?.product_type === "Variable" ? (
                      <span>₹{item?.variation?.varient_price}</span>
                    ) : (
                      <span>₹{item?.product_id?.selling_price}</span>
                    )
                  ) : (
                    <span>₹{item?.shopByCategory?.product_discount_price}</span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </Row>

        <div className={styles.btns_div}>
          <button className={styles.health_btn}>Chat with health expert</button>
          <button
            className={styles.feedback_btn}
            onClick={() =>
              setOpenPopup(
                <FeedbackPopup
                  orderDetails={orderDetails}
                  setPopup={setOpenPopup}
                />
              )
            }
          >
            Send Feedback
          </button>
          <button className={styles.zoom_btn}>Create Zoom Meeting</button>
        </div>
        <Feedback />
      </div>
    </>
  );
};

export default TrackYourOrder;
