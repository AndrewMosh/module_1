import './Cashback.scss'
import { cashback } from './cashback.consts';
import { Card } from '@components/UI/Card/Card';

export const Cashback=() => {
	return (
		<div className="cashback">
			<div className="cashback__container">
				{cashback.map((card) => (
					<Card
					backgroundColor={card.id % 2 === 0 ? '#88B3B899' : '#EAECEE'}
						offer={card.title}
						percentage={card.percentage}
						key={card.id}
						className='cashback__card'
					/>
				))}
			</div>
		</div>
	);
};