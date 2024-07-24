"use client";

import React, { useEffect, useState } from "react";
import styles from "./header.module.scss";
import Image from "next/image";
import Images from "../Images/Images";
import Link from "next/link";
import ResponsiveHeader from "./ResponsiveHeader";
import ThemeToggle from "./ThemeToggle";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  getAttibuteList,
  getBlogList,
  getCartList,
  getWishlist,
} from "../../redux/actions/productActions";
import { getUserDetails } from "../../redux/actions/userActions";
import {
  getProductCategoryList,
  getSiteSettingData,
  getTermsAndCondition,
} from "../../redux/actions/homeActions";
import {
  CartIcon,
  HemburgerIcon,
  SearchIcon,
  UserIcon,
  WishlistIcon,
} from "../Icons";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const [showNavbar, setShowNavbar] = useState(false);
  const { isDarkTheme, isAuthenticated } = useSelector((state) => state.auth);
  const { userDetails, updateUserDetails, updateUserAddress } = useSelector(
    (state) => state.user
  );
  const {
    cartList,
    removeCart,
    addWishlist,
    removeWishlist,
    addToCart,
    orderCheckout,
  } = useSelector((state) => state.product);

  useEffect(() => {
    if (userDetails?.role === "Customer") {
      dispatch(getCartList(userDetails?._id));
    }
  }, [userDetails, removeCart, addToCart, orderCheckout]);

  useEffect(() => {
    if (userDetails?.role === "Customer") {
      dispatch(getWishlist(userDetails?._id));
    }
  }, [userDetails, addWishlist, removeWishlist]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserDetails());
    }
  }, [isAuthenticated, updateUserDetails, updateUserAddress]);

  useEffect(() => {
    dispatch(getProductCategoryList());
    dispatch(getBlogList());
    dispatch(getTermsAndCondition());
    dispatch(getAttibuteList());
    dispatch(getSiteSettingData());
  }, []);

  const handleShowMenu = () => {
    setShowNavbar(!showNavbar);
  };

  const goToCart = () => {
    if (isAuthenticated) {
      router.push("/cart");
    } else {
      router.push("/registration");
      toast.error("Please login");
    }
  };

  const goToDashboard = () => {
    if (isAuthenticated) {
      if (userDetails?.role === "Customer") {
        router.push("/dashboard/my-orders");
      } else if (userDetails?.role === "HealthExpert") {
        router.push("/dashboard/expert");
      }
    } else {
      router.push("/registration");
    }
  };

  const goToWishlist = () => {
    if (isAuthenticated) {
      router.push("/dashboard/wishlist");
    } else {
      router.push("/registration");
      toast.error("Please login");
    }
  };

  return (
    <div
      className={`${styles["header_wrapper"]} ${
        isDarkTheme === "light" ? styles["light_header"] : null
      }`}
    >
      <ResponsiveHeader
        showNavbar={showNavbar}
        handleShowMenu={handleShowMenu}
        goToCart={goToCart}
        goToDashboard={goToDashboard}
        isDarkTheme={isDarkTheme}
        cartList={cartList}
      />
      <div className="container">
        <div className={styles.header_main}>
          <Link href="/">
            <div className={styles.logo}>
              <Image src={Images.logoImage} alt="" />
            </div>
          </Link>

          <ul>
            <li>
              <Link
                href="/"
                className={pathname === "/" ? styles["activeLink"] : ""}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/aboutus"
                className={pathname === "/aboutus/" ? styles["activeLink"] : ""}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className={pathname === "/blog/" ? styles["activeLink"] : ""}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className={
                  pathname === "/products/" ? styles["activeLink"] : ""
                }
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/contact-us"
                className={
                  pathname === "/contact-us/" ? styles["activeLink"] : ""
                }
              >
                Contact Us
              </Link>
            </li>
          </ul>

          <div className={styles.header_icons}>
            <SearchIcon isDarkTheme={isDarkTheme} />
            <WishlistIcon
              isDarkTheme={isDarkTheme}
              goToWishlist={goToWishlist}
            />
            <UserIcon isDarkTheme={isDarkTheme} goToDashboard={goToDashboard} />
            <CartIcon
              isDarkTheme={isDarkTheme}
              goToCart={goToCart}
              cartList={cartList}
              styles={styles}
            />
            <HemburgerIcon
              styles={styles}
              isDarkTheme={isDarkTheme}
              handleShowMenu={handleShowMenu}
            />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
