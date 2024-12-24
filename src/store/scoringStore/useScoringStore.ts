import { create } from 'zustand';
import axios from 'axios';
import { ApiError } from '@store/newsStore/useNewsStore.types';
import { useStepStore } from '@store/updateStep/useStepStore';
import { FormStore } from './scoring.types';


const useScoringStore = create<FormStore>((set, get) => ({
  forms: {},

  submitForm: async (formName, endpoint, data, id) => {
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

      if (id) {
        useStepStore.getState().updateStep(id, 'step2');
      }

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

export default useScoringStore;
