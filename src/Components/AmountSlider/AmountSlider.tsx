import React, { useEffect } from 'react';
import './AmountSlider.scss';
import { useSliderStore } from '@store/sliderStore/useSliderStore';

const Slider: React.FC = () => {
  const { value, setValue } = useSliderStore();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setValue(newValue);
  };

  useEffect(() => {
    const rangeInput = document.querySelector(
      '.slider__input',
    ) as HTMLInputElement;
    if (rangeInput) {
      const percent = ((value - 15000) / (600000 - 15000)) * 100;
      rangeInput.style.background = `linear-gradient(to right, #5B35D5 ${percent}%, #E2E8F0 ${percent}%)`;
    }
  }, [value]);

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

export default Slider;
