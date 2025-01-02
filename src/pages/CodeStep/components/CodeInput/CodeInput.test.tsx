import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useCodeStore } from '@store';
import { CodeInput } from './CodeInput';

vi.mock('@store', () => ({
  useCodeStore: vi.fn(),
}));

describe('CodeInput Component', () => {
  let mockSetCode: ReturnType<typeof vi.fn>;
  let mockSendCode: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockSetCode = vi.fn();
    mockSendCode = vi.fn().mockResolvedValue(true);

    (useCodeStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      code: ['', '', '', ''], 
      setCode: mockSetCode,
      sendCode: mockSendCode,
      error: '',
      loading: false,
    });
  });

  it('renders input fields correctly', () => {
    render(<CodeInput id="test-id" />);

    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(4);
  });

  it('allows typing in inputs and focuses next field', async () => {
    render(<CodeInput id="test-id" />);

    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: '1' } });

    expect(mockSetCode).toHaveBeenCalledWith(0, '1');
    await waitFor(() => expect(inputs[1]).toHaveFocus());
  });

  it('sends the code when all fields are filled', async () => {
    render(<CodeInput id="test-id" />);

    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: '1' } });
    fireEvent.change(inputs[1], { target: { value: '2' } });
    fireEvent.change(inputs[2], { target: { value: '3' } });
    fireEvent.change(inputs[3], { target: { value: '4' } });

    await waitFor(() => expect(mockSendCode).toHaveBeenCalledWith('test-id'));
  });

  it('deletes value and moves focus backward on Backspace', () => {
    render(<CodeInput id="test-id" />);

    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[1], { target: { value: '2' } });
    fireEvent.keyDown(inputs[1], { key: 'Backspace' });

    expect(mockSetCode).toHaveBeenCalledWith(0, '');
    expect(inputs[0]).toHaveFocus();
  });
 
  it('displays error message when error is present', () => {
    (useCodeStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      code: ['', '', '', ''],
      setCode: mockSetCode,
      sendCode: mockSendCode,
      error: 'Invalid code',
      loading: false,
    });

    render(<CodeInput id="test-id" />);
    expect(screen.getByText('Invalid code')).toBeInTheDocument();
  });
});
