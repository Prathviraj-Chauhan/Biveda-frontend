"use client";

import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Header from "@/components/Header/Header";
import Footer from "@/components/footer/Footer";
import TostifyContainer from "@/components/TostifyContainer/TostifyContainer";
import ScrollToTop from "react-scroll-to-top";

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <TostifyContainer />
      <Header />
      {children}
      <Footer />
      <ScrollToTop smooth className="scroll_top_icon" />
    </Provider>
  );
};

export default Providers;
