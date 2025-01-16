import { render, screen, fireEvent } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SignForm } from './SignForm';
import { useDocumentStore, useSignStore } from '@store';
import { apiUrl } from '@shared';

vi.mock('@store', () => ({
  useDocumentStore: vi.fn(),
  useSignStore: vi.fn(),
}));

describe('SignForm', () => {
  const mockUseDocumentStore = useDocumentStore as unknown as ReturnType<typeof vi.fn>;
  const mockUseSignStore = useSignStore as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockUseDocumentStore.mockReturnValue({
      isAgreed: false,
      setAgreement: vi.fn(),
    });
    mockUseSignStore.mockReturnValue({
      loading: false,
      error: null,
      submitAgreement: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the form correctly', () => {
    render(<SignForm id="123" />);
    expect(screen.getByText('Signing of documents')).toBeInTheDocument();
    expect(screen.getByText('Step 4 of 5')).toBeInTheDocument();
    expect(screen.getByText('Information on your card')).toBeInTheDocument();
    expect(screen.getByLabelText('I agree')).toBeInTheDocument();
    expect(screen.getByText('Send')).toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    mockUseSignStore.mockReturnValueOnce({
      loading: false,
      error: 'Error message',
      submitAgreement: vi.fn(),
    });
    render(<SignForm id="123" />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('calls setAgreement when checkbox is clicked', () => {
    const setAgreement = vi.fn();
    mockUseDocumentStore.mockReturnValueOnce({
      isAgreed: false,
      setAgreement,
    });
    render(<SignForm id="123" />);
    fireEvent.click(screen.getByLabelText('I agree'));
    expect(setAgreement).toHaveBeenCalled();
  });

  it('calls submitAgreement when form is submitted', async () => {
    const submitAgreement = vi.fn();
    mockUseDocumentStore.mockReturnValueOnce({
      isAgreed: true,
      setAgreement: vi.fn(),
    });
    mockUseSignStore.mockReturnValueOnce({
      loading: false,
      error: null,
      submitAgreement,
    });
    render(<SignForm id="123" />);
    fireEvent.click(screen.getByText('Send'));
    expect(submitAgreement).toHaveBeenCalledWith(apiUrl, '123');
  });

  it('disables submit button when not agreed', () => {
    render(<SignForm id="123" />);
    expect(screen.getByText('Send')).toBeDisabled();
  });

  it('enables submit button when agreed', () => {
    mockUseDocumentStore.mockReturnValueOnce({
      isAgreed: true,
      setAgreement: vi.fn(),
    });
    render(<SignForm id="123" />);
    expect(screen.getByText('Send')).not.toBeDisabled();
  });
});
