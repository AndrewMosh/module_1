import { create } from 'zustand';
import axios from 'axios';
import { SubscriptionState } from './useSubscribtion.types';

const api = import.meta.env.VITE_BASE_URL;

const useSubscriptionStore = create<SubscriptionState>((set) => ({
  isSubscribed: Boolean(localStorage.getItem('isSubscribed')),

  subscribe: async (email: string) => {
    try {
      const response = await axios.post(`${api}/email`, { email });
      if (response.status === 200) {
        set({ isSubscribed: true });
        localStorage.setItem('isSubscribed', 'true');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      throw new Error('Failed to subscribe. Please try again later.');
    }
  },
}));

export default useSubscriptionStore;
