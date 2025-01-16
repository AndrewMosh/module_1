import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Cashback } from './Cashback';
import { cashback  } from './cashback.consts';



describe('Cashback Component', () => {
  it('should render the Cashback component', () => {
    render(<Cashback />);
    const cashbackElement = screen.getByTestId('cashback');
    expect(cashbackElement).toBeInTheDocument();
  });

it('should render the correct number of Card components', () => {
	render(<Cashback />);
	const cardElements = screen.getAllByRole('cashback-card'); 
	expect(cardElements).toHaveLength(cashback.length);
});

  it('should render Card components with correct props', () => {
    render(<Cashback />);
    cashback.forEach((card) => {
      const cardElement = screen.getByText(card.title);
      expect(cardElement).toBeInTheDocument();
    });
  });
});
