import { NextResponse } from "next/server";
import qs from "qs";

// Глобальный кэш в памяти
const cache = {
  data: null as any[] | null,
  lastFetched: 0,
  ttl: 1000 * 60 * 60 * 24, // 24 часа
};

export async function GET() {
  // Проверяем, есть ли данные в кэше и не истёк ли TTL
  if (cache.data && Date.now() - cache.lastFetched < cache.ttl) {
    return NextResponse.json({ data: cache.data });
  }

  if (!process.env.API_URL || !process.env.TOKEN) {
    console.error("API_URL или TOKEN не заданы в .env");
    return NextResponse.json(
      { error: "Неверная конфигурация сервера" },
      { status: 500 }
    );
  }

  const allData = [];
  let page = 1;
  const pageSize = 100;

  try {
    while (true) {
      const query = qs.stringify(
        {
          populate: { logo: { fields: ["name", "documentId", "url"] } },
          pagination: { pageSize, page },
        },
        { encodeValuesOnly: true }
      );

      const res = await fetch(`${process.env.API_URL}/brends?${query}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
        next: { revalidate: 86400 },
      });

      if (!res.ok) {
        const text = await res.text();
        console.error(`Ошибка API: ${res.status} - ${text}`);
        throw new Error(`API error: ${res.status}`);
      }

      const json = await res.json();
      const items = json?.data || [];
      allData.push(...items);

      const pagination = json?.meta?.pagination;
      if (!pagination || page >= pagination.pageCount) break;

      page++;
    }

    // Сохраняем данные в кэш
    cache.data = allData;
    cache.lastFetched = Date.now();

    return NextResponse.json({ data: allData });
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    return NextResponse.json(
      { error: "Ошибка при получении данных" },
      { status: 500 }
    );
  }
}
