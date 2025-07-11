import { NextRequest, NextResponse } from "next/server";
import qs from "qs";

export async function GET(req: NextRequest) {
  // Validate environment variables
  if (!process.env.API_URL || !process.env.TOKEN) {
    console.error("API_URL or TOKEN not set in .env");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const sortByDate = searchParams.get("sortByDate");
    const sortByPopularity = searchParams.get("sortByPopularity");
    const searchQuery = searchParams.get("searchQuery") || "";
    const tags = searchParams.getAll("tags[]");
    const topic = searchParams.get("topic");
    const category = searchParams.get("category");

    // Optimize sorting logic
    const sortParams: string[] = [];
    if (sortByDate === "asc" || sortByDate === "desc") {
      sortParams.push(`createdAt:${sortByDate}`);
    } else if (
      sortByPopularity === "popular" ||
      sortByPopularity === "not_popular"
    ) {
      sortParams.push(
        `views:${sortByPopularity === "popular" ? "desc" : "asc"}`
      );
    } else {
      sortParams.push("createdAt:desc"); // Default sort
    }

    // Optimize filters
    const filters: any = {};
    if (searchQuery) {
      filters.$or = [
        { title: { $containsi: searchQuery } },
        { description: { $containsi: searchQuery } },
        { seo: { metaKeys: { $containsi: searchQuery } } },
      ];
    }

    if (tags.length > 0) {
      filters.$or = filters.$or || [];
      filters.$or.push(
        { topics: { title: { $in: tags } } },
        { category: { name: { $in: tags } } }
      );
    }

    if (topic) {
      filters.topics = { title: { $eq: topic } };
    }

    if (category) {
      filters.category = { name: { $eq: category } };
    }

    // Optimize query with smaller pageSize for initial load
    const query = qs.stringify(
      {
        sort: sortParams,
        filters,
        populate: {
          seo: { populate: "*" },
          cover: { fields: ["url"] },
          category: { fields: ["name"] },
          comments: { count: true },
          topics: {
            populate: {
              title: {},
              formCategory: {},
              formAdjective: {},
              image: { fields: ["url"] },
            },
          },
        },
        pagination: {
          pageSize: 50,
          page: 1,
        },
      },
      { encodeValuesOnly: true }
    );

    const res = await fetch(`${process.env.API_URL}/articles?${query}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`API Error: ${res.status} - ${text}`);
      return NextResponse.json({ error: text }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch data", details: error.message },
      { status: 500 }
    );
  }
}
