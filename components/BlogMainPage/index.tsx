/*"use client";
import { useEffect, useState } from "react";
import BlogCard from "../BlogCard";
import { Card, CardsResponse } from "@/types/card";
import { useSearchParams } from "next/navigation";
import CardSkeleton from "../Loading/CardSkeleton";
import Headline from "@/app/UI/headline";

type GroupedCard = {
  type: "big" | "small";
  cards: Card[];
};

const groupCards = (cards: Card[]): GroupedCard[] => {
  if (!cards || cards.length === 0) return [];

  const grouped: GroupedCard[] = [];
  let i = 0;

  while (i < cards.length) {
    grouped.push({ type: "big", cards: [cards[i]] });
    i++;
    if (i < cards.length) {
      const group = cards.slice(i, i + 3);
      grouped.push({ type: "small", cards: group });
      i += 3;
    }
  }

  return grouped;
};

export default function BlogMainPage() {
  const searchParams = useSearchParams();
  const sortByDate = searchParams.get("sortByDate");
  const sortByPopularity = searchParams.get("sortByPopularity");
  const searchQuery = searchParams.get("searchQuery") || "";
  const tags = searchParams.getAll("tags[]");

  const INITIAL_VISIBLE_GROUPS = 8;

  const [allCards, setAllCards] = useState<CardsResponse>({
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

  const [visibleGroups, setVisibleGroups] = useState(INITIAL_VISIBLE_GROUPS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setIsLoading(true);
        const queryParams = new URLSearchParams();

        if (sortByDate) queryParams.set("sortByDate", sortByDate);
        if (sortByPopularity)
          queryParams.set("sortByPopularity", sortByPopularity);
        if (searchQuery) queryParams.set("searchQuery", searchQuery);
        tags.forEach((tag) => tag && queryParams.append("tags[]", tag));

        const res = await fetch(`/api/blogs?${queryParams.toString()}`);
        if (!res.ok) throw new Error(await res.text());

        const cards = await res.json();
        setAllCards(cards);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchCards();
  }, [sortByDate, sortByPopularity, searchQuery, tags.join(",")]);

  const groupedCards = groupCards(allCards.data);
  const visibleGrouped = groupedCards.slice(0, visibleGroups);
  const showMore = () => setVisibleGroups((prev) => prev + 3);
  console.log(allCards);

  return (
    <div className="container3" style={{ marginTop: "20px" }}>
      <Headline
        text={"Блоги"}
        link={"/blog"}
        left={true}
        stylecss={{ color: "var(--color-1C-fff)" }}
      />
      <div className="cards_container" style={{ marginTop: "20px" }}>
        {visibleGrouped.map((group, index) => (
          <div
            key={index}
            className={`row ${group.type === "big" ? "big-row" : "small-row"}`}
          >
            {group.cards.map((card, i) => (
              <BlogCard key={i} card={card} type={group.type} />
            ))}
          </div>
        ))}
        {isLoading && <CardSkeleton heightPx="1317px" />}
        {error && <div style={{ color: "red" }}>{error}</div>}
        {!isLoading && allCards.data.length === 0 && (
          <Headline text="Нет доступных блогов" left={true} />
        )}
      </div>
      {visibleGroups < groupedCards.length && (
        <div className="show-more-wrapper">
          <button onClick={showMore} className="showbtn text">
            Показать ещё
          </button>
        </div>
      )}
    </div>
  );
}
*/
"use client";
import { useEffect, useState } from "react";
import BlogCard from "../BlogCard";
import { Card, CardsResponse } from "@/types/card";
import { useSearchParams } from "next/navigation";
import CardSkeleton from "../Loading/CardSkeleton";
import Headline from "@/app/UI/headline";

type GroupedCard = {
  type: "big" | "small";
  cards: Card[];
};

const groupCards = (cards: Card[]): GroupedCard[] => {
  if (!cards || cards.length === 0) return [];

  const grouped: GroupedCard[] = [];
  let i = 0;

  while (i < cards.length) {
    grouped.push({ type: "big", cards: [cards[i]] });
    i++;
    if (i < cards.length) {
      const group = cards.slice(i, i + 3);
      grouped.push({ type: "small", cards: group });
      i += 3;
    }
  }

  return grouped;
};

