import React, { useEffect, useState } from "react";
import styles from "./myinfo.module.scss";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from "../../../redux/actions/userActions";
import ChangePasswordPopup from "../../Popups/ChangePasswordPopup";
import SmallAddressCard from "../smallAddressCard/SmallAddressCard";
import Input from "@/components/common/Input";

const MyInformation = ({ handleChangeTab, setOpenPopup }) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({});
  const { isDarkTheme } = useSelector((state) => state.auth);
  const { userDetails } = useSelector((state) => state.user);

  useEffect(() => {
    if (userDetails) {
      setValues(userDetails);
    }
  }, [userDetails]);

  const onInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleUpdateUserDetails = () => {
    const data = {
      first_name: values?.first_name,
      last_name: values?.last_name,
      phone: values?.phone,
    };
    dispatch(updateUserDetails(userDetails?._id, data));
  };

  return (
    <>
      <div
        className={`${styles["info_wrapper"]} ${
          isDarkTheme === "light" ? styles["lightevents_wrapper"] : null
        }`}
      >
        <div className={styles.company_info}>
          <h4>My Info</h4>
          <div className={styles.label_div}>
            <label>First Name</label>
            <div className={styles.field_div}>
              <Input
                type="text"
                name="first_name"
                value={values?.first_name}
                onChange={onInputChange}
              />
              <h4 onClick={handleUpdateUserDetails}>Change</h4>
            </div>
          </div>
          <div className={styles.label_div}>
            <label>Last Name</label>
            <div className={styles.field_div}>
              <Input
                type="text"
                name="last_name"
                value={values?.last_name}
                onChange={onInputChange}
              />
              <h4 onClick={handleUpdateUserDetails}>Change</h4>
            </div>
          </div>
          <div className={styles.label_div}>
            <label>Email Address</label>
            <div className={styles.field_div}>
              <Input type="email" name="email" value={values?.email} disabled />
            </div>
          </div>
          <div className={styles.label_div}>
            <label>Phone Number</label>
            <div className={styles.field_div}>
              <Input
                type="number"
                name="phone"
                value={values?.phone}
                onChange={onInputChange}
                onWheel={(e) => e.target.blur()}
              />
              <h4 onClick={handleUpdateUserDetails}>Change</h4>
            </div>
          </div>
          <div className={styles.label_div}>
            <label>Password</label>
            <div className={styles.field_div}>
              <Input type="text" placeholder="****************" />
              <h4
                onClick={() =>
                  setOpenPopup(<ChangePasswordPopup setPopup={setOpenPopup} />)
                }
              >
                Change
              </h4>
            </div>
          </div>
          <div className={styles.member_div}>
            <h3>Address</h3>
            <Button onClick={() => handleChangeTab("addaddress")}>
              Add New
            </Button>
          </div>
          <div className={styles.addrsscard}>
            <SmallAddressCard
              addressList={userDetails?.address}
              handleChangeTab={handleChangeTab}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyInformation;
