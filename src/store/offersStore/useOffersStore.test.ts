import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useOffersStore } from './useOffersStore';
import axios from 'axios';
import { apiUrl } from '@shared';

vi.mock('axios');
vi.mock('@store/activeStepStore/useActiveStepStore', () => ({
	setActiveStep: vi.fn(),
}));

describe('useOffersStore', () => {
	const offers = [
		{
			applicationId: '123',
			requestedAmount:13123,
			totalAmount: 12,
			term: 6,
			monthlyPayment: 100,
			isSalaryClient: true,
			rate: 15,
			isInsuranceEnabled: true,
			uniqueId: 'offer1',
		},
		{
			applicationId: '123',
			requestedAmount:13123,
			totalAmount: 12,
			term: 6,
			monthlyPayment: 100,
			isSalaryClient: true,
			rate: 15,
			isInsuranceEnabled: true,
			uniqueId: 'offer2',
		},
		{
			applicationId: '123',
			requestedAmount:13123,
			totalAmount: 12,
			term: 6,
			monthlyPayment: 100,
			isSalaryClient: true,
			rate: 15,
			isInsuranceEnabled: true,
			uniqueId: 'offer3',
		},
		
	]
	beforeEach(() => {
		useOffersStore.setState({
			selectedOfferId: null,
			success: false,
			loading: false,
			error: false,
		});
	});

	it('should set selectedOfferId', () => {
		const { setSelectedOfferId } = useOffersStore.getState();
		setSelectedOfferId('offer1');
		expect(useOffersStore.getState().selectedOfferId).toBe('offer1');
		setSelectedOfferId('offer1');
		expect(useOffersStore.getState().selectedOfferId).toBe(null);
	});

	it('should set success', () => {
		const { setSuccess } = useOffersStore.getState();
		setSuccess(true);
		expect(useOffersStore.getState().success).toBe(true);
	});

	it('should submit offer successfully', async () => {
		const { submitOffer, setSelectedOfferId } = useOffersStore.getState();
		setSelectedOfferId('offer1');
		vi.mocked(axios.post).mockResolvedValue({ status: 200 });

		await submitOffer(apiUrl, offers);

		expect(useOffersStore.getState().loading).toBe(false);
		expect(useOffersStore.getState().success).toBe(true);
		expect(useOffersStore.getState().error).toBe(false);
	
	});

	it('should handle submit offer error', async () => {
		const { submitOffer, setSelectedOfferId } = useOffersStore.getState();
		setSelectedOfferId('offer1');
		vi.mocked(axios.post).mockRejectedValue(new Error('Network Error'));

		await submitOffer(apiUrl, offers);

		expect(useOffersStore.getState().success).toBe(false);
		expect(useOffersStore.getState().error).toBe(true);
	});
});