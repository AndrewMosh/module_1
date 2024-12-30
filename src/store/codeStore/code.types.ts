import { AsyncState } from '@shared';

export interface CodeState extends AsyncState {
  code: string[];
  setCode: (index: number, value: string) => void;
  clearCode: () => void;
  sendCode: (applicationId: string) => Promise<void>;
}
