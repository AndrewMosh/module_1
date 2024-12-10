import { create } from 'zustand';
import axios from 'axios';

interface FormState {
  isLoading: boolean;
  success: boolean;
  error: string | null;
}

interface FormStore {
  forms: Record<string, FormState>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submitForm: (
    formName: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: Record<string, any>,
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
        [formName]: { isLoading: true, success: false, error: null },
      },
    });

    try {
      const response = await axios.post(endpoint, data);
      console.log(`[${formName}] Response:`, response.data);
      set({
        forms: {
          ...forms,
          [formName]: { isLoading: false, success: true, error: null },
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(`[${formName}] Error:`, error);

      set({
        forms: {
          ...forms,
          [formName]: {
            isLoading: false,
            success: false,
            error: error.response?.data?.message || 'Something went wrong',
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
        [formName]: { isLoading: false, success: false, error: null },
      },
    });
  },
}));

export default useFormStore;
