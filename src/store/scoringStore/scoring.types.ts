import { TScore } from '@pages/ScoringStep/components/ScoringForm/form.types';
import { FormState } from '@store/prescoringStore/prescoring.types';

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
