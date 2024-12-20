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
	restoreFormState: () => void;
}

const STORAGE_KEY = 'formStore';

const useFormStore = create<FormStore>((set, get) => ({
  forms: {},

	// Отправка формы с сохранением в Local Storage
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

		const updatedForms = {
			...forms,
			[formName]: {
				isLoading: false,
				success: true,
				error: null,
				data: response.data,
			},
		};

		set({ forms: updatedForms });

		// Сохранение в Local Storage
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedForms));
    } catch (error: unknown) {
      const formError = error as ApiError;

		const updatedForms = {
			...forms,
			[formName]: {
				isLoading: false,
				success: false,
				data: null,
				error:
					formError.response?.data?.message ||
					'Something went wrong, try again later',
			},
		};

		set({ forms: updatedForms });

		// Сохранение в Local Storage ошибки (опционально)
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedForms));
    }
  },

	// Сброс состояния формы
  resetFormState: (formName) => {
    const forms = get().forms;

	  const updatedForms = {
		  ...forms,
		  [formName]: {
			  isLoading: false,
			  success: false,
			  error: null,
			  data: null,
		  },
	  };

	  set({ forms: updatedForms });

	  // Сохранение изменений в Local Storage
	  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedForms));
	},

	// Восстановление состояния форм из Local Storage
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

export default useFormStore;
