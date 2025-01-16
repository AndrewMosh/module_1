import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useDocumentStore } from './useDocumentStore';
import axios from 'axios';
import { setActiveStep } from '@store/activeStepStore/useActiveStepStore';

vi.mock('axios');
vi.mock('@store/activeStepStore/useActiveStepStore', () => ({
	setActiveStep: vi.fn(),
}));

describe('useDocumentStore', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should set agreement', () => {
		const { setAgreement } = useDocumentStore.getState();
		setAgreement(true);
		expect(useDocumentStore.getState().isAgreed).toBe(true);
	});

	it('should handle successful agreement submission', async () => {
		const { sendAgreement} = useDocumentStore.getState();
		const mockResponse = { status: 200 };
		vi.mocked(axios.post).mockResolvedValue(mockResponse);

		await sendAgreement('123');
		expect(useDocumentStore.getState().success).toBe(true);

		expect(setActiveStep).toHaveBeenCalledWith(3);
	});


	it('should handle unknown error during agreement submission', async () => {
		const { sendAgreement } = useDocumentStore.getState();
		vi.mocked(axios.post).mockRejectedValue(new Error('Unknown error'));

		await sendAgreement('123');

		expect(useDocumentStore.getState().error).toBe('Unknown error');
		
		expect(setActiveStep).not.toHaveBeenCalled();

		vi.mocked(axios.get).mockRejectedValue(new Error('Non-Axios error'));

	});
});