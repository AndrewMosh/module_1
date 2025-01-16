import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { useNewsStore } from './useNewsStore';
import { act } from 'react-dom/test-utils';

vi.mock('axios');

describe('useNewsStore', () => {
	beforeEach(() => {
		useNewsStore.setState({
			news: [],
			loading: false,
			error: null,
		});
	});

	it('should set loading to true when fetchNews is called', async () => {
		vi.mocked(axios.get).mockResolvedValue({ data: { articles: [] } });

		act(() => {
			useNewsStore.getState().fetchNews();
		});

		expect(useNewsStore.getState().loading).toBe(true);
	});

	it('should fetch news and update the store', async () => {
		const articles = [
			{
				urlToImage: 'https://example.com/image.jpg',
				description: '<p>Test description</p>',
			},
		];
		vi.mocked(axios.get).mockResolvedValue({ data: { articles } });
		vi.mocked(axios.head).mockResolvedValue({ status: 200 });

		await act(async () => {
			await useNewsStore.getState().fetchNews();
		});

		expect(useNewsStore.getState().news).toEqual([
			{
				urlToImage: 'https://example.com/image.jpg',
				description: 'Test description',
			},
		]);
		expect(useNewsStore.getState().loading).toBe(false);
		expect(useNewsStore.getState().error).toBe(null);
	});

	it('should handle errors when fetching news', async () => {
		const errorMessage = 'Failed to fetch news';
		vi.mocked(axios.get).mockRejectedValue(new Error(errorMessage));

		await act(async () => {
			await useNewsStore.getState().fetchNews();
		});

		expect(useNewsStore.getState().error).toBe(errorMessage);
		expect(useNewsStore.getState().loading).toBe(false);
	});

	it('should filter out articles with invalid images', async () => {
		const articles = [
			{
				urlToImage: 'https://example.com/valid-image.jpg',
				description: '<p>Valid description</p>',
			},
			{
				urlToImage: 'https://example.com/invalid-image.jpg',
				description: '<p>Invalid description</p>',
			},
		];
		vi.mocked(axios.get).mockResolvedValue({ data: { articles } });
		vi.mocked(axios.head)
			.mockResolvedValueOnce({ status: 200 })
			.mockRejectedValueOnce(new Error('Not Found'));

		await act(async () => {
			await useNewsStore.getState().fetchNews();
		});

		expect(useNewsStore.getState().news).toEqual([
			{
				urlToImage: 'https://example.com/valid-image.jpg',
				description: 'Valid description',
			},
		]);
		expect(useNewsStore.getState().loading).toBe(false);
		expect(useNewsStore.getState().error).toBe(null);
	});
});