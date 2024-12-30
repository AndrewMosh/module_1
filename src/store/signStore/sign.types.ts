import { AsyncState } from '@shared';

export interface DocumentState extends AsyncState {
	isAgreed: boolean;
	setAgreement: (agreed: boolean) => void;
  submitAgreement: (api: string, id: string) => Promise<void>;
}
