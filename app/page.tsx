import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import ScrollBtn from "@/components/ScrollBtn";
import BlogMainWrapper from "@/components/BlogMainPageWrapper";
import PopularWrapper from "@/components/PopularWrapper";
import { Metadata } from "next";
import { getGlobal } from "./api/getGlobal/api";

export async function generateMetadata(): Promise<Metadata> {
  const global = await getGlobal();
  return {
    title: global.data.siteName || "Главная",
    description: global.data.siteDescription || "",
    keywords: global.data.defaultSeo.metaKeys || [],
    openGraph: {
      title: global.data.siteName || "Главная",
      description: global.data.siteDescription || "",
    },
  };
}

const PopularArticles = dynamic(() => import("@/components/PopularArticles"), {
  ssr: true,
  loading: () => <div>Загрузка...</div>,
});
const Brands = dynamic(() => import("@/components/Brands"), {
  ssr: true,
  loading: () => <div>Загрузка...</div>,
});
const Subscription = dynamic(
  () => import("@/components/Subscription/Subscription"),
  {
    ssr: true,
    loading: () => <div>Загрузка...</div>,
  }
);

export default function Home() {
  return (
    <>
      <Hero />
      <PopularWrapper />
      <BlogMainWrapper />
      <PopularArticles />
      <Brands />
      <Subscription />
      <ScrollBtn />
    </>
  );
}
