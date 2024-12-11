import useFormStore from '@store/formStore/useFormStore';
import { TOffers } from './offers.types';
import { CardBase } from '@shared/UI/Card/CardBase/CardBase';
import pic from '@assets/images/offer.png';
import success from '@assets/svg/success.svg';
import error from '@assets/svg/error.svg';
import Button from '@shared/UI/Button/Button';
import './Offers.scss';
import { formatNumber } from '@utils/formatNumber';

export const Offers = () => {
  const { forms } = useFormStore();
  const offers: TOffers[] | null = forms.contactForm.data;

  const renderIcon = (condition: boolean) => (
    <img
      className="offers__icon"
      src={condition ? success : error}
      alt={condition ? 'success' : 'error'}
    />
  );

  return (
    <div className="offers">
      {offers?.map((offer) => (
        <CardBase key={offer.applicationId} className="offers__card">
          <img src={pic} alt="offer" className="offers__img" />
          <p>
            Requested amount: {formatNumber({ value: offer.requestedAmount })} ₽
          </p>
          <p>Total amount: {formatNumber({ value: offer.totalAmount })} ₽</p>
          <p>For {offer.term} months</p>
          <p>
            Monthly payment: {formatNumber({ value: offer.monthlyPayment })} ₽
          </p>
          <p>Your rate: {offer.rate}%</p>
          <p>
            Insurance included {renderIcon(offer.isInsuranceEnabled)}
          </p>
          <p>
            Salary client {renderIcon(offer.isSalaryClient)}
          </p>
          <Button className="offers__button">Select</Button>
        </CardBase>
      ))}
    </div>
  );
};