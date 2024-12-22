const apiUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:8080';

export const submitDocumentAgreement = async (id: string, agreement: boolean): Promise<void> => {
  const response = await fetch(`${apiUrl}/document/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ agreement }),
  });

  if (!response.ok) {
    throw new Error('Failed to submit form');
  }
};
