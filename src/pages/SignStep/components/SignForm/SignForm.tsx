import './SignForm.scss';
import Checkbox from '@shared/UI/Input/Checkbox/Checkbox';
import doc from '@assets/svg/doc.svg';
import { useDocumentStore } from '@store/documetStore/useDocumentStore';
import Button from '@shared/UI/Button/Button';
import pdf from '@assets/pdf/credit-card-offer.pdf';
import { useSignStore } from '@store/signStore/useSignStore';
import Spinner from '@shared/Spinner/Spinner';
import { apiUrl } from '@shared/api/api.consts';
export const SignForm = ({ id }: { id: string }) => {
  const { isAgreed, setAgreement } = useDocumentStore();
  const { isLoading, error, submitAgreement } = useSignStore();

  const handleSubmit = async () => {
    if (isAgreed) {
      await submitAgreement(apiUrl, id);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="sign__error">{error}</p>;
  }
  return (
    <div className="sign">
      <div className="sign__wrapper">
        <div className="sign__header">
          <h2 className="sign__title">Signing of documents</h2>
          <p className="sign__step">Step 4 of 5</p>
        </div>
        <p className="sign__text">
          Information on interest rates under bank deposit agreements with
          individuals. Center for Corporate Information Disclosure. Information
          of a professional participant in the securities market. Information
          about persons under whose control or significant influence the Partner
          Banks are. By leaving an application, you agree to the processing of
          personal data, obtaining information, obtaining access to a credit
          history, using an analogue of a handwritten signature, an offer, a
          policy regarding the processing of personal data, a form of consent to
          the processing of personal data.
        </p>
        <div className="sign__footer">
          <a href={pdf} className="sign__document" download>
            <img src={doc} alt="document" />
            <p className="sign__info">Information on your card</p>
          </a>
          <div className="sign__submit">
            <Checkbox
              label="I agree"
              onChange={setAgreement}
              className="sign__checkbox"
              checked={isAgreed}
            />
            <Button
              className="sign__button"
              onClick={handleSubmit}
              disabled={!isAgreed}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
