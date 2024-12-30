import { AsyncState } from '@shared';

export type NewsItem = {
  title: string;
  description: string;
  urlToImage: string | null;
  url: string;
};

export interface NewsStore extends AsyncState {
  news: NewsItem[];
  fetchNews: () => void;
}

export type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};
