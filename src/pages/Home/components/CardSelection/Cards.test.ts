import { describe, it, expect } from 'vitest';
import { cards } from './Cards';

describe('cards', () => {
	it('should be defined', () => {
		expect(cards).toBeDefined();
	});

	it('should have 4 cards', () => {
		expect(cards.length).toBe(4);
	});

	it('each card should have id, image, and alt properties', () => {
		cards.forEach(card => {
			expect(card).toHaveProperty('id');
			expect(card).toHaveProperty('image');
			expect(card).toHaveProperty('alt');
		});
	});

	it('each card should have correct id', () => {
		cards.forEach((card, index) => {
			expect(card.id).toBe(index + 1);
		});
	});

	it('each card should have correct alt text', () => {
		cards.forEach((card, index) => {
			expect(card.alt).toBe(`Card ${index + 1}`);
		});
	});
});