import PopularArticles from "@/components/PopularArticles";
import PopularWrapper from "@/components/PopularWrapper";
import ScrollBtn from "@/components/ScrollBtn";

export default function CategoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PopularWrapper />
      {children}
      <PopularArticles />
      <ScrollBtn />
    </>
  );
}
