import './NewsLetter.scss';
import mail from '@assets/svg/email.svg';
import message from '@assets/svg/message.svg';
import { subscribed } from './NewsLetter.consts';
import useSubscription from './hooks/useSubscription';
import useFormValidation from './hooks/useFormValidation';

export const NewsLetter = () => {
  const { isSubscribed, isSubmitting, handleSubscribe } = useSubscription();
  const { register, handleSubmit, errors, reset } = useFormValidation();

  const onSubmit = async (data: { email: string }) => {
    await handleSubscribe(data.email);
    reset();
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
            <button
              className="newsletter__button"
              disabled={isSubmitting}
            >
              <img src={message} alt="send" /> Subscribe
            </button>
          </form>
        )}

        {errors.email && <p className="newsletter__error">{errors.email.message}</p>}
      </div>
    </section>
  );
};
