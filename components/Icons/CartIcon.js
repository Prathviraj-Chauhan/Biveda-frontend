import React from "react";

const CartIcon = ({ isDarkTheme, goToCart, cartList, styles }) => {
  return (
    <div className={styles.cart_items} onClick={goToCart}>
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.5 2.5H4.67501C6.02501 2.5 7.0875 3.6625 6.975 5L5.9375 17.45C5.7625 19.4875 7.37499 21.2375 9.42499 21.2375H22.7375C24.5375 21.2375 26.1125 19.7625 26.25 17.975L26.925 8.60001C27.075 6.52501 25.5 4.83749 23.4125 4.83749H7.27501"
          stroke={isDarkTheme === "light" ? "black" : "white"}
          strokeWidth="1.8"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.3125 27.5C21.1754 27.5 21.875 26.8004 21.875 25.9375C21.875 25.0746 21.1754 24.375 20.3125 24.375C19.4496 24.375 18.75 25.0746 18.75 25.9375C18.75 26.8004 19.4496 27.5 20.3125 27.5Z"
          stroke={isDarkTheme === "light" ? "black" : "white"}
          strokeWidth="1.8"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.3125 27.5C11.1754 27.5 11.875 26.8004 11.875 25.9375C11.875 25.0746 11.1754 24.375 10.3125 24.375C9.44956 24.375 8.75 25.0746 8.75 25.9375C8.75 26.8004 9.44956 27.5 10.3125 27.5Z"
          stroke={isDarkTheme === "light" ? "black" : "white"}
          strokeWidth="1.8"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.25 10H26.25"
          stroke={isDarkTheme === "light" ? "black" : "white"}
          strokeWidth="1.8"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className={styles.cart_points}>
        <span>{cartList?.length || 0}</span>
      </div>
    </div>
  );
};

export default CartIcon;
