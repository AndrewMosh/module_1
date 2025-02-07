import { create } from 'zustand';
import { ApplicationState } from './application.types';
import axios from 'axios';
import { apiUrl } from '@shared';

export const useApplicationStore = create<ApplicationState>((set) => ({
  data: null,
  loading: false,
  error: null,
  initialized: false,
  fetchApplication: async (id: number | string) => {
    set({ loading: true, error: null, initialized: false });
    try {
      const response = await axios.get(`${apiUrl}/admin/application/${id}`);
      set({ data: response.data, loading: false, initialized: true });
    } catch (error) {
      if (error instanceof Error) {
        set({
          error: 'Error fetching data or this application does not exist',
          loading: false,
          initialized: true,
        });
      }
    }
  },
}));
