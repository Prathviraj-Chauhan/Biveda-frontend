import React, { useEffect, useState } from "react";
import styles from "./patientsinfo.module.scss";
import Image from "next/image";
import { toast } from "react-toastify";
import Images from "../../Images/Images";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryList,
  getSubCategoryList,
} from "../../../redux/actions/healthExpertActions";
import Input from "@/components/common/Input";
import { updateUserDetails } from "@/redux/actions/userActions";
import { FileDownloadIcon, FileRomveIcon } from "@/components/Icons";

const PatientsInfo = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({});
  const [filteredSubCategory, setFilteredSubCategory] = useState([]);
  const [documentImage, setDocumentImage] = useState({});
  const { isDarkTheme } = useSelector((state) => state.auth);
  const { userDetails } = useSelector((state) => state.user);
  const { categoryList, subCategoryList } = useSelector(
    (state) => state.healthExpert
  );

  useEffect(() => {
    if (userDetails) {
      setValues(userDetails);
      setDocumentImage({
        ...documentImage,
        uploaded_new_documents: userDetails?.documents,
      });
    }
  }, [userDetails]);

  useEffect(() => {
    dispatch(getCategoryList());
    dispatch(getSubCategoryList());
  }, []);

  useEffect(() => {
    if (subCategoryList) {
      setFilteredSubCategory(
        subCategoryList?.filter(
          (item) => item?.user_category_id?._id === values?.category
        )
      );
    }
  }, [subCategoryList, values?.category]);

  const handleImageChange = (e) => {
    const fname = e.target.name;

    let fieldName;
    let fileName;
    let file;

    if (fname === "uploaded_new_documents") {
      file = e.target.files;
      fieldName = e.target.name;
      const galleryImages = Array.from(file).map((image, index) => ({
        file: image,
        name: `${fieldName}.${image.name.split(".").pop()}`,
      }));

      setDocumentImage((prevImages) => ({
        ...prevImages,
        [fieldName]: galleryImages,
      }));
      return;
    }

    setDocumentImage((prevImages) => ({
      ...prevImages,
      [fieldName]: {
        file,
        name: fileName,
      },
    }));
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleRemoveDoc = (data, index) => {
    let updatedDocumentList = [...documentImage?.uploaded_new_documents];
    updatedDocumentList.splice(index, 1);
    setDocumentImage({
      ...documentImage,
      uploaded_new_documents: updatedDocumentList,
    });
  };

  const handleCreateHealthExpert = (e) => {
    e.preventDefault();

    // const formData = new FormData();

    // formData.append("first_name", values?.first_name);
    // formData.append("last_name", values?.last_name);
    // formData.append("email", values?.email);
    // formData.append("phone", values?.phone);
    // formData.append("category", values?.category);
    // formData.append("sub_category", values?.sub_category);
    // formData.append("dob", values?.dob);
    // formData.append("street_address", values?.street_address);
    // formData.append("city", values?.city);
    // formData.append("state", values?.state);
    // formData.append("postal_code", values?.postal_code);

    // if (documentImage?.uploaded_new_documents?.length === 0) {
    //   +Object.keys(documentImage).forEach((fieldName) => {
    //     const fileObject = documentImage[fieldName];
    //     if (Array.isArray(fileObject)) {
    //       fileObject.forEach((image) => {
    //         formData.append("files", image.file, image.name);
    //       });
    //     } else {
    //       formData.append("files", fileObject.file, fileObject.name);
    //     }
    //   });
    // } else {
    //   formData.append("files", documentImage?.uploaded_new_documents);
    // }

    const requestBody = {
      documentImage: {},
      first_name: values?.first_name,
      last_name: values?.last_name,
      email: values?.email,
      phone: values?.phone,
      category: values?.category,
      sub_category: values?.sub_category,
      street_address: values?.street_address,
      dob: values?.dob,
      city: values?.city,
      state: values?.state,
      postal_code: values?.postal_code,
    };

    Object.keys(documentImage).forEach((fieldName) => {
      const fileObject = documentImage[fieldName];
      if (Array.isArray(fileObject)) {
        requestBody.documentImage[fieldName] = fileObject.map((image) => ({
          file: image.file,
          name: image.name,
        }));
      } else {
        requestBody.documentImage[fieldName] = {
          file: fileObject.file,
          name: fileObject.name,
        };
      }
    });

    // Now you can send 'requestBody' as the request body

    if (!values?.first_name) {
      toast.error("Please enter your first name");
    } else if (!values?.last_name) {
      toast.error("Please enter your last name");
    } else if (!values?.email) {
      toast.error("Please enter your email");
    } else if (
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(values?.email)
    ) {
      toast.error("Please type a valid email address");
    } else if (!values?.phone) {
      toast.error("Please enter your phone number");
    } else if (!values?.category) {
      toast.error("Please enter your category");
    } else if (!values?.sub_category) {
      toast.error("Please enter your sub category");
    } else if (!values?.street_address) {
      toast.error("Please enter your  street address");
    } else if (!values?.city) {
      toast.error("Please enter your city");
    } else if (!values?.state) {
      toast.error("Please enter your state");
    } else if (!values?.postal_code) {
      toast.error("Please enter your postal code");
    } else {
      dispatch(updateUserDetails(values?._id, requestBody));
    }
  };

  return (
    <>
      <div
        className={`${styles["info_wrapper"]} ${
          isDarkTheme === "light" ? styles["lightevents_wrapper"] : null
        }`}
      >
        <h4>My Info</h4>

        <form onSubmit={handleCreateHealthExpert}>
          <div className={styles.company_info}>
            <h6>Info Details</h6>

            <div className={styles.first_div}>
              <div className={styles.label_div}>
                <label>First Name</label>
                <Input
                  type="text"
                  name="first_name"
                  value={values?.first_name}
                  onChange={onInputChange}
                />
              </div>
              <div className={styles.label_div}>
                <label>Last Name</label>
                <Input
                  type="text"
                  name="last_name"
                  value={values?.last_name}
                  onChange={onInputChange}
                />
              </div>
            </div>
            <div className={styles.first_div}>
              <div className={styles.label_div}>
                <label>Email</label>
                <Input
                  type="email"
                  name="email"
                  value={values?.email}
                  onChange={onInputChange}
                  disabled={true}
                />
              </div>
              <div className={styles.label_div}>
                <label>Phone number</label>
                <Input
                  type="number"
                  name="phone"
                  value={values?.phone}
                  onChange={onInputChange}
                  onWheel={(e) => e.target.blur()}
                />
              </div>
            </div>
            <div className={styles.first_div}>
              <div className={styles.label_div}>
                <label>Date of Birth</label>
                <Input
                  type="date"
                  name="dob"
                  className={styles.input_date}
                  value={values?.dob}
                  onChange={onInputChange}
                />
              </div>
              <div className={styles.label_div}>
                <label>Street Address </label>
                <Input
                  type="text"
                  name="street_address"
                  value={values?.street_address}
                  onChange={onInputChange}
                />
              </div>
            </div>
            <div className={styles.first_div}>
              <div className={styles.label_div}>
                <label>City </label>
                <Input
                  type="text"
                  name="city"
                  value={values?.city}
                  onChange={onInputChange}
                />
              </div>
              <div className={styles.label_div}>
                <label>State</label>
                <Input
                  type="text"
                  name="state"
                  value={values?.state}
                  onChange={onInputChange}
                />
              </div>
            </div>
            <div className={styles.first_div}>
              <div className={styles.label_div}>
                <label>Postal Code</label>
                <Input
                  type="text"
                  name="postal_code"
                  value={values?.postal_code}
                  onChange={onInputChange}
                />
              </div>
            </div>

            <h6 className="mt-5">Select Category</h6>
            <div className={styles.first_div}>
              <div className={styles.label_div}>
                <label>Select Category </label>
                <div>
                  <select
                    name="category"
                    value={values?.category}
                    onChange={onInputChange}
                  >
                    <option value="">Doctor A Consult</option>
                    {categoryList?.map((item, key) => (
                      <option key={key} value={item?._id}>
                        {item?.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={styles.label_div}>
                <label>Select Sub Category</label>
                <div>
                  <select
                    name="sub_category"
                    value={values?.sub_category}
                    onChange={onInputChange}
                  >
                    <option value="">select sub category</option>
                    {filteredSubCategory?.map((items, key) => (
                      <option key={key} value={items?._id}>
                        {items?.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <h6>Uploaded Documents</h6>
            <div className={styles.first_div}>
              <div className={styles.label_div_first}>
                <label className={styles.upload_doc}>
                  {/* <Input className="upload_file_input" type="file" />{" "} */}
                  <div className={styles.pdf_wrap}>
                    {documentImage?.uploaded_new_documents?.map((item, key) => (
                      <div className={styles.pdf_divs}>
                        <Image src={Images.pdfIcon} alt="" />
                        <span>DemoFile.PDF</span>
                        <span className={styles.cross_icon}>
                          <FileRomveIcon
                            isDarkTheme={isDarkTheme}
                            onClick={() => handleRemoveDoc(item)}
                          />
                        </span>
                      </div>
                    ))}
                  </div>
                </label>
              </div>
            </div>
            <h6>Upload New Documents</h6>
            <div className={styles.first_div}>
              <div className={styles.label_div_sec}>
                <label className={styles.upload_doc}>
                  <FileDownloadIcon />
                  Upload ID Proof{" "}
                  <Input
                    className="upload_file_input"
                    type="file"
                    name="uploaded_new_documents"
                    multiple
                    onChange={handleImageChange}
                  />{" "}
                </label>
              </div>
            </div>
          </div>

          <button type="submit" className={styles.sendmessage_btn}>
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default PatientsInfo;
