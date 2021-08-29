export interface StrapiImageFormats {
  large?: StrapiImage;
  small?: StrapiImage;
  medium?: StrapiImage;
  thumbnail?: StrapiImage;
}

export type Poll = {
  title: string;
  embed: string;
}

export type StrapiImage = {
  ext?: string
  url?: string
  hash?: string
  mime?: string
  name?: string
  path?: string
  size?: number
  width?: number
  height?: number
}

export type FanContent = {
  author?: string;
  link?: string;
  image?: {
    url?: string;
    formats: StrapiImageFormats;
  };
  published_at?: string;
}

export type Event = {
  title: string;
  slug: string;
  content?: string;
  image?: {
    formats: StrapiImageFormats;
  };
  start_date: string;
  end_date?: string;
  poll?: Poll;
}

export type Guide = {
  slug: string;
  title: string;
  author: string;
  content: string;
  cover?: {
    width?: number;
    height?: number;
    url?: string;
    formats?: StrapiImageFormats;
  };
  published_at: string;
  updated_at?: string;
}

export type Story = {
  type: string;
  slug: string;
  cover: {
    formats: StrapiImageFormats;
  };
  title: string;
  content: string;
  released_date: string;
  character_id: number;
}