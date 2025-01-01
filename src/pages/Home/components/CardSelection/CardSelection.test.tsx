import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { CardSelection } from './CardSelection';
import { cards } from './Cards';

describe('CardSelection', () => {
	it('renders the title correctly', () => {
		render(<CardSelection />);
		const titleElement = screen.getByText(/Choose the design you like and apply for a card right now/i);
		expect(titleElement).toBeInTheDocument();
	});

	it('renders the button correctly', () => {
		render(<CardSelection />);
		const buttonElement = screen.getByText(/Choose the card/i);
		expect(buttonElement).toBeInTheDocument();
	});

	it('renders all cards correctly', () => {
		render(<CardSelection />);
		cards.forEach(card => {
			const cardElement = screen.getByAltText(card.alt);
			expect(cardElement).toBeInTheDocument();
			expect(cardElement).toHaveAttribute('src', card.image);
		});
	});
});