import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAboutUsData,
  getConsultationDetails,
  getShopByCategoryList,
} from "../../redux/actions/homeActions";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import {
  AboutUs,
  Consultation,
  HomeBanner,
  LatestEvents,
  LatestNews,
  OurProduct,
  ShopByCategory,
  ShopByGoal,
} from "./index";

const Home = () => {
  const dispatch = useDispatch();
  const { pageLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getShopByCategoryList());
    dispatch(getConsultationDetails());
    dispatch(getAboutUsData());
  }, []);

  return (
    <>
      <HomeBanner />
      <AboutUs />
      <ShopByCategory />
      <Consultation />
      <OurProduct />
      <ShopByGoal />
      <LatestEvents />
      <LatestNews />

      {pageLoading ? <LoadingSpinner /> : ""}
    </>
  );
};

export default Home;
