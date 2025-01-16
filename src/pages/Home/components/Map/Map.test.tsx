import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Map } from './Map';

describe('Map component', () => {
  it('renders correctly', () => {
    const { getByText, getByAltText } = render(<Map />);

    expect(
      getByText('You can use our services anywhere in the world'),
    ).toBeInTheDocument();
    expect(
      getByText('Withdraw and transfer money online through our application'),
    ).toBeInTheDocument();
    expect(getByAltText('map')).toBeInTheDocument();
  });
});
