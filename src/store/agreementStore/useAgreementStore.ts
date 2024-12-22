import { create } from "zustand";

interface AgreementState {
  isAgreed: boolean;
  setAgreement: (agreed: boolean) => void;
}

export const useAgreementStore = create<AgreementState>((set) => ({
  isAgreed: false,
  setAgreement: (agreed) => set({ isAgreed: agreed }),
}));
