import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DenyModal } from './DenyModal';
import { useModalStore } from '@store';
import { useNavigate } from 'react-router-dom';

vi.mock('@store', () => ({
  useModalStore: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('DenyModal', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    (useNavigate as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      mockNavigate,
    );
    (useModalStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      showModal: false,
      success: false,
      loading: false,
      error: null,
      openModal: vi.fn(),
      closeModal: vi.fn(),
      denyApplication: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders deny button and does not show modal initially', () => {
    render(<DenyModal id="123" />);

    expect(screen.getByText('Deny')).toBeInTheDocument();
    expect(screen.queryByText('Deny application')).not.toBeInTheDocument();
  });

  it('opens modal when "Deny" button is clicked', () => {
    const openModalMock = vi.fn();
    let showModalState = false;

    (useModalStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      ...useModalStore(),
      openModal: () => {
        openModalMock();
        showModalState = true;
      },
      showModal: showModalState,
    });

    const { rerender } = render(<DenyModal id="123" />);

    fireEvent.click(screen.getByText('Deny'));

    (useModalStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      ...useModalStore(),
      showModal: showModalState,
    });
    rerender(<DenyModal id="123" />);

    expect(openModalMock).toHaveBeenCalled();
    expect(screen.getByText('Deny application')).toBeInTheDocument();
  });

  it('calls denyApplication when "Deny" button in modal is clicked', async () => {
    const denyApplicationMock = vi.fn();

    (useModalStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      ...useModalStore(),
      showModal: true,
      denyApplication: denyApplicationMock,
    });

    render(<DenyModal id="123" />);

    const modalDenyButton = screen.getByText('Deny', {
      selector: '.modal__confirm-button',
    });

    fireEvent.click(modalDenyButton);

    await waitFor(() => {
      expect(denyApplicationMock).toHaveBeenCalledWith('123');
    });
  });

  it('closes modal when "Cancel" button is clicked', () => {
    const closeModalMock = vi.fn();
    (useModalStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      ...useModalStore(),
      showModal: true,
      closeModal: closeModalMock,
    });

    render(<DenyModal id="123" />);

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(closeModalMock).toHaveBeenCalled();
  });

  it('navigates home when "Go Home" button is clicked', () => {
    (useModalStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      ...useModalStore(),
      showModal: true,
      success: true,
    });

    render(<DenyModal id="123" />);

    const goHomeButton = screen.getByText('Go Home');
    fireEvent.click(goHomeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('displays error message if there is an error', () => {
    (useModalStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      ...useModalStore(),
      showModal: true,
      error: 'An error occurred',
    });

    render(<DenyModal id="123" />);

    expect(screen.getByText('An error occurred')).toBeInTheDocument();
  });
});
