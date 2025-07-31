type MediaFile = {
  documentId: string;
  id: number;
  url?: string;
  createdAt?: string;
};
type Seo = {
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: string;
  metaKeys?: string;
  shareImage?: any;
};
type BaseBlock = {
  __component: string;
  id: number;
};
type BaseCard = {
  createdAt: string;
  documentId: string;
  id: number;
  updatedAt: string;
};

type repliesProps = BaseCard & {
  name: string;
  publishedAt: string;
  text: string;
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

export type Topic = BaseCard & {
  image: MediaFile;
  publishedAt: string;
  title: string;
};

type Category = {
  documentId: string;
  id: number;
  name: string;
};

export type Articles = BaseCard & {
  slug: string;
  title: string;
  description: string;
  type: string;
  url: string;
  date: string;
  views: number;
  publishedAt: string;
  cover: MediaFile;
  blocks: Block[];
  category: Category;
  comments: {
    count: number;
  };
  topics: Topic;
  seo?: Seo;
};

export interface Article extends BaseCard {
  title: string;
  description: string;
  slug: string;
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

export interface ArticleCard extends BaseCard {
  type: string;
  category: { name: string };
  comments: { count: number };
  cover: { url: string };
  description: string;
  publishedAt: string;
  slug: string;
  title: string;
  date?: string;
  topics?: Topic;
  views: number;
}

export interface Reply extends BaseCard {
  name: string;
  text: string;
  publishedAt: string;
}

export type CommentsProp = BaseCard & {
  article: ArticleCard[];
  name: string;
  publishedAt: string;
  replies: repliesProps;
  reply: any;
  text: string;
};

export type TopicHeader = BaseCard & {
  slug: string;
  title: string;
  seo?: Seo;
  image: MediaFile;
  publishedAt: string;
};

export type SimilarCard = BaseCard & {
  type: string;
  category: any;
  comments: { count: number };
  cover: MediaFile;
  description: string;
  formAdjective: string;
  formCategory: string;
  publishedAt: string;
  slug: string;
  title: string;
  topics?: {
    createdAt: string;
    documentId: string;
    id: number;
    image: MediaFile;
    publishedAt: string;
    slug: string;
    title: string;
    updatedAt: string;
  };
  views: number;
};
