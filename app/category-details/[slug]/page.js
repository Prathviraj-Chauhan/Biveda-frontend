import React from "react";
import axios from "axios";
import CategoryDetails from "@/components/CategoryDetails/CategoryDetails";

export async function generateStaticParams() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/admin/getShopByCategory`
  );
  const categoryList = res.data.data;

  return categoryList.map((post) => ({
    slug: post._id,
  }));
}

const Page = ({ params }) => {
  return <CategoryDetails slug={params.slug} />;
};

export default Page;
