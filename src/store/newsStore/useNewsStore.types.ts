export type NewsItem = {
  title: string;
  description: string;
  urlToImage: string | null;
  url: string;
};

export type NewsStore = {
  news: NewsItem[];
  loading: boolean;
  error: string | null;
  fetchNews: () => void;
};

export type ApiError = {
	response?: {
	  data?: {
		message?: string;
	  };
	};
  };
