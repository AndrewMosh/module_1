export interface ModalState {
  showModal: boolean;
  isSuccess: boolean;
  loading: boolean;
  error: string | null;
  openModal: () => void;
  closeModal: () => void;
  denyApplication: (id: string) => Promise<void>;
}