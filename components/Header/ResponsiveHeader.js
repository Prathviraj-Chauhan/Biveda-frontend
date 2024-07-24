import React from "react";
import styles from "./responsiveheader.module.scss";
import Image from "next/image";
import Images from "../Images/Images";
import Link from "next/link";
import { CartIcon, SearchIcon, UserIcon, WishlistIcon } from "../Icons";
import { usePathname } from "next/navigation";

const ResponsiveHeader = ({
  showNavbar,
  handleShowMenu,
  goToCart,
  goToDashboard,
  isDarkTheme,
  cartList,
}) => {
  const pathname = usePathname();

  return (
    <div
      className={`${styles.mobile_wrapper} ${
        showNavbar && styles.active_navbar
      }`}
    >
      <div className={styles.logo_header}>
        <Link href="/">
          <Image src={Images.logoImage} alt="" onClick={handleShowMenu} />
        </Link>
        <Image src={Images.removeIcon} alt="" onClick={handleShowMenu} />
      </div>
      <ul>
        <li>
          <Link
            href="/"
            onClick={handleShowMenu}
            className={pathname === "/" ? styles["activeLink"] : ""}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/aboutus"
            onClick={handleShowMenu}
            className={pathname === "/aboutus/" ? styles["activeLink"] : ""}
          >
            About Us
          </Link>
        </li>
        <li>
          <Link
            href="/blog"
            onClick={handleShowMenu}
            className={pathname === "/blog/" ? styles["activeLink"] : ""}
          >
            Blog
          </Link>
        </li>
        <li>
          <Link
            href="/products"
            onClick={handleShowMenu}
            className={pathname === "/products/" ? styles["activeLink"] : ""}
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            href="/contact-us"
            onClick={handleShowMenu}
            className={pathname === "/contact-us/" ? styles["activeLink"] : ""}
          >
            Contact Us
          </Link>
        </li>
      </ul>{" "}
      <div className={styles.header_icons}>
        <SearchIcon isDarkTheme={isDarkTheme} />
        <WishlistIcon isDarkTheme={isDarkTheme} />
        <UserIcon isDarkTheme={isDarkTheme} goToDashboard={goToDashboard} />
        <CartIcon
          isDarkTheme={isDarkTheme}
          goToCart={goToCart}
          cartList={cartList}
          styles={styles}
        />
      </div>
    </div>
  );
};

export default ResponsiveHeader;
