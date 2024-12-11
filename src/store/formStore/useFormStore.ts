import { create } from 'zustand';
import axios from 'axios';
import { ApiError } from '@store/newsStore/useNewsStore.types';
import { TOffers } from '@pages/CreditCard/components/Offers/offers.types';
import { TData } from '@pages/CreditCard/components/PrescoringForm/form.types';

interface FormState {
  isLoading: boolean;
  success: boolean;
  error: string | null;
  data: TOffers[] | null;
}

interface FormStore {
  forms: Record<string, FormState>;
  submitForm: (
    formName: string,
    data: TData,
    endpoint: string,
  ) => Promise<void>;
  resetFormState: (formName: string) => void;
}

const useFormStore = create<FormStore>((set, get) => ({
  forms: {},

  submitForm: async (formName, data, endpoint) => {
    const forms = get().forms;

    set({
      forms: {
        ...forms,
        [formName]: {
          isLoading: true,
          success: false,
          error: null,
          data: null,
        },
      },
    });

    try {
      const response = await axios.post(endpoint, data);
      console.log(`[${formName}] Response:`, response.data);
      set({
        forms: {
          ...forms,
          [formName]: {
            isLoading: false,
            success: true,
            error: null,
            data: response.data,
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
            data: null,
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
          data: null,
        },
      },
    });
  },
}));

export default useFormStore;
