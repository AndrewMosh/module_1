import { create } from 'zustand';
import axios from 'axios';
import { NewsStore, NewsItem } from './useNewsStore.types';
import { pages, endpoint } from './useNewsStore.consts';
import { ApiError } from './useNewsStore.types';
import { news_api, newsKey } from '@shared';

async function checkImageExists(url: string): Promise<boolean> {
  try {
    const response = await axios.head(url);
    return response.status === 200;
  } catch {
    return false;
  }
}

export const useNewsStore = create<NewsStore>((set) => ({
  news: [],
  loading: false,
  error: null,

  fetchNews: async () => {
    set({ loading: true, error: null });

    try {
      const response = await axios.get(
        `${news_api}${endpoint}&pageSize=${pages}&apiKey=${newsKey}`,
      );

      const filteredArticles = await Promise.all(
        response.data.articles.map(async (article: NewsItem) => {
          const isImageValid = article.urlToImage
            ? await checkImageExists(article.urlToImage)
            : false;

          return {
            ...article,
            urlToImage: isImageValid ? article.urlToImage : null,
            description: article.description
              ? article.description.replace(/<\/?[^>]+(>|$)/g, '')
              : 'No description available',
          };
        }),
      );

      set({
        news: filteredArticles.filter(
          (article: NewsItem) => article.urlToImage,
        ),
        loading: false,
      });
    } catch (error: unknown) {
      const apiError = error as ApiError;
      set({
        error:
          axios.isAxiosError(apiError) && apiError.response?.data?.message
            ? apiError.response.data.message
            : 'Failed to fetch news',
        loading: false,
      });
    }
  },
}));
