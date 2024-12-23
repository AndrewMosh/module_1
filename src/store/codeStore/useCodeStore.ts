import { useStepStore } from '@store/updateStep/useStepStore';
import { create } from 'zustand';

interface CodeState {
  code: string[];
  error: string | null;
  loading: boolean;
  isSuccess: boolean;
  setCode: (index: number, value: string) => void;
  clearCode: () => void;
  sendCode: (applicationId: string) => Promise<void>;
}

export const useCodeStore = create<CodeState>((set, get) => ({
  code: ['', '', '', ''],
  error: null,
  loading: false,
  isSuccess: false,
  setCode: (index, value) =>
    set((state) => {
      const updatedCode = [...state.code];
      updatedCode[index] = value;
      return { code: updatedCode };
    }),
  clearCode: () => set({ code: ['', '', '', ''], isSuccess: false }),
  sendCode: async (id) => {
    const api = import.meta.env.VITE_BASE_URL || 'http://localhost:8080';
    set({ loading: true, error: null, isSuccess: false });
    const { code } = get();
    const confirmationCode = code.join(''); // объединяем код в строку

    try {
      const response = await fetch(`${api}/document/${id}/sign/code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // теперь отправляем строку вместо объекта
        body: JSON.stringify(confirmationCode), 
      });

      if (response.ok) {
        useStepStore.getState().updateStep(id, 'step5');
      } else {
        console.log(response);
        throw new Error('Invalid confirmation code');
      }

      set({ loading: false, isSuccess: true });
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      get().clearCode();
    }
  },
}));
