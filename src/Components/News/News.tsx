import React, { useEffect, useState } from 'react';
import './News.scss';
import { useNewsStore } from '@store/newsStore/useNewsStore';
import Spinner from '@components/Spinner/Spinner';
import { useCalcScrollWidth } from '@hooks/useCalcScrollWidth';
import { UPDATE_INTERVAL } from '@components/ExchangeRates/currency.consts';

export const News: React.FC = () => {
  const { news, loading, error, fetchNews } = useNewsStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  const calcScrollWidth = useCalcScrollWidth();

  useEffect(() => {
    fetchNews();

    const intervalId = setInterval(() => {
      fetchNews();
    }, UPDATE_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  const handleNext = () => {
    if (currentIndex < news.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <div className="news__error">{error}</div>;
  if (!news.length)
    return <div className="news__error">No news available :(</div>;

  return (
    <div className="news">
      <h2 className="news__title">Current news from the world of finance</h2>
      <p className="news__text">
        We update the news feed every 15 minutes. You can learn more by clicking
        on the news you are interested in.
      </p>

      <div className="news__slider">
        <div
          className="news__wrapper"
          style={{
            transform: `translateX(-${currentIndex * calcScrollWidth}%)`,
          }}
        >
          {news.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="news__item"
            >
              <img
                src={item.urlToImage!}
                alt={item.title}
                className="news__image"
              />
              <h3 className="news__subtitle">{item.title}</h3>
              <p className="news__description">{item.description}</p>
            </a>
          ))}
        </div>
        <div className="news__buttons">
          <button
            className={`news__button news__button--prev ${currentIndex === 0 ? 'news__button--disabled' : ''}`}
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            &#8592;
          </button>

          <button
            className={`news__button news__button--next ${
              currentIndex >= news.length - 3 ? 'news__button--disabled' : ''
            }`}
            onClick={handleNext}
            disabled={currentIndex >= news.length - 3}
          >
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
};
