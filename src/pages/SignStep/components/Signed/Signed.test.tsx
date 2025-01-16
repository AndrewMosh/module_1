import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Signed } from './Signed';

describe('Signed Component', () => {
  it('renders the Success component with correct title and text', () => {
    render(<Signed />);

    expect(
      screen.getByText(
        'Documents have been successfully signed and sent for approval',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Within 10 minutes you will be sent a PIN code to your email for confirmation',
      ),
    ).toBeInTheDocument();
  });
});
