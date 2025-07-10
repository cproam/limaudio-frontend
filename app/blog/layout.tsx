import Brands from "@/components/Brands";
import Subscription from "@/components/Subscription/Subscription";
import ScrollBtn from "@/components/ScrollBtn";
import BrandArticles from "@/components/BrandArticles";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}

      <Brands />
      <BrandArticles />
      <Subscription />
      <ScrollBtn />
    </>
  );
}
