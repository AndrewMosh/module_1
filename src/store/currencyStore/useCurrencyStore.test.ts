import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useCurrencyStore } from './useCurrencyStore';
import axios from 'axios';

vi.mock('axios');

describe('useCurrencyStore', () => {
	beforeEach(() => {
		useCurrencyStore.setState({
			rates: null,
			loading: false,
			error: null,
		});
	});

	it('should set loading to true when fetchRates is called', async () => {
		const { fetchRates } = useCurrencyStore.getState();
		fetchRates('USD', ['EUR', 'GBP']);
		expect(useCurrencyStore.getState().loading).toBe(true);
	});

	it('should fetch and set rates correctly', async () => {
		const mockData = {
			conversion_rates: {
				EUR: 0.85,
				GBP: 0.75,
			},
		};
		vi.mocked(axios.get).mockResolvedValue({ data: mockData });

		const { fetchRates } = useCurrencyStore.getState();
		await fetchRates('USD', ['EUR', 'GBP']);

		expect(useCurrencyStore.getState().rates).toEqual({
			EUR: 0.85,
			GBP: 0.75,
		});
		expect(useCurrencyStore.getState().loading).toBe(false);
		expect(useCurrencyStore.getState().error).toBe(null);
	});

	it('should handle errors correctly', async () => {
		const mockError = {
			response: {
				data: {
					error: 'Произошла ошибка',
				},
			},
		};
		vi.mocked(axios.get).mockRejectedValue(mockError);

		const { fetchRates } = useCurrencyStore.getState();
		await fetchRates('USD', ['EUR', 'GBP']);

		expect(useCurrencyStore.getState().error).toBe(mockError.response.data.error);
		expect(useCurrencyStore.getState().loading).toBe(false);
	});

	it('should handle non-Axios errors correctly', async () => {
		vi.mocked(axios.get).mockRejectedValue(new Error('Non-Axios error'));

		const { fetchRates } = useCurrencyStore.getState();
		await fetchRates('USD', ['EUR', 'GBP']);

		expect(useCurrencyStore.getState().error).toBe('Произошла ошибка');
		expect(useCurrencyStore.getState().loading).toBe(false);
	});
});