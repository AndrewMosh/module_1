import card1 from '../../assets/images/cardImage1.jpg';
import card2 from '../../assets/images/cardImage2.jpg';
import card3 from '../../assets/images/cardImage3.jpg';
import card4 from '../../assets/images/cardImage4.jpg';


type TCard = {
	id: number;
	image: string;
	alt: string;
}

export const cards: TCard[] = [
	{ id: 1, image: card1, alt: 'Card 1' },
	{ id: 2, image: card2, alt: 'Card 2' },
	{ id: 3, image: card3, alt: 'Card 3' },
	{ id: 4, image: card4, alt: 'Card 4' },
  ];
  