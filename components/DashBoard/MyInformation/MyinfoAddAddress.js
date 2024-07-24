import React, { useEffect, useState } from "react";
import styles from "./myinfo.module.scss";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Input from "@/components/common/Input";
import TextArea from "@/components/common/TextArea";
import { updateUserAddress } from "@/redux/actions/userActions";

const MyinfoAddAddress = ({ handleChangeTab }) => {
  const dispatch = useDispatch();
  const [addressValues, setAddressValues] = useState({
    first_name: "",
    last_name: "",
    country_name: "",
    street_address: "",
    apt_suite_unit: "",
    city: "",
    state: "",
    postal_code: "",
    address_phone: "",
    delivery_instruction: "",
    default_billing_address: false,
    default_shipping_address: false,
  });
  const { isDarkTheme } = useSelector((state) => state.auth);
  const { userDetails, addressDetails } = useSelector((state) => state.user);

  useEffect(() => {
    if (addressDetails) {
      setAddressValues(addressDetails);
    }
  }, [addressDetails]);

  const onInputChange = (e) => {
    const { name, value, checked } = e.target;
    setAddressValues({ ...addressValues, [name]: value });
    if (
      name === "default_billing_address" ||
      name === "default_shipping_address"
    ) {
      if (checked) {
        setAddressValues({ ...addressValues, [name]: true });
      } else {
        setAddressValues({ ...addressValues, [name]: false });
      }
    }
  };

  const handleAddAddress = () => {
    const searchParams = new URLSearchParams();

    if (addressDetails?._id) {
      searchParams.append("operation", "update");
    } else {
      searchParams.append("operation", "add");
    }

    let data = {};

    if (addressDetails?._id) {
      data = {
        address: [
          {
            ...addressValues,
          },
        ],
      };
    } else {
      data = {
        address: [
          {
            ...addressValues,
          },
        ],
      };
    }

    const requiredFields = [
      "first_name",
      "last_name",
      "address_phone",
      "country_name",
      "state",
      "city",
      "street_address",
      "apt_suite_unit",
      "postal_code",
      "delivery_instruction",
    ];

    const missingField = requiredFields.find(
      (field) => !addressValues?.[field]
    );

    if (missingField) {
      toast.error(`Please enter your ${missingField.replace("_", " ")}`);
    } else {
      dispatch(
        updateUserAddress(userDetails?._id, searchParams, data, handleChangeTab)
      );
    }
  };

  return (
    <>
      <div
        className={`${styles["myinfoAddAddress_wrapper"]} ${
          isDarkTheme === "light" ? styles["lightevents_wrapper1"] : null
        }`}
      >
        <div className={styles.company_info}>
          <h4 onClick={() => handleChangeTab("information")}>
            <i className="fa fa-chevron-left" aria-hidden="true"></i>
            My Info
          </h4>
          <div className={styles.member_form1}>
            <div className={styles.label_divs}>
              <label>
                First Name <span>*</span>
              </label>
              <Input
                type="text"
                placeholder="First Name"
                className={styles.inputmember}
                name="first_name"
                value={addressValues?.first_name}
                onChange={onInputChange}
              />
            </div>
            <div className={styles.label_divs}>
              <label>
                Last Name <span>*</span>
              </label>
              <Input
                type="text"
                placeholder="Last Name"
                className={styles.inputmember}
                name="last_name"
                value={addressValues?.last_name}
                onChange={onInputChange}
              />
            </div>
          </div>
          <div className={styles.member_form1}>
            <div className={styles.label_divs}>
              <label>
                Phone <span>*</span>
              </label>
              <Input
                type="number"
                placeholder="Phone"
                className={styles.inputmember}
                name="address_phone"
                value={addressValues?.address_phone}
                onWheel={(e) => e.target.blur()}
                onChange={onInputChange}
              />
            </div>
            <div className={styles.label_divs}>
              <label>
                Country Name <span>*</span>
              </label>
              <Input
                type="text"
                placeholder="Country Name"
                className={styles.inputmember}
                name="country_name"
                value={addressValues?.country_name}
                onChange={onInputChange}
              />
            </div>
          </div>
          <div className={styles.member_form1}>
            <div className={styles.label_divs}>
              <label>
                State <span>*</span>
              </label>
              <Input
                type="text"
                placeholder="State"
                className={styles.inputmember}
                name="state"
                value={addressValues?.state}
                onChange={onInputChange}
              />
            </div>
            <div className={styles.label_divs}>
              <label>
                City <span>*</span>
              </label>
              <Input
                type="text"
                placeholder="Town / City"
                className={styles.inputmember}
                name="city"
                value={addressValues?.city}
                onChange={onInputChange}
              />
            </div>
          </div>
          <div className={styles.member_form1}>
            <div className={styles.label_divs}>
              <label>
                Street Address <span>*</span>
              </label>
              <Input
                type="text"
                placeholder="House number and street name"
                className={styles.inputmember}
                name="street_address"
                value={addressValues?.street_address}
                onChange={onInputChange}
              />
            </div>
            <div className={styles.label_divs}>
              <label>
                Apt, suite unit <span>*</span>
              </label>
              <Input
                type="text"
                placeholder="apartment suite"
                className={styles.inputmember}
                name="apt_suite_unit"
                value={addressValues?.apt_suite_unit}
                onChange={onInputChange}
              />
            </div>
          </div>
          <div className={styles.member_form1}>
            <div className={styles.label_divs}>
              <label>
                Postal Code <span>*</span>
              </label>
              <Input
                type="text"
                placeholder="Postal Code"
                className={styles.inputmember}
                name="postal_code"
                value={addressValues?.postal_code}
                onChange={onInputChange}
              />
            </div>
          </div>
          <div className={styles.member_form1_textarea}>
            <div className={styles.label_divs_textarea}>
              <label>Delivery Instruction</label>
              <div>
                <TextArea
                  rows="5"
                  placeholder="Delivery Instruction"
                  name="delivery_instruction"
                  value={addressValues?.delivery_instruction}
                  onChange={onInputChange}
                ></TextArea>
              </div>
            </div>
          </div>
          <div className={styles.checkbpx_wrapper_div}>
            <div className="checkbox check_transparent">
              <div className={styles.checkbox_wrapper}>
                <Input
                  type="checkbox"
                  id="cutOfCheckbox"
                  className={styles.custom_checkbox}
                  name="default_billing_address"
                  value={addressValues?.default_billing_address}
                  checked={
                    addressValues?.default_billing_address ? true : false
                  }
                  onChange={onInputChange}
                />
                <label htmlFor="cutOfCheckbox">
                  Set as default Billing address
                </label>
              </div>
            </div>
            <div className="checkbox check_transparent">
              <div className={styles.checkbox_wrapper}>
                <Input
                  type="checkbox"
                  id="cutOfCheckbox1"
                  className={styles.custom_checkbox}
                  name="default_shipping_address"
                  checked={
                    addressValues?.default_shipping_address ? true : false
                  }
                  onChange={onInputChange}
                />
                <label htmlFor="cutOfCheckbox1">
                  Set as default shipping address
                </label>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className={styles.savebtn_div}>
              <Button className={styles.savebtn1} onClick={handleAddAddress}>
                Save
              </Button>
              <Button
                className={styles.savebtn2}
                onClick={() => handleChangeTab("information")}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyinfoAddAddress;
