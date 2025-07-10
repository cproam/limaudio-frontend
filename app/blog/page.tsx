import BlogPage from "@/components/BlogPage";
import { Suspense } from "react";

export default function Blog() {
  return (
    <>
      <Suspense fallback={<div></div>}>
        <BlogPage />
      </Suspense>
    </>
  );
}
