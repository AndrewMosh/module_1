import { create } from 'zustand';
import { MenuStore } from './menu.types';

export const useMenuStore = create<MenuStore>((set) => ({
  isMenuOpen: false,
  toggleMenu: () =>
    set((state) => {
      const isOpening = !state.isMenuOpen;
      document.body.style.overflow = isOpening ? 'hidden' : 'auto';
      return { isMenuOpen: isOpening };
    }),
  closeMenu: () => {
    document.body.style.overflow = 'auto';
    set({ isMenuOpen: false });
  },
}));
