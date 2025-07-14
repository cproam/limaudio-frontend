"use client";
import { useEffect, useState } from "react";
import { CardsResponse } from "@/types/card";
import Headline from "@/app/UI/headline";
import CardSkeleton from "../Loading/CardSkeleton";
import BlogCard from "../BlogCard";

export default function BrandArticles({
  slug,
  brand,
}: {
  slug?: string;
  brand?: string;
}) {
  const [allBrandsCards, setBrandsCards] = useState<CardsResponse>({
    data: [],
    meta: {
      pagination: {
        page: 1,
        pageSize: 10,
        pageCount: 0,
        total: 0,
      },
    },
    length: undefined,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch(`/api/blogSimilar?slug=${slug}&brand=${brand}`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Ошибка при загрузке");
        }

        const cards = await res.json();
        setBrandsCards(cards);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    if (slug && brand) {
      fetchCards();
    }
  }, []);

  if (allBrandsCards === undefined) {
    return null;
  }

  if (allBrandsCards.data.length === 0) {
    return null;
  }

  return (
    <div className="container2" style={{ marginTop: "50px" }}>
      <Headline text="Другие статьи бренда" left={true} />

      <div style={{ marginTop: "30px" }}>
        {isLoading && <CardSkeleton heightPx="551px" />}
        {error && <div style={{ color: "red" }}>{error}</div>}

        <div className="interes__card">
          <div className="cards_container" style={{ grid: "" }}>
            {allBrandsCards.data.map((card) => (
              <BlogCard key={card.id} card={card} type="small" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
