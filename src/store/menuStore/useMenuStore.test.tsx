import { describe, it, expect, beforeEach } from 'vitest';
import { useMenuStore } from './useMenuStore';

describe('useMenuStore', () => {
  beforeEach(() => {
    useMenuStore.setState({ isMenuOpen: false });
    document.body.style.overflow = 'auto';
  });

  it('should have initial state with isMenuOpen as false', () => {
    const state = useMenuStore.getState();
    expect(state.isMenuOpen).toBe(false);
  });

  it('should toggle menu and update body overflow', () => {
    const { toggleMenu } = useMenuStore.getState();
    toggleMenu();
    expect(useMenuStore.getState().isMenuOpen).toBe(true);
    expect(document.body.style.overflow).toBe('hidden');
    toggleMenu();
    expect(useMenuStore.getState().isMenuOpen).toBe(false);
    expect(document.body.style.overflow).toBe('auto');
  });

  it('should close menu and reset body overflow', () => {
    const { closeMenu, toggleMenu } = useMenuStore.getState();

    toggleMenu();
    expect(useMenuStore.getState().isMenuOpen).toBe(true);

    closeMenu();
    expect(useMenuStore.getState().isMenuOpen).toBe(false);
    expect(document.body.style.overflow).toBe('auto');
  });
});
