import UserDashboard from "@/components/DashBoard/UserDashBoard/UserDashboard";
import React from "react";

export async function generateStaticParams() {
  const posts = [
    { slug: "my-orders" },
    { slug: "expert" },
    { slug: "my-patients" },
    { slug: "patient-info" },
    { slug: "information" },
    { slug: "wishlist" },
    { slug: "tracks-details" },
    { slug: "patients-details" },
    { slug: "chart-plan" },
    { slug: "diet-plan" },
    { slug: "addaddress" },
    { slug: "subscription" },
  ];

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

const Page = ({ params }) => {
  const { slug } = params;

  return <UserDashboard slug={slug} />;
};

export default Page;
