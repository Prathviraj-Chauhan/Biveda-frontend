import React from "react";
import styles from "./smallcard.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAddress } from "../../../redux/actions/userActions";

const SmallAddressCard = ({ addressList, handleChangeTab }) => {
  const dispatch = useDispatch();
  const { isDarkTheme } = useSelector((state) => state.auth);
  const { userDetails } = useSelector((state) => state.user);

  const handleRemoveAddress = (item) => {
    const searchParams = new URLSearchParams();
    searchParams.append("operation", "remove");

    const data = {
      address: [
        {
          _id: item._id,
        },
      ],
    };

    dispatch(updateUserAddress(userDetails?._id, searchParams, data));
  };

  return (
    <>
      {addressList?.map((data, key) => (
        <div
          key={key}
          className={`${styles["smallcard_wrapper"]} ${
            isDarkTheme === "light" ? styles["lightevents_wrapper"] : null
          }`}
        >
          <h4>
            {data.first_name} {data.last_name}
          </h4>
          <p>
            {data.country_name}, {data.state}, {data.city},{" "}
            {data.street_address} {data.apt_suite_unit} {data.postal_code}
          </p>
          <h6>{data.address_phone}</h6>
          <div className={styles.smallcard_btns}>
            {data.default_billing_address ? (
              <span>Default billing address</span>
            ) : (
              <span>Home</span>
            )}
          </div>
          <div className={styles.smallcardparadiv}>
            <p
              className={styles.smallcardpara1}
              onClick={() => handleRemoveAddress(data)}
            >
              Remove
            </p>{" "}
            |{" "}
            <p
              className={styles.smallcardpara1}
              onClick={() => {
                handleChangeTab("addaddress", data);
              }}
            >
              Edit
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default SmallAddressCard;
