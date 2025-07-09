type MediaFile = {
  documentId: string;
  id: number;
  url?: string;
  createdAt?: string;
};

type BaseBlock = {
  __component: string;
  id: number;
};

interface RichTextBlock extends BaseBlock {
  __component: "shared.rich-text";
  body: string;
}

interface SliderBlock extends BaseBlock {
  __component: "shared.slider";
  files: string[];
}

type Block = RichTextBlock | SliderBlock;

export type Topic = {
  createdAt: string;
  documentId: string;
  id: number;
  image: MediaFile;
  publishedAt: string;
  title: string;
  updatedAt: string;
};

type Category = {
  documentId: string;
  id: number;
  name: string;
};

export type Articles = {
  id: number;
  documentId: string;
  slug: string;
  title: string;
  description: string;
  type: string;
  url: string;
  date: string;
  views: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cover: MediaFile;
  blocks: Block[];
  category: Category;
  comments: {
    count: number;
  };
  topics: Topic;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaImage?: string;
  };
};

export interface Article {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  views: number;
  category: { name: string };
  topics: { title: string }[];
}

export interface PageProps {
  params: {
    slug: string;
  };
  searchParams?: Record<string, string>;
}

export interface ArticleCard {
  type: string;
  category: { name: string };
  comments: { count: number };
  cover: { url: string };
  createdAt: string;
  description: string;
  documentId: string;
  id: number;
  publishedAt: string;
  slug: string;
  title: string;
  date?: string;
  topics?: Topic;
  updatedAt: string;
  views: number;
}
