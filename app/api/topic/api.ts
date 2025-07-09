import { Article } from "@/types/articles";
import qs from "qs";

interface Seo {
  id: number;
  metaTitle: string;
  metaDescription: string;
  metaKeys: string;
  shareImage: any;
}

interface Topic {
  title: string;
  articles: Article[];
  image?: { id: number; documentId: string; url: string };
  seo?: Seo;
}

export async function getMatchingTopics(topicLabel: string): Promise<Topic[]> {
  const query = qs.stringify(
    {
      populate: {
        image: {
          fields: ["url"],
        },
        articles: { populate: "*" },
        seo: { populate: "*" },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetch(`${process.env.API_URL}/topics?${query}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Ошибка при загрузке данных");
  }
  const topicsData: { data: Topic[] } = await res.json();
  return topicsData.data.filter((topic: Topic) => topic.title === topicLabel);
}
