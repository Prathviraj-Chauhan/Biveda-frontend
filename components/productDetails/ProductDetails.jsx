"use client";

import React, { useEffect, useState } from "react";
import Banner from "../banner/Banner";
import styles from "./productdetails.module.scss";
import Image from "next/image";
import Images from "../Images/Images";
import ProductImageGallery from "./ProductImageGallery";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetails,
  onAddToCart,
  setBuyNowProductDetails,
} from "../../redux/actions/productActions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import {
  CommentIcon,
  FreeShippingIcon,
  RatingIcon,
  SecurePaymentIcon,
  ShippingReturnIcon,
  SizeFitIcon,
} from "../Icons";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import QuestionAnswer from "./QuestionAnswer";

const ProductDetails = ({ slug }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const { isDarkTheme, isAuthenticated, pageLoading } = useSelector(
    (state) => state.auth
  );
  const { productDetails } = useSelector((state) => state.product);
  const { userDetails } = useSelector((state) => state.user);

  useEffect(() => {
    // if (typeof window !== undefined) {
    //   const url = window.location.href;
    //   const params = new URLSearchParams(url?.split("?")[1]);
    //   const slug = params.get("slug");
    if (slug) {
      dispatch(getProductDetails(slug));
    }
    // }
  }, [slug]);

  const handleAddToCart = () => {
    if (isAuthenticated) {
      if (productDetails?.product_type === "Variable") {
        if (!getSelectedVariant()?.id) {
          toast.error("Please select variant");
        } else {
          const data = {
            user_id: userDetails?._id,
            product_id: productDetails?._id,
            variation: getSelectedVariant(),
            quantity: quantity,
          };

          dispatch(onAddToCart(data));
        }
      } else {
        const data = {
          user_id: userDetails?._id,
          product_id: productDetails?._id,
          quantity: quantity,
        };

        dispatch(onAddToCart(data));
      }
    } else {
      router.push("/registration");
      toast.error("Please login!");
    }
  };

  const handleBuyNow = () => {
    if (isAuthenticated) {
      if (productDetails?.product_type === "Variable") {
        if (!getSelectedVariant()?.id) {
          toast.error("Please select variant");
        } else {
          const data = {
            ...productDetails,
            quantity: quantity,
            isBuyNowProduct: true,
            variation: getSelectedVariant(),
          };
          dispatch(setBuyNowProductDetails(data, router));
        }
      } else {
        const data = {
          ...productDetails,
          quantity: quantity,
          isBuyNowProduct: true,
        };
        dispatch(setBuyNowProductDetails(data, router));
      }
    } else {
      router.push("/registration");
      toast.error("Please login!");
    }
  };

  const hanleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const hanleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAttributeSelect = (attr, value) => {
    setSelectedAttributes((prev) => ({ ...prev, [attr]: value }));
  };

  const getSelectedVariant = () => {
    return productDetails?.object?.find((variant) =>
      productDetails?.attribute?.every(
        (attr) => variant[attr].label === selectedAttributes[attr]
      )
    );
  };

  const handleChangeTab = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <>
      <Banner text="Product Details" />
      <div
        className={`${styles["productdetails_wrapper"]} ${
          isDarkTheme === "light" ? styles["light_productdetails"] : null
        }`}
      >
        <div className="container">
          <div className={styles.productdetails_main}>
            <div className={styles.product_image_gallery}>
              <ProductImageGallery />
            </div>
            <div className={styles.product_info_wrapper}>
              <div className={styles.product_breadcrumbs}>
                <Link href="/products" className="text-decoration-none">
                  <span>Shop</span>
                </Link>
                <i className="fa fa-chevron-right" aria-hidden="true"></i>
                <span>{productDetails?.product_name}</span>
                {/* <i className="fa fa-chevron-right" aria-hidden="true"></i>
                <span>Top</span> */}
              </div>
              <h4 className={styles.product_title}>
                {productDetails?.product_name}
              </h4>

              {productDetails?.attribute?.map((attr) => (
                <div key={attr} className={styles.product_sizes}>
                  <h6 className={styles.product_sizes_title}>Select {attr}</h6>
                  <ul>
                    {[
                      ...new Set(
                        productDetails?.object?.map(
                          (variant) => variant[attr].label
                        )
                      ),
                    ].map((label) => (
                      <li
                        key={label}
                        onClick={() => handleAttributeSelect(attr, label)}
                        className={
                          selectedAttributes[attr] === label
                            ? styles.active_product
                            : ""
                        }
                      >
                        {label}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className={styles.product_prizes}>
                {productDetails?.product_type === "Variable" ? (
                  <h6 className={styles.product_prize}>
                    ₹{getSelectedVariant()?.varient_price || 0}
                  </h6>
                ) : (
                  <h6 className={styles.product_prize}>
                    ₹{Number(productDetails?.selling_price)}
                  </h6>
                )}

                <div className={styles.product_qty}>
                  <button onClick={hanleDecrement}>-</button>
                  <span>{quantity}</span>
                  <button onClick={hanleIncrement}>+</button>
                </div>
              </div>
              <div className={styles.product_buttons}>
                <button onClick={handleAddToCart}>Add to Cart</button>
                <button onClick={handleBuyNow}>Buy Now</button>
              </div>
              <div className={styles.product_line}></div>
              <ul className={styles.product_shipping_type}>
                {productDetails?.tags
                  ?.filter((item) => item.status === "Active")
                  .map((tags, key) => (
                    <li key={key}>
                      <SecurePaymentIcon />
                      <span>{tags.title}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className={styles.product_desc_wrapper}>
            <div className={styles.product_desc_heading}>
              <div className={styles.product_desc_line}></div>
              <h6>Product Description</h6>
            </div>
            <ul>
              <li
                className={currentTab === 0 && styles.active_tab}
                onClick={() => handleChangeTab(0)}
              >
                Description
              </li>
              {/* <li>
                User comments <span>21</span>
              </li> */}
              <li
                className={currentTab === 1 && styles.active_tab}
                onClick={() => handleChangeTab(1)}
              >
                Question & Answer <span>{productDetails?.qa?.length}</span>
              </li>
            </ul>
            {currentTab === 0 ? (
              <p
                className={styles.product_desc}
                dangerouslySetInnerHTML={{
                  __html: productDetails?.product_description,
                }}
              ></p>
            ) : currentTab === 1 ? (
              <QuestionAnswer questionList={productDetails?.qa} />
            ) : null}
          </div>
          <div className={styles.related_products}>
            <h1 className={styles.related_title}>Related Products</h1>
            <div className={styles.products_wrap}>
              <div className={styles.products_wrap_info}>
                <div className={styles.products_wrap_info_img}>
                  <Image src={Images.preworkout} alt="" />
                </div>
                <div className={styles.products_wrap_info_prices}>
                  <h4>Pre-Workout</h4>
                  <span>$19.00</span>
                </div>
              </div>
              <div className={styles.products_wrap_info}>
                <div className={styles.products_wrap_info_img}>
                  <Image src={Images.preworkout} alt="" />
                </div>
                <div className={styles.products_wrap_info_prices}>
                  <h4>Vitamin Protean</h4>
                  <span>$19.00</span>
                </div>
              </div>
              <div className={styles.products_wrap_info}>
                <div className={styles.products_wrap_info_img}>
                  <Image src={Images.preworkout} alt="" />
                </div>
                <div className={styles.products_wrap_info_prices}>
                  <h4>Rival Nutrition</h4>
                  <span>$19.00</span>
                </div>
              </div>
              <div className={styles.products_wrap_info}>
                <div className={styles.products_wrap_info_img}>
                  <Image src={Images.preworkout} alt="" />
                </div>
                <div className={styles.products_wrap_info_prices}>
                  <h4>Pre-Workout</h4>
                  <span>$19.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {pageLoading ? <LoadingSpinner /> : ""}
    </>
  );
};

export default ProductDetails;

{
  /* <div className={styles.product_ratings}>
               <ul>
                  <li>
                    <RatingIcon />
                  </li>
                  <li>
                    <RatingIcon />
                  </li>
                  <li>
                    <RatingIcon />
                  </li>
                  <li>
                    <RatingIcon />
                  </li>
                  <li>
                    <RatingIcon />
                  </li>
                </ul>
                <span className={styles.rating_count}>3.5</span>
                <span className={styles.comment_count}>
                  <CommentIcon />
                  <h6>120 comment</h6>
                </span>
              </div> */
}
{
  /* 
              <div className={styles.product_sizes}>
                <h6 className={styles.product_sizes_title}>Select Size</h6>
                <ul>
                  <li>label</li>
                  <li>label</li>
                  <li>label</li>
                  <li>label</li>
                </ul>
              </div> */
}

{
  /* <li>
                  <SizeFitIcon />
                  <span>Size & Fit</span>
                </li>
                <li>
                  <FreeShippingIcon />
                  <span>Free shipping</span>
                </li>
                <li>
                  <ShippingReturnIcon />
                  <span>Free Shipping & Return</span>
                </li> */
}

{
  /* {productDetails?.attribute?.map((attribute, key) => (
                <div className={styles.product_sizes} key={key}>
                  <h6 className={styles.product_sizes_title}>
                    Select {attribute}
                  </h6>
                  <ul>
                    {Array.from(
                      new Set(
                        productDetails?.object?.map(
                          (variant) => variant[attribute].label
                        )
                      )
                    ).map((label, uniqueKey) => (
                      <li
                        key={uniqueKey}
                        className={
                          productDetails?.object?.some(
                            (variant) =>
                              variant[attribute].label === label &&
                              variant[attribute].value ===
                                varientDetails[attribute]?.value
                          )
                            ? styles["active_product"]
                            : ""
                        }
                        onClick={() => handleSelectVariant(attribute, label)}
                      >
                        {label}
                      </li>
                    ))}
                  </ul>
                </div>
              ))} */
}

{
  /* <div className={styles.product_sizes}>
                <h6 className={styles.product_sizes_title}>
                  Select{" "}
                  {productDetails?.attribute?.map((item) => item).join(", ")}
                </h6>
                <ul>
                  {productDetails?.object?.map((variant, key) => (
                    <li
                      key={key}
                      className={
                        variant.id === varientDetails.id
                          ? styles["active_product"]
                          : ""
                      }
                      onClick={() => handleSelectVariant(variant)}
                    >
                      {`${variant.flavor.label} - ${variant.color.label} - ${variant.weight.label}`}
                    </li>
                  ))}
                </ul>
              </div> */
}
