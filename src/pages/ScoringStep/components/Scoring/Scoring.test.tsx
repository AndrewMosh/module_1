import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Scoring } from './Scoring';
import { useParams } from 'react-router-dom';
import { useScoringStore } from '@store';
import { formName } from '../ScoringForm/form.consts';

vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
}));

vi.mock('@store', () => ({
  useScoringStore: vi.fn(),
}));

vi.mock('@pages', () => ({
  ScoringForm: ({ id }: { id: string }) => (
    <div data-testid="scoring-form">ScoringForm for {id}</div>
  ),
  WaitForDecision: ({ id }: { id: string }) => (
    <div data-testid="wait-for-decision">WaitForDecision for {id}</div>
  ),
}));

vi.mock('@shared', () => ({
  CardBase: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-base">{children}</div>
  ),
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="error-boundary">{children}</div>
  ),
}));

describe('Scoring', () => {
  const mockUseParams = useParams as unknown as ReturnType<typeof vi.fn>;
  const mockUseScoringStore = useScoringStore as unknown as ReturnType<
    typeof vi.fn
  >;

  beforeEach(() => {
    vi.clearAllMocks();

    mockUseParams.mockReturnValue({ id: '123' });
    mockUseScoringStore.mockReturnValue({
      forms: {
        [formName]: {
          loading: false,
          success: false,
          error: null,
          data: null,
        },
      },
    });
  });

  it('renders ScoringForm when success is false', () => {
    render(<Scoring />);

    expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
    expect(screen.getByTestId('card-base')).toBeInTheDocument();
    expect(screen.getByTestId('scoring-form')).toHaveTextContent(
      'ScoringForm for 123',
    );
  });

  it('renders WaitForDecision when success is true', () => {
    mockUseScoringStore.mockReturnValue({
      forms: {
        [formName]: {
          loading: false,
          success: true,
          error: null,
          data: null,
        },
      },
    });

    render(<Scoring />);

    expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
    expect(screen.getByTestId('wait-for-decision')).toHaveTextContent(
      'WaitForDecision for 123',
    );
  });

  it('does not render anything if id is missing', () => {
    mockUseParams.mockReturnValue({ id: undefined });

    const { container } = render(<Scoring />);
    expect(container.firstChild).toBeNull();
  });
});
