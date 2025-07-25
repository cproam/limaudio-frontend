import Breadcrumbs from "@/components/Breadcrumbs";
import ScrollBtn from "@/components/ScrollBtn";
import { INDEX, BRANDS } from "@/lib/breadcrumbs";
import { notFound } from "next/navigation";
import Subscription from "@/components/Subscription/Subscription";
import BrandText from "@/components/BrandText";
import PopularArticles from "@/components/PopularArticles";
import { getBrandsBySlug } from "@/app/api/brands/api";
import BlogMainPageWrapper from "@/components/BlogMainPageWrapper";
import { Metadata } from "next";
import BrandArticles from "@/components/BrandArticles";

// Define the expected shape of params
interface Params {
  slug: string;
}

// Generate metadata for the page
export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const params = await paramsPromise; // Await the params

  // Validate params.slug
  if (!params?.slug) {
    return {
      title: "Brand Not Found",
      description: "No brand found for the given slug.",
    };
  }

  const content = await getBrandsBySlug(params.slug);

  // Handle case where content is not found
  if (!content) {
    return {
      title: "Brand Not Found",
      description: "No brand found for the given slug.",
    };
  }

  return {
    title: content.seo?.metaTitle || content.title || "Brand",
    description: content.seo?.metaDescription || content.description || "",
    keywords: content.title ? [content.title] : [""],
    openGraph: {
      title: content.seo?.metaTitle || content.title || "Brand",
      description: content.seo?.metaDescription || content.description || "",
    },
  };
}

// Page component
export default async function BrandsPage({
  params: paramsPromise,
}: {
  params: Promise<Params>;
}) {
  const params = await paramsPromise; // Await the params

  // Validate params.slug
  if (!params?.slug) {
    notFound();
  }

  const content = await getBrandsBySlug(params.slug);

  // Handle case where content is not found
  if (!content) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Главная", href: INDEX },
    { label: "Бренды", href: BRANDS },
    {
      label: content.title || "Brand",
      href: "",
      isActive: true,
    },
  ];

  return (
    <>
      <div className="container" style={{ width: "100%" }}>
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <BrandText content={content} />
      <div style={{ display: "none" }}>
        <BlogMainPageWrapper />
      </div>
      <BrandArticles slug={content.slug} brand={content.title} />
      <PopularArticles />
      <Subscription />
      <ScrollBtn />
    </>
  );
}
