export interface DocumentState {
  isAgreed: boolean;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  setAgreement: (value: boolean) => void;
  submitAgreement: (api: string, id: string) => Promise<void>;
}
