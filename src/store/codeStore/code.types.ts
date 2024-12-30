import { AsyncState } from '@shared';

export interface CodeState extends AsyncState {
  code: string[];
  initialized: boolean;
  fetchApplication: (id: number | string) => Promise<void>;
  setCode: (index: number, value: string) => void;
  clearCode: () => void;
  sendCode: (applicationId: string) => Promise<void>;
}
