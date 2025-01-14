import { create } from 'zustand';
import axios from 'axios';
import { ApiError } from '@store/newsStore/useNewsStore.types';
import { FormState } from './prescoring.types';
import { sortOffers } from './sort';
import { TOffers } from '@pages/CreditCard/components/Offers/offers.types';
import { TData } from '@pages/CreditCard/components/PrescoringForm/form.types';

interface FormStore {
  forms: Record<string, FormState>;
  submitForm: (
    formName: string,
    data: TData,
    endpoint: string,
    criteria: { key: keyof TData; order: 'asc' | 'desc' }[],
  ) => Promise<void>;
  resetFormState: (formName: string) => void;
  restoreFormState: () => void;
}

const STORAGE_KEY = 'formStore';

export const usePrescoringStore = create<FormStore>((set, get) => ({
  forms: {},

  submitForm: async (formName, data, endpoint, criteria) => {
    const forms = get().forms;

    set({
      forms: {
        ...forms,
        [formName]: {
          loading: true,
          success: false,
          error: null,
          data: null,
        },
      },
    });

    try {
      const response = await axios.post(endpoint, data);

      const sortedOffers = sortOffers(response.data, criteria);
      localStorage.setItem(
        'currentId',
        JSON.stringify(response.data[0].applicationId),
      );
      const updatedForms = {
        ...forms,
        [formName]: {
          loading: false,
          success: true,
          error: null,
          data: sortedOffers as unknown as TOffers[],
        },
      };

      set({ forms: updatedForms });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedForms));
    } catch (error: unknown) {
      const formError = error as ApiError;

      const updatedForms = {
        ...forms,
        [formName]: {
          loading: false,
          success: false,
          data: null,
          error:
            formError.response?.data?.message ||
            'Something went wrong, try again later',
        },
      };

      set({ forms: updatedForms });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedForms));
    }
  },
  resetFormState: (formName) => {
    const forms = get().forms;

    const updatedForms = {
      ...forms,
      [formName]: {
        loading: false,
        success: false,
        error: null,
        data: null,
      },
    };

    set({ forms: updatedForms });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedForms));
  },
  restoreFormState: () => {
    const savedForms = localStorage.getItem(STORAGE_KEY);

    if (savedForms) {
      try {
        set({ forms: JSON.parse(savedForms) });
      } catch (error) {
        console.error('Failed to restore form state from Local Storage', error);
      }
    }
  },
}));
