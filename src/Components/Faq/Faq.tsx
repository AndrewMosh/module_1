import {Accordion} from '@components/UI/Accordion/Accordion';
import './Faq.scss';
import { card_issue, card_use } from './faq.consts';


export const Faq = () => {
	return (
		<div className="faq">
			<div className="faq__container">
				<h2 className="faq__title">{card_issue.title}</h2>
				<Accordion items={card_issue.faq} />
				<h2 className="faq__title">{card_use.title}</h2>
				<Accordion items={card_use.faq} />
			</div>
		</div>
	);
}