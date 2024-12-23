import './SignForm.scss'
import { Link } from 'react-router-dom'
import Checkbox from '@shared/UI/Input/Checkbox/Checkbox'
import doc from '@assets/svg/doc.svg'
import { useDocumentStore } from '@store/documetStore/useDocumentStore'

export const SignForm=()=> {
	const { isAgreed, setAgreement } = useDocumentStore();
	return (
		<div className="sign">
			<div className='sign__header'>
				<h2 className='sign__title'>Signing of documents</h2>
				<p className='sign__step'>Step 4 of 5</p>
			</div>
			<p className='sign__text'>Information on interest rates under bank deposit agreements with individuals. Center for Corporate Information Disclosure. Information of
a professional participant in the securities market. Information about persons under whose control or significant influence the Partner
Banks are. By leaving an application, you agree to the processing of personal data, obtaining information, obtaining access to a credit
history, using an analogue of a handwritten signature, an offer, a policy regarding the processing of personal data, a form of consent to the
processing of personal data.</p>
<Link to='/'  className='sign__document'>
	<img  src={doc} alt="document" />
	<p className='sign__info'>Information on your card</p>
</Link>
<div className='sign__submit'>
<Checkbox label='I agree' onChange={setAgreement} className='sign__checkbox' checked={isAgreed}/>
</div>

		</div>
	)
}