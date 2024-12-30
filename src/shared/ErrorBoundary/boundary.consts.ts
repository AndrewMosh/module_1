export const statuses = {
  APPROVED: 'Your application has been preapproved',
  CC_APPROVED: 'Your application has been approved by the bank',
  CC_DENIED: ' Your application has been denied by the bank',
  CLIENT_DENIED: 'The application has been denied by the client',
  DOCUMENT_CREATED: 'The document created',
  CREDIT_ISSUED: 'Your credit has been issued',
} as const;

export type StatusKeys = keyof typeof statuses;

export type StatusValues = (typeof statuses)[StatusKeys];
