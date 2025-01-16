import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Features } from './Features';
import { features } from './features.consts';

describe('Features Component', () => {
  it('renders the Features section', () => {
    render(<Features />);
    const section = screen.getByLabelText('Features Section');
    expect(section).toBeInTheDocument();
  });

  it('renders the illustration image', () => {
    render(<Features />);
    const img = screen.getByAltText('illustration');
    expect(img).toBeInTheDocument();
  });

  it('renders the title', () => {
    render(<Features />);
    const title = screen.getByText('We Provide Many Features You Can Use');
    expect(title).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<Features />);
    const subtitle = screen.getByText(
      'You can explore the features that we provide with fun and have their own functions for each feature.',
    );
    expect(subtitle).toBeInTheDocument();
  });

  it('renders the list of features', () => {
    render(<Features />);
    features.forEach((feature) => {
      const featureItem = screen.getByText(feature.title);
      expect(featureItem).toBeInTheDocument();
    });
  });
});
