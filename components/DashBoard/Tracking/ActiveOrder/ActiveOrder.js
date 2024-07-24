import React from "react";
import styles from "./activeorder.module.scss";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { onOrderCancel, setOrderId } from "@/redux/actions/orderActions";
import EmptyComponent from "@/components/empty/EmptyComponent";
import Images from "@/components/Images/Images";
import { useRouter } from "next/navigation";

const ActiveOrder = ({ handleChangeTab, orderList }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isDarkTheme } = useSelector((state) => state.auth);
  const { attiributeList } = useSelector((state) => state.product);

  const handleCancelOrder = (id) => {
    dispatch(onOrderCancel(id));
  };

  return orderList?.length === 0 ? (
    <EmptyComponent
      heading="Your Order is empty"
      para="Create your first Order request"
      image={
        isDarkTheme === "light" ? Images.emptyOrderLight : Images.emptyOrder
      }
      isProduct={true}
    />
  ) : (
    orderList?.map((data, key) => (
      <div
        key={key}
        className={`${styles["order_row"]} ${
          isDarkTheme === "light" ? styles["lightevents__wrapper"] : null
        }`}
      >
        <div className={styles.order_detail_div1}>
          <h4>Order no: {data.order_id}</h4>
        </div>
        <div className={styles.order_detail_div2}>
          <p>
            Order Date{" "}
            <span> : {moment(data.date).format("DD MMMM YYYY")}</span>{" "}
          </p>
          <p>
            Order Status <span> : {data.order_status}</span>{" "}
          </p>
        </div>
        <div className={styles.order_detail_div2}>
          <p>
            Estimated Delivery Date{" "}
            <span>
              {" "}
              :{" "}
              {moment(data.delivery_date, "M/D/YYYYTH:mm:ss A").format(
                "DD MMMM YYYY"
              )}
            </span>{" "}
          </p>
          <p>
            Payment Method <span> : {data.delivery_type} </span>{" "}
          </p>
        </div>
        <hr className={styles.mainHr} />
        {data?.items?.map((item, index) => (
          <div key={index}>
            <div className={styles.details_data}>
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
                  <p>
                    Qty : <span>{item.quantity}</span>
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
                      <span>
                        ₹{item?.shopByCategory?.product_discount_price}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className={styles.order_detail_div1}>
          <div className={styles.details_btn}>
            <button
              className={styles.view_btn}
              onClick={() => {
                // handleChangeTab("tracks-details");
                // dispatch(setOrderId(data._id));
                router.push(`/dashboard/tracks-details/?id=${data._id}`);
              }}
            >
              View Details
            </button>
            {data?.order_status === "cancelled" ? null : (
              <button
                className={styles.cancel_btn}
                onClick={() => handleCancelOrder(data._id)}
              >
                Cancel
              </button>
            )}
          </div>
          <h4 className={styles.totalCost}>
            Total Price: <span>₹{data.totalCost}</span>
          </h4>
        </div>
      </div>
    ))
  );
};

export default ActiveOrder;
