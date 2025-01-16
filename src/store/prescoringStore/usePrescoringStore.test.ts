import { describe, it, expect, vi, beforeEach } from 'vitest';
import { usePrescoringStore } from './usePrescoringStore';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

vi.mock('axios');

const mockData = {  firstName: 'dssd',
	lastName: 'sdsddsd',
	middleName:  null,
	email: 'dsdsds@mail.ru',
	birthdate: '03.11.1988',
	passportSeries: '232323',
	passportNumber: '32323',
	term: 6,
	amount: 12,
};
const mockEndpoint = '/api/submit';
const mockCriteria: { key: keyof typeof mockData; order: 'asc' | 'desc' }[] = [{ key: 'firstName', order: 'asc' }];
const mockFormName = 'testForm';

describe('usePrescoringStore', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it('should initialize with empty forms', () => {
		const { forms } = usePrescoringStore.getState();
		expect(forms).toEqual({});
	});

	it('should handle successful form submission', async () => {
		const mockResponse = { data: [{ applicationId: '123', ...mockData }] };
		vi.mocked(axios.get).mockResolvedValue(mockResponse);

		const { submitForm } = usePrescoringStore.getState();

		await act(async () => {
			await submitForm(mockFormName, mockData, mockEndpoint, mockCriteria);
		});

		expect(usePrescoringStore.getState().forms[mockFormName].loading).toBe(false);
	});

	it('should handle form submission error', async () => {
		const mockError = { response: { data: { message: 'Something went wrong, try again later' } } };
		vi.mocked(axios.post).mockRejectedValue(mockError);

		const { submitForm } = usePrescoringStore.getState();

		await act(async () => {
			await submitForm(mockFormName, mockData, mockEndpoint, mockCriteria);
		});

		expect(usePrescoringStore.getState().forms[mockFormName].loading).toBe(false);
		expect(usePrescoringStore.getState().forms[mockFormName].success).toBe(false);
		expect(usePrescoringStore.getState().forms[mockFormName].error).toBe('Something went wrong, try again later');
	});

	it('should reset form state', () => {
		const { resetFormState} = usePrescoringStore.getState();

		act(() => {
			resetFormState(mockFormName);
		});

		expect(usePrescoringStore.getState().forms[mockFormName]).toEqual({
			loading: false,
			success: false,
			error: null,
			data: null,
		});
	});

	it('should restore form state from localStorage', () => {
		const savedState = {
			[mockFormName]: {
				loading: false,
				success: true,
				error: null,
				data: mockData,
			},
		};
		localStorage.setItem('formStore', JSON.stringify(savedState));

		const { restoreFormState } = usePrescoringStore.getState();

		act(() => {
			restoreFormState();
		});

		expect(usePrescoringStore.getState().forms).toEqual(savedState);
	});
});