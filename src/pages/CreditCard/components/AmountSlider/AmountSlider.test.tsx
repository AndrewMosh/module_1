import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AmountSlider } from './AmountSlider';
import { useSliderStore } from '@store';
import { useSliderBackground } from './hooks/useSliderBackground';

vi.mock('@store', () => ({
  useSliderStore: vi.fn(),
}));

vi.mock('./hooks/useSliderBackground', () => ({
  useSliderBackground: vi.fn(),
}));

describe('AmountSlider', () => {
  it('renders correctly', () => {
    (useSliderStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      value: 15000,
      setValue: vi.fn(),
    });

    render(<AmountSlider />);

    expect(screen.getByText('Select amount')).toBeInTheDocument();
    expect(screen.getByText('15 000')).toBeInTheDocument();
    expect(screen.getByText('600 000')).toBeInTheDocument();
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('displays the correct initial value', () => {
    (useSliderStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      value: 15000,
      setValue: vi.fn(),
    });

    render(<AmountSlider />);

    expect(screen.getByText('15000')).toBeInTheDocument();
    expect(screen.getByRole('slider')).toHaveValue('15000');
  });

  it('calls setValue on slider change', () => {
    const setValueMock = vi.fn();
    (useSliderStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      value: 15000,
      setValue: setValueMock,
    });

    render(<AmountSlider />);

    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '20000' } });

    expect(setValueMock).toHaveBeenCalledWith(20000);
  });

  it('calls useSliderBackground with the correct value', () => {
    (useSliderStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      value: 15000,
      setValue: vi.fn(),
    });

    render(<AmountSlider />);

    expect(useSliderBackground).toHaveBeenCalledWith(15000);
  });
});
