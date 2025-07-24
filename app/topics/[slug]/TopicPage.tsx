"use client";

import BlogCard from "@/components/BlogCard";
import Brands from "@/components/Brands";
import NoBlogs from "@/components/NoBlogs";
import PopularArticles from "@/components/PopularArticles";
import { ArticleCard } from "@/types/articles";
import { useEffect, useState } from "react";

interface Topic {
  title: string;
  articles: ArticleCard[];
}

interface TopicApiResponse {
  data: Topic[];
}

interface Props {
  slug: string;
  topicLabel: string;
  matchingTopics: Topic[];
  error: string | null;
}

export default function TopicPage({
  slug,
  topicLabel,
  matchingTopics: initialMatchingTopics,
  error: initialError,
}: Props) {
  const [articles, setArticles] = useState<ArticleCard[]>(
    initialMatchingTopics.length > 0 ? initialMatchingTopics[0].articles : []
  );
  const [error, setError] = useState<string | null>(initialError);
  const [topics, setTopics] = useState<Topic[]>(initialMatchingTopics);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch("/api/topic");
        if (!res.ok) {
          throw new Error("Ошибка при загрузке");
        }
        const topicsData: TopicApiResponse = await res.json();
        setTopics(topicsData.data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    if (!initialMatchingTopics.length) {
      fetchCards();
    }
  }, [initialMatchingTopics]);

  useEffect(() => {
    const matchingTopics = topics.filter(
      (topic: Topic) => topic.title === topicLabel
    );
    if (matchingTopics.length > 0) {
      setArticles(matchingTopics[0].articles);
    } else {
      setArticles([]);
    }
  }, [topics, topicLabel]);

  return (
    <>
      <div className="container">
        <div style={{ height: "20px" }}></div>
        <div className="text-h3-bold">{topicLabel}</div>
        <div style={{ height: "20px" }}></div>

        {error && <div style={{ color: "red" }}>{error}</div>}
        {!error && articles.length === 0 && <NoBlogs />}

        <div className="interes__card">
          <div className="cards_container">
            {articles.map((card: ArticleCard) => (
              <BlogCard key={card.id} card={card} type="small" />
            ))}
          </div>
        </div>

        <PopularArticles />
      </div>
      <Brands />
    </>
  );
}
