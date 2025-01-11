import { useMemo } from 'react';
import { usePrescoringStore, useOffersStore } from '@store';
import { TOffers } from './offers.types';
import { CardBase, Spinner, apiUrl, Button } from '@shared';
import pic from '@assets/images/offer.png';
import success from '@assets/svg/success.svg';
import error from '@assets/svg/error.svg';
import './Offers.scss';
import { formatNumber } from '@utils';
import { v4 as uuidv4 } from 'uuid';
import { SentToEmail } from '@pages';

export const Offers = () => {
  const { forms } = usePrescoringStore();
  const offers: TOffers[] | null = Array.isArray(forms.contactForm.data)
    ? forms.contactForm.data
    : null;
  const {
    setSelectedOfferId,
    selectedOfferId,
    submitOffer,
    success: isSuccess,
    error: isError,
    loading: isLoading,
  } = useOffersStore();

  const renderIcon = (condition: boolean) => (
    <img
      className="offers__icon"
      src={condition ? success : error}
      alt={condition ? 'success' : 'error'}
    />
  );

  const handleCardClick = (offerId: string) => {
    setSelectedOfferId(offerId);
  };

  const offersWithIds = useMemo(() => {
    return offers?.map((offer) => ({ ...offer, uniqueId: uuidv4() }));
  }, [offers]);

  const handleSubmit = () => {
    if (offersWithIds) {
      submitOffer(apiUrl, offersWithIds);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div className="offers__error">Something went wrong</div>;
  }

  return (
    <>
      {isSuccess ? (
        <SentToEmail />
      ) : (
        <div className="offers">
          {offersWithIds?.map((offer) => (
            <CardBase
              key={offer.uniqueId}
              className={
                selectedOfferId === offer.uniqueId
                  ? 'offers__card--selected'
                  : 'offers__card'
              }
              onClick={() => {
                handleCardClick(offer.uniqueId);
              }}
            >
              <img src={pic} alt="offer" className="offers__img" />
              <p>
                Requested amount:{' '}
                {formatNumber({ value: offer.requestedAmount })} ₽
              </p>
              <p>
                Total amount: {formatNumber({ value: offer.totalAmount })} ₽
              </p>
              <p>For {offer.term} months</p>
              <p>
                Monthly payment: {formatNumber({ value: offer.monthlyPayment })}{' '}
                ₽
              </p>
              <p>Your rate: {offer.rate}%</p>
              <p>Insurance included {renderIcon(offer.isInsuranceEnabled)}</p>
              <p>Salary client {renderIcon(offer.isSalaryClient)}</p>
              <Button
                className="offers__button"
                onClick={
                  selectedOfferId === offer.uniqueId ? handleSubmit : undefined
                }
              >
                {selectedOfferId === offer.uniqueId
                  ? 'Continue registration'
                  : 'Select'}
              </Button>
            </CardBase>
          ))}
        </div>
      )}
    </>
  );
};
