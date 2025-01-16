import { describe, it, expect, vi } from 'vitest';
import { useModalStore } from './useModalStore';
import axios from 'axios';

vi.mock('axios');

describe('useModalStore', () => {
	it('should open the modal', () => {
		const { openModal } = useModalStore.getState();
		openModal();
		expect(useModalStore.getState().showModal).toBe(true);
	});

	it('should close the modal', () => {
		const { closeModal } = useModalStore.getState();
		closeModal();
		expect(useModalStore.getState().showModal).toBe(false);
		expect(useModalStore.getState().success).toBe(false);
		expect(useModalStore.getState().error).toBe(null);
	});

	it('should handle denyApplication success', async () => {
		const { denyApplication } = useModalStore.getState();
		const mockResponse = { status: 200 };
		vi.mocked(axios.post).mockResolvedValueOnce(mockResponse);

		await denyApplication('123');

		expect(useModalStore.getState().loading).toBe(false);
		expect(useModalStore.getState().success).toBe(true);
		expect(useModalStore.getState().error).toBe(null);
	});


	it('should handle denyApplication unknown error', async () => {
		const { denyApplication } = useModalStore.getState();
		vi.mocked(axios.post).mockRejectedValueOnce(new Error('Unknown error'));

		await denyApplication('123');

		expect(useModalStore.getState().loading).toBe(false);
		expect(useModalStore.getState().error).toBe('Unknown error');
	});
});