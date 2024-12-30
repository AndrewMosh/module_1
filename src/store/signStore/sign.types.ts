import { AsyncState } from '@shared';

export interface DocumentState extends AsyncState {
  submitAgreement: (api: string, id: string) => Promise<void>;
}
