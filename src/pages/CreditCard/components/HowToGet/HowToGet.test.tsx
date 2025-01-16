import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HowToGet } from './HowToGet';
import { steps } from './how-to.consts';

describe('HowToGet component', () => {
  it('renders the title', () => {
    render(<HowToGet />);
    const titleElement = screen.getByText(/How to get a card/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the step titles correctly', () => {
    render(<HowToGet />);
    steps.forEach((step) => {
      const stepTitleElement = screen.getByText(step.title);
      expect(stepTitleElement).toBeInTheDocument();
    });
  });

  it('renders the step numbers correctly', () => {
    render(<HowToGet />);
    steps.forEach((step) => {
      const stepNumberElement = screen.getByText(step.id.toString());
      expect(stepNumberElement).toBeInTheDocument();
    });
  });
});
