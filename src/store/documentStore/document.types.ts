import { AsyncState } from '@shared';

export interface DocumentState extends AsyncState {
isAgreed: boolean;
setAgreement: (agreed: boolean) => void;
  sendAgreement: (id: string) => Promise<void>;
}
