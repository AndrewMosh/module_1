import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { NotFound } from './NotFound';

describe('NotFound component', () => {
  it('renders the NotFound component', () => {
    render(<NotFound />);
    expect(screen.getByText('Oops....')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(
      screen.getByText(
        'This Page doesn`t exist or was removed! We suggest you go back.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByAltText('404')).toBeInTheDocument();
  });

  it('redirects to home page on button click', () => {
    render(<NotFound />);
    const button = screen.getByRole('button', { name: /home/i });
    userEvent.click(button);
    expect(window.location.href).toBe('http://localhost:3000/');
  });
});
