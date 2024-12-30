import { AsyncState } from '@shared';

export interface DocumentState extends AsyncState {
  sendAgreement: (id: string) => Promise<void>;
}
