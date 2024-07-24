import React from "react";
import axios from "axios";
import ProductDetails from "@/components/productDetails/ProductDetails";

export async function generateStaticParams() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/product/getProductList`
  );
  const productList = res.data.data;

  return productList.map((post) => ({
    slug: post._id,
  }));
}

const Page = ({ params }) => {
  return <ProductDetails slug={params.slug} />;
};

export default Page;
