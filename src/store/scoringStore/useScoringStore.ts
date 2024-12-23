import { create } from 'zustand';
import axios from 'axios';
import { ApiError } from '@store/newsStore/useNewsStore.types';
import { TScore } from '@pages/ScoringStep/components/ScoringForm/form.types';
import { useStepStore } from '@store/updateStep/useStepStore';

interface FormState {
  isLoading: boolean;
  success: boolean;
  error: string | null;
}

interface FormStore {
  forms: Record<string, FormState>;
  submitForm: (
    formName: string,
    endpoint: string,
    data: TScore,
	id:string,
  ) => Promise<void>;
  resetFormState: (formName: string) => void;
}

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
