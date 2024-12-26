import React from 'react';
import './AmountSlider.scss';
import { useSliderStore } from '@store/sliderStore/useSliderStore';
import { useSliderBackground } from './hooks/useSliderBackground';

export const AmountSlider: React.FC = () => {
  const { value, setValue } = useSliderStore();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setValue(newValue);
  };

  useSliderBackground(value); 

  return (
    <div className="slider">
      <div className="slider__header">
        <h2 className="slider__title">Select amount</h2>
      </div>
      <div className="slider__value">{value}</div>
      <div className="slider__wrapper">
        <input
          type="range"
          className="slider__input"
          min="15000"
          max="600000"
          step="1000"
          value={value}
          onChange={handleChange}
        />
      </div>
      <div className="slider__limits">
        <span className="slider__limit">15 000</span>
        <span className="slider__limit">600 000</span>
      </div>
    </div>
  );
};
