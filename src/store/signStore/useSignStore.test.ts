import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useSignStore } from './useSignStore';
import axios from 'axios';
import { setActiveStep } from '@store/activeStepStore/useActiveStepStore';

vi.mock('axios');
vi.mock('@store/activeStepStore/useActiveStepStore');

describe('useSignStore', () => {
	beforeEach(() => {
		useSignStore.setState({
			isAgreed: false,
			loading: false,
			error: null,
			success: false,
		});
	});

	it('should set agreement', () => {
		const { setAgreement } = useSignStore.getState();
		setAgreement(true);
		expect(useSignStore.getState().isAgreed).toBe(true);
	});

	it('should submit agreement successfully', async () => {
		const { submitAgreement } = useSignStore.getState();
		const api = 'http://example.com';
		const id = '123';
		vi.mocked(axios.post).mockResolvedValueOnce({});

		await submitAgreement(api, id);

		expect(useSignStore.getState().loading).toBe(false);
		expect(useSignStore.getState().success).toBe(true);
		expect(useSignStore.getState().error).toBe(null);
		expect(setActiveStep).toHaveBeenCalledWith(4);
	});

	it('should handle error on submit agreement', async () => {
		const { submitAgreement } = useSignStore.getState();
		const api = 'http://example.com';
		const id = '123';
		const errorMessage = 'Network Error';
		vi.mocked(axios.post).mockRejectedValueOnce({
			response: { data: { message: errorMessage } },
		});

		try {
			await submitAgreement(api, id);
		} catch {
			expect(useSignStore.getState().loading).toBe(false);
			expect(useSignStore.getState().success).toBe(false);
			expect(useSignStore.getState().error).toBe(errorMessage);
		}
	});
});