export default function BlogMainPage() {
  const searchParams = useSearchParams();
  const sortByDate = searchParams.get("sortByDate");
  const sortByPopularity = searchParams.get("sortByPopularity");
  const searchQuery = searchParams.get("searchQuery") || "";
  const tags = searchParams.getAll("tags[]");

  const INITIAL_VISIBLE_GROUPS = 8;
  const PAGE_SIZE = 16;

  const [allCards, setAllCards] = useState<CardsResponse>({
    data: [],
    meta: {
      pagination: {
        page: 1,
        pageSize: PAGE_SIZE,
        pageCount: 0,
        total: 0,
      },
    },
    length: undefined,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleGroups, setVisibleGroups] = useState(INITIAL_VISIBLE_GROUPS);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log(allCards);
  useEffect(() => {
    const fetchCards = async (page: number = 1, append: boolean = false) => {
      try {
        if (page === 1) setIsLoading(true);
        else setIsLoadingMore(true);

        const queryParams = new URLSearchParams();
        queryParams.set("page", page.toString());
        queryParams.set("pageSize", PAGE_SIZE.toString());
        if (sortByDate) queryParams.set("sortByDate", sortByDate);
        if (sortByPopularity)
          queryParams.set("sortByPopularity", sortByPopularity);
        if (searchQuery) queryParams.set("searchQuery", searchQuery);
        tags.forEach((tag) => tag && queryParams.append("tags[]", tag));

        const res = await fetch(`/api/blogs?${queryParams.toString()}`);
        if (!res.ok) throw new Error(await res.text());

        const cards: CardsResponse = await res.json();
        setAllCards((prev) => ({
          data: append ? [...prev.data, ...cards.data] : cards.data,
          meta: cards.meta,
          length: cards.length,
        }));
        setIsLoading(false);
        setIsLoadingMore(false);
      } catch (err: any) {
        setError(err.message);
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    };

    fetchCards(1);
  }, [sortByDate, sortByPopularity, searchQuery, tags.join(",")]);

  const showMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    setVisibleGroups((prev) => prev + 3);
    const fetchCards = async () => {
      try {
        setIsLoadingMore(true);
        const queryParams = new URLSearchParams();
        queryParams.set("page", nextPage.toString());
        queryParams.set("pageSize", PAGE_SIZE.toString());
        if (sortByDate) queryParams.set("sortByDate", sortByDate);
        if (sortByPopularity)
          queryParams.set("sortByPopularity", sortByPopularity);
        if (searchQuery) queryParams.set("searchQuery", searchQuery);
        tags.forEach((tag) => tag && queryParams.append("tags[]", tag));

        const res = await fetch(`/api/blogs?${queryParams.toString()}`);
        if (!res.ok) throw new Error(await res.text());

        const cards: CardsResponse = await res.json();
        setAllCards((prev) => ({
          data: [...prev.data, ...cards.data],
          meta: cards.meta,
          length: cards.length,
        }));
        setIsLoadingMore(false);
      } catch (err: any) {
        setError(err.message);
        setIsLoadingMore(false);
      }
    };
    fetchCards();
  };

  const groupedCards = groupCards(allCards.data);
  const visibleGrouped = groupedCards.slice(0, visibleGroups);

  return (
    <div className="container3" style={{ marginTop: "20px" }}>
      <Headline
        text={"Блоги"}
        link={"/blog"}
        left={true}
        stylecss={{ color: "var(--color-1C-fff)" }}
      />
      <div className="cards_container" style={{ marginTop: "20px" }}>
        {visibleGrouped.map((group, index) => (
          <div
            key={index}
            className={`row ${group.type === "big" ? "big-row" : "small-row"}`}
          >
            {group.cards.map((card, i) => (
              <BlogCard key={`${index}-${i}`} card={card} type={group.type} />
            ))}
          </div>
        ))}
        {isLoading && <CardSkeleton heightPx="1317px" />}
        {isLoadingMore && <CardSkeleton heightPx="1317px" />}
        {error && <div style={{ color: "red" }}>{error}</div>}
        {!isLoading && allCards.data.length === 0 && (
          <Headline text="Нет доступных блогов" left={true} />
        )}
      </div>
      {visibleGroups < groupedCards.length ||
      currentPage < allCards.meta.pagination.pageCount ? (
        <div className="show-more-wrapper">
          <button
            onClick={showMore}
            className="showbtn text"
            disabled={isLoadingMore}
          >
            {isLoadingMore ? "Загрузка..." : "Показать ещё"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
