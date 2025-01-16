import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DocumentStep } from './DocumentStep';
import { useDocumentStore } from '@store';

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useParams: () => ({ id: '123' }),
}));

vi.mock('@store', () => ({
  useDocumentStore: vi.fn(),
}));

vi.mock('@shared', () => ({
  Layout: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  CardBase: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock('@pages', () => ({
  Document: ({ id }: { id: string }) => <div>Document {id}</div>,
  Formed: () => <div>Formed</div>,
}));

describe('DocumentStep', () => {
  it('renders Formed component when success is true', () => {
    (useDocumentStore  as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ success: true });

    const { getByText } = render(
        <DocumentStep />
    );

    expect(getByText('Formed')).toBeInTheDocument();
  });

  it('renders Document component when success is false', () => {
    (useDocumentStore  as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ success: false });

    const { getByText } = render(
        <DocumentStep />
    );

    expect(getByText('Document 123')).toBeInTheDocument();
  });

  it('renders ErrorBoundary with correct props', () => {
    (useDocumentStore  as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ success: false });

    const { container } = render(
        <DocumentStep />
    );

    expect(container.querySelector('div')).toHaveTextContent('Document 123');
  });
});
