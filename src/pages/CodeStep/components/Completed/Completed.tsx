import offer from '@assets/images/offer.png';
import { Success, Button } from '@shared';
import { useNavigate } from 'react-router-dom';
import './Completed.scss';
export const Completed = () => {
  const nav = useNavigate();
  return (
    <div className="completed">
      <img src={offer} alt="congratulations" />
      <Success
        title="Congratulations! You have completed your new credit card."
        text="Your credit card will arrive soon. Thank you for choosing us!"
		className='completed__success'
      />
      <Button onClick={() => nav('/')} className="completed__button">
        View other offers of our bank
      </Button>
    </div>
  );
};
