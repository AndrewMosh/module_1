import { evenColor, oddColor__aboutCards } from '@shared/UI/Card/card.consts';

export const useCardColors = (cardId: number) => {
  return cardId % 2 === 0 ? oddColor__aboutCards : evenColor;
};
