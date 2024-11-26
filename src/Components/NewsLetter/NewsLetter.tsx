import mail from '@assets/svg/email.svg';
import message from '@assets/svg/message.svg';
import './NewsLetter.scss';

export const NewsLetter = () => {
  return (
    <section className="newsletter">
      <div className="newsletter__container">
        <div className="newsletter__title">Support</div>
        <div className="newsletter__subtitle">Subscribe Newsletter & get</div>
        <div className="newsletter__news">Bank News</div>
        <form className="newsletter__form" action="">
          <div className="newsletter__input">
            <img src={mail} alt="email" />
            <input
              className="newsletter__email"
              type="text"
              placeholder="Your email"
            />
          </div>
          <button className="newsletter__button">
            <img src={message} alt="send" /> Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};
