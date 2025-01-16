import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useCodeStore } from './useCodeStore';
import axios from 'axios';

vi.mock('axios');

describe('useCodeStore', () => {
	beforeEach(() => {
		useCodeStore.setState({
			code: ['', '', '', ''],
			error: null,
			loading: false,
			success: false,
		});
	});

	it('should set code correctly', () => {
		const { setCode } = useCodeStore.getState();
		setCode(0, '1234');
		expect(useCodeStore.getState().code[0]).toBe('1234');
	  });

	it('should clear code correctly', () => {
		const { clearCode, code } = useCodeStore.getState();
		clearCode();
		expect(code).toEqual(['', '', '', '']);
	});

	it('should handle sendCode success', async () => {
		const mockResponse = { status: 200 };
		vi.mocked(axios.post).mockResolvedValue(mockResponse);

		const { sendCode } = useCodeStore.getState();
		await sendCode('1253');

		const { success, loading } = useCodeStore.getState();
		expect(loading).toBe(false);
		expect(success).toBe(true);
	});

	it('should handle sendCode error', async () => {
		const mockError = {
			response: {
				data: {
					message: 'Invalid confirmation code',
				},
			},
		};
		vi.mocked(axios.post).mockRejectedValue(mockError);

		const { sendCode } = useCodeStore.getState();
		await sendCode('1234');

		const { error, loading, code } = useCodeStore.getState();
		expect(loading).toBe(false);
		expect(error).toBe('Invalid confirmation code');
		expect(code).toEqual(['', '', '', '']);
	});
});