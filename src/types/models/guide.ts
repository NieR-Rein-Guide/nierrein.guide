export type Guide = {
  slug: string;
  title: string;
  content: string;
  cover?: {
    width: number;
    height: number;
    url: string;
  };
  published_at: string;
  updated_at?: string;
}