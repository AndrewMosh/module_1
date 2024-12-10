import mail from '@assets/svg/email.svg';
import message from '@assets/svg/message.svg';
import './NewsLetter.scss';
import useSubscriptionStore from '@store/subscribtionStore/useSubscriptionStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { subscribed } from './NewsLetter.consts';
import { SubscriptionFormData, subscriptionSchema } from './subscription.types';

export const NewsLetter = () => {
  const { isSubscribed, subscribe } = useSubscriptionStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionSchema),
  });

  const onSubmit = async (data: SubscriptionFormData) => {
    try {
      await subscribe(data.email);
      reset();
    } catch (err) {
      console.error('Subscription error:', err);
    }
  };

  return (
    <section className="newsletter">
      <div className="newsletter__container">
        <div className="newsletter__title">Support</div>
        <div className="newsletter__subtitle">Subscribe Newsletter & get</div>
        <div className="newsletter__news">Bank News</div>

        {isSubscribed ? (
          <p className="newsletter__subscribed">{subscribed}</p>
        ) : (
          <form className="newsletter__form" onSubmit={handleSubmit(onSubmit)}>
            <div className="newsletter__input">
              <img src={mail} alt="email" />
              <input
                {...register('email')}
                className="newsletter__email"
                type="email"
                placeholder="Your email"
              />
            </div>
            <button className="newsletter__button">
              <img src={message} alt="send" /> Subscribe
            </button>
          </form>
        )}
        {errors.email && (
          <p className="newsletter__error">{errors.email.message}</p>
        )}
      </div>
    </section>
  );
};
