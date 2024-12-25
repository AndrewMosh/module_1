import { TData as PrescoringData } from "@pages/CreditCard/components/PrescoringForm/form.types";
import { TScore as ScoringData } from "@pages/ScoringStep/components/ScoringForm/form.types";

interface StatusHistory {
  status: 'PREAPPROVED' | 'APPROVED' | 'CC_APPROVED' | 'DENIED' | 'CLIENT_DENIED' | 'CC_DENIED' | 'DOCUMENT_CREATED' | 'CREDIT_ISSUED';
  time: string;
  changeType: string;
}
export interface TData {
  client: PrescoringData & ScoringData;	
  creationDate: string;
  credit: null;
  id: number | string;
  sesCode: null | string;
  signDate: null | string;
  status: string;
  statusHistory: StatusHistory[];
}

export interface ApplicationState {
  data:  null | TData;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  fetchApplication: (id: number | string) => Promise<void>;
}
