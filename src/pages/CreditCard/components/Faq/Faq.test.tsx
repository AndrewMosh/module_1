import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Faq } from './Faq';
import { card_issue, card_use } from './faq.consts';

describe('Faq Component', () => {
  it('renders card issue title', () => {
    render(<Faq />);
    const cardIssueTitle = screen.getByText(card_issue.title);
    expect(cardIssueTitle).toBeInTheDocument();
  });

  it('renders card use title', () => {
    render(<Faq />);
    const cardUseTitle = screen.getByText(card_use.title);
    expect(cardUseTitle).toBeInTheDocument();
  });

  it('renders card issue accordion items', () => {
    render(<Faq />);
    card_issue.faq.forEach((item) => {
      const accordionItem = screen.getByText(item.question);
      expect(accordionItem).toBeInTheDocument();
    });
  });

  it('renders card use accordion items', () => {
    render(<Faq />);
    card_use.faq.forEach((item) => {
      const accordionItem = screen.getByText(item.question);
      expect(accordionItem).toBeInTheDocument();
    });
  });
});
