import { create } from 'zustand';
import axios from 'axios';
import { ApiError } from '@store/newsStore/useNewsStore.types';
import { FormStore } from './scoring.types';
import { setActiveStep } from '@store/activeStepStore/useActiveStepStore';

export const useScoringStore = create<FormStore>((set, get) => ({
  forms: {},

  submitForm: async (formName, endpoint, data) => {
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
      await axios.put(endpoint, data);
      set({
        forms: {
          ...forms,
          [formName]: {
            loading: false,
            success: true,
            error: null,
            data: null,
          },
        },
      });
      setActiveStep(2);
    } catch (error: unknown) {
      const formError = error as ApiError;

      set({
        forms: {
          ...forms,
          [formName]: {
            loading: false,
            success: false,
            error:
              formError.response?.data?.message ||
              'Something went wrong, try again later',
            data: null,
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
          loading: false,
          success: false,
          error: null,
          data: null,
        },
      },
    });
  },
}));
