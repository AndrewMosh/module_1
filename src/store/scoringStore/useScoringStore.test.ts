import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useScoringStore } from './useScoringStore';
import axios from 'axios';
import { setActiveStep } from '@store/activeStepStore/useActiveStepStore';
import { TScore } from '@pages/ScoringStep/components/ScoringForm/form.types';

vi.mock('axios');
vi.mock('@store/activeStepStore/useActiveStepStore', () => ({
	setActiveStep: vi.fn(),
}));

describe('useScoringStore', () => {
	const data: TScore = {
	gender: 'MALE',
	maritalStatus: 'MARRIED',
	dependentAmount: 2,
	passportIssueDate: '03.11.1988',
	passportIssueBranch: '02.11.2009',
	employment: {
	  employmentStatus: 'BUSINESS_OWNER',
	  employerINN: '2323432434',
	  salary: '2323232',
	  position: 'OWNER',
	  workExperienceTotal: '12',
	  workExperienceCurrent: 12,
	},
	account: '1212321323'
	}
	const formName = 'testForm';
		const endpoint = '/test-endpoint';
	beforeEach(() => {
		useScoringStore.setState({ forms: {} });
	});

	it('should initialize with empty forms', () => {
		const { forms } = useScoringStore.getState();
		expect(forms).toEqual({});
	});

	it('should set form state to loading when submitForm is called', async () => {
		const { submitForm } = useScoringStore.getState();
		const formName = 'testForm';
		const endpoint = '/test-endpoint';
		

		submitForm(formName, endpoint, data, 'test-id');

		const { forms } = useScoringStore.getState();
		expect(forms[formName]).toEqual({
			loading: true,
			success: false,
			error: null,
			data: null,
		});
	});

	it('should set form state to success when submitForm succeeds', async () => {
		vi.mocked(axios.put).mockResolvedValueOnce({});
		const { submitForm } = useScoringStore.getState();
		await submitForm(formName, endpoint, data, 'test-id');

		const { forms } = useScoringStore.getState();
		expect(forms[formName]).toEqual({
			loading: false,
			success: true,
			error: null,
			data: null,
		});
		expect(setActiveStep).toHaveBeenCalledWith(2);
	});

	it('should set form state to error when submitForm fails', async () => {
		const errorMessage = 'Request failed';
		vi.mocked(axios.put).mockRejectedValueOnce({ response: { data: { message: errorMessage } } });
		const { submitForm } = useScoringStore.getState();
		


		await submitForm(formName, endpoint, data, 'test-id');

		const { forms } = useScoringStore.getState();
		expect(forms[formName]).toEqual({
			loading: false,
			success: false,
			error: errorMessage,
			data: null,
		});
	});

	it('should reset form state when resetFormState is called', () => {
		const { resetFormState, submitForm } = useScoringStore.getState();
		submitForm(formName, endpoint, data, 'test-id');
		resetFormState(formName);

		const { forms } = useScoringStore.getState();
		expect(forms[formName]).toEqual({
			loading: false,
			success: false,
			error: null,
			data: null,
		});
	});
});