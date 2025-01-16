import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useApplicationStore } from './useApplicationStore';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

vi.mock('axios');

describe('useApplicationStore', () => {
	beforeEach(() => {
		useApplicationStore.setState({
			data: null,
			loading: false,
			error: null,
			initialized: false,
		});
	});

	it('should initialize with default state', () => {
		const state = useApplicationStore.getState();
		expect(state.data).toBeNull();
		expect(state.loading).toBe(false);
		expect(state.error).toBeNull();
		expect(state.initialized).toBe(false);
	});

	it('should set data and initialized to true on successful fetch', async () => {
		const mockData = { id: 1, name: 'Test Application' };
		vi.mocked(axios.get).mockResolvedValueOnce({ data: mockData });

		const { fetchApplication } = useApplicationStore.getState();
		await act(async () => {
			await fetchApplication(1);
		});

		const state = useApplicationStore.getState();
		expect(state.data).toEqual(mockData);
		expect(state.loading).toBe(false);
		expect(state.error).toBeNull();
		expect(state.initialized).toBe(true);
	});

	it('should set error and initialized to true on fetch failure', async () => {
		vi.mocked(axios.get).mockRejectedValueOnce(new Error('Fetch error'));

		const { fetchApplication } = useApplicationStore.getState();
		await act(async () => {
			await fetchApplication(1);
		});

		const state = useApplicationStore.getState();
		expect(state.data).toBeNull();
		expect(state.loading).toBe(false);
		expect(state.error).toBe('Error fetching data or this application does not exist');
		expect(state.initialized).toBe(true);
	});
});