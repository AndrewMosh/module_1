import { create } from 'zustand';
import axios from 'axios';
import { ApiError } from '@store/newsStore/useNewsStore.types';
import { FormStore } from './scoring.types';

export const useScoringStore = create<FormStore>((set, get) => ({
  forms: {},

  submitForm: async (formName, endpoint, data) => {
    const forms = get().forms;

    set({
      forms: {
        ...forms,
        [formName]: {
          isLoading: true,
          success: false,
          error: null,
        },
      },
    });

    try {
      await axios.put(endpoint, data);

      set({
        forms: {
          ...forms,
          [formName]: {
            isLoading: false,
            success: true,
            error: null,
          },
        },
      });
    } catch (error: unknown) {
      const formError = error as ApiError;

      set({
        forms: {
          ...forms,
          [formName]: {
            isLoading: false,
            success: false,
            error:
              formError.response?.data?.message ||
              'Something went wrong, try again later',
          },
        },
      });
    }
  },

  resetFormState: (formName) => {
    const forms = get().forms;

    set({
      forms: {
        ...forms,
        [formName]: {
          isLoading: false,
          success: false,
          error: null,
        },
      },
    });
  },
}));

