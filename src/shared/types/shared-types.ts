export interface AsyncState<T = void> {
  loading: boolean;
  error: string | null | boolean;
  success?: boolean;
  isAgreed?: boolean;
  setAgreement?: (agreed: boolean) => void;
  data?: T;
}
