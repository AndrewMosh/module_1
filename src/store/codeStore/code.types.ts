export interface CodeState {
  code: string[];
  error: string | null;
  loading: boolean;
  isSuccess: boolean;
  setCode: (index: number, value: string) => void;
  clearCode: () => void;
  sendCode: (applicationId: string) => Promise<void>;
}
