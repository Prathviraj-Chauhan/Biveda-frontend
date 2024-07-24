import React from "react";
import axios from "axios";
import BlogDetails from "@/components/BlogDetails/BlogDetails";

export async function generateStaticParams() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/admin/getBlog`
  );
  const blogList = res.data.data;

  return blogList.map((post) => ({
    slug: post._id,
  }));
}

const Page = ({ params }) => {
  return <BlogDetails slug={params.slug} />;
};

export default Page;
