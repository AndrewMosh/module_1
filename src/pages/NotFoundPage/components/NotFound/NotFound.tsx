import {Button} from '@shared';
import notFound from '@assets/images/404.png';
import './NotFound.scss';
export const NotFound = () => {
  return (
      <div className="not-found">
        <div className="not-found__container">
          <div className="not-found__inner">
            <div className="not-found__oops">Oops....</div>
            <div className="not-found__title">Page not found</div>
            <div className="not-found__text">
              This Page doesn`t exist or was removed! We suggest you go back.
            </div>
            <Button
              className="not-found__button"
              onClick={() => { window.location.href = '/'; }}
            >
              Home
            </Button>
          </div>
          <div className="not-found__image">
            <img src={notFound} alt="404" className="not-found__image" />
          </div>
        </div>
      </div>
  );
};
