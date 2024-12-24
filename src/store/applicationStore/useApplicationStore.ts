import {create} from 'zustand';
import axios from 'axios';
import { apiUrl } from '@shared/api/api.consts';
import { ApplicationState } from './application.types';


export const useApplicationStore = create<ApplicationState>((set) => ({
  data: null,
  loading: false,
  error: null,
  fetchApplication: async (id: number | string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${apiUrl}/admin/application/${id}`);
      set({ data: response.data, loading: false });
    } catch (error) {
		if (error instanceof Error) {
			set({ error: error.message || 'Error fetching data', loading: false });
		}
    }
  },
}));
