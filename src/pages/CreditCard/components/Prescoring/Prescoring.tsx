import { AmountSlider } from "../AmountSlider/AmountSlider"
import { PrescoringForm } from "../PrescoringForm/PrescoringForm"

export const Prescoring = () => {
	return (
		<div id='prescoring' className="prescoring">
			<div className="prescoring__container">
				<AmountSlider />
				<PrescoringForm />
			</div>
		</div>
	)
}