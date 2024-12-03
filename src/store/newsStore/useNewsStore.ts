import { create } from 'zustand';
import axios from 'axios';
import { NewsStore, NewsItem } from './useNewsStore.types';
import { pages, endpoint } from './useNewsStore.consts';

const apiKey = import.meta.env.VITE_API_KEY_NEWS;
const news_api = import.meta.env.VITE_NEWS_API;

async function checkImageExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
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
        `${news_api}${endpoint}&pageSize=${pages}&apiKey=${apiKey}`,
      );

      const filteredArticles = await Promise.all(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        response.data.articles.map(async (article: any) => {
          const isImageValid = article.urlToImage
            ? await checkImageExists(article.urlToImage)
            : false;

          if (!isImageValid) {
            article.urlToImage = null;
          }

          return {
            ...article,
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch news',
        loading: false,
      });
    }
  },
}));
