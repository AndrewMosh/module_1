import { AsyncState } from '@shared';

export interface ModalState extends AsyncState {
  showModal: boolean;
  openModal: () => void;
  closeModal: () => void;
  denyApplication: (id: string) => Promise<void>;
}
