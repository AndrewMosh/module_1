import { TScore } from "@pages/ScoringStep/components/ScoringForm/form.types";

interface FormState {
  isLoading: boolean;
  success: boolean;
  error: string | null;
}

export interface FormStore {
  forms: Record<string, FormState>;
  submitForm: (
	formName: string,
	endpoint: string,
	data: TScore,
	id: string,
  ) => Promise<void>;
  resetFormState: (formName: string) => void;
}