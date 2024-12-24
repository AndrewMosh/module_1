export interface DocumentState {
  isAgreed: boolean;
  loading: boolean;
  error: string | null;
  isSuccess: boolean;
  setAgreement: (agreed: boolean) => void;
  sendAgreement: (id: string) => Promise<void>;
}