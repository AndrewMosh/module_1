import { offers } from "./platinum.consts"
import image from '@assets/images/platinum.png'
import './PlatinumCard.scss'
import Button from "@components/UI/Button/Button";

export const PlatinumCard = () => {
	return <div className="platinum-card">
		<div className="platinum-card__container">
			<div className="platinum-card__inner">
				<h2 className="platinum-card__title">Platinum digital credit card</h2>
				<p className="platinum-card__text">Our best credit card. Suitable for everyday spending and shopping.
				Cash withdrawals and transfers without commission and interest.</p>
				<div className="platinum-card__offers">
					{offers.map((offer) => (
						<div key={offer.id} className="platinum-card__offer">
							<p className="platinum-card__offer-title">{offer.offer}</p>
							<p className="platinum-card__offer-percentage">{offer.percentage}</p>
						</div>
					))}
				</div>
				<Button className="platinum-card__button">Apply for card</Button>
			</div>
			<div className="platinum-card__image">
				<img  src={image} alt="card" />
			</div>
		</div>

	</div>;
};