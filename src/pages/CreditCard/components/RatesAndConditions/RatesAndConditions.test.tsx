import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { RatesAndConditions } from './RatesAndConditions';
import { conditions } from './conditions.consts';

describe('RatesAndConditions', () => {
  it('renders without crashing', () => {
    render(<RatesAndConditions />);
  });

  it('renders the correct titles', () => {
    render(<RatesAndConditions />);
    conditions.forEach((condition) => {
      expect(screen.getByText(condition.title)).toBeInTheDocument();
    });
  });
});
