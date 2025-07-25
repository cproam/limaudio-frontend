export type RichTextBlock = {
  __component: "shared.rich-text";
  id: number;
  body: string;
};

type SliderBlock = {
  __component: "shared.slider";
  id: number;
  files: string[];
};

type BaseCard = {
  createdAt: string;
  documentId: string;
  id: number;
  updatedAt: string;
};

type Block = RichTextBlock | SliderBlock;

export type Card = BaseCard & {
  formAdjective?: string;
  formCategory?: string;
  blocks: Block[];
  category: {
    documentId: string;
    id: number;
    name: string;
  };
  comments: {
    count: number;
  };
  cover: {
    documentId: string;
    id: number;
    url: string;
  };
  description: string;
  publishedAt: string;
  slug: string;
  title: string;
  views: number;
  url: string;
  date: string;
  type: string;
};

export type CardsResponse = {
  length?: undefined;
  data: Card[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};
