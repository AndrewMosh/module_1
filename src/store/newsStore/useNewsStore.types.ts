export type NewsItem = {
  title: string;
  description: string;
  urlToImage: string;
  url: string;
};

export type NewsStore = {
  news: NewsItem[];
  loading: boolean;
  error: string | null;
  fetchNews: () => void;
};
