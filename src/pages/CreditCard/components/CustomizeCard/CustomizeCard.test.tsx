import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CustomizeCard } from './CustomizeCard';
import { useSliderStore } from '@store';
import { formatNumber } from '@utils';

vi.mock('@store', () => ({
  useSliderStore: vi.fn(),
}));

vi.mock('@utils', () => ({
  formatNumber: vi.fn(),
}));

vi.mock('@pages', () => ({
  AmountSlider: () => <div data-testid="amount-slider" />,
}));

describe('CustomizeCard', () => {
  it('renders the component with correct structure', () => {
    (useSliderStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ value: 1000 });
    (formatNumber as unknown as ReturnType<typeof vi.fn>).mockReturnValue('1,000');

    render(<CustomizeCard />);

    expect(screen.getByText('Customize your card')).toBeInTheDocument();
    expect(screen.getByText('Step 1 of 5')).toBeInTheDocument();
    expect(screen.getByTestId('amount-slider')).toBeInTheDocument();
    expect(screen.getByText('You have chosen the amount')).toBeInTheDocument();
    expect(screen.getByText('1,000 ₽')).toBeInTheDocument();
  });

  it('displays the formatted value from the store', () => {
    (useSliderStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ value: 5000 });
    (formatNumber as unknown as ReturnType<typeof vi.fn>).mockReturnValue('5,000');

    render(<CustomizeCard />);

    expect(screen.getByText('5,000 ₽')).toBeInTheDocument();
  });
});
