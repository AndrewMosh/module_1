import { useEffect } from 'react';
import { grey_slider, purple_slider } from '../slider.consts';

export const useSliderBackground = (value: number) => {
  useEffect(() => {
    const rangeInput = document.querySelector(
      '.slider__input',
    ) as HTMLInputElement;
    if (rangeInput) {
      const percent = ((value - 15000) / (600000 - 15000)) * 100;
      rangeInput.style.background = `linear-gradient(to right, ${purple_slider} ${percent}%, ${grey_slider} ${percent}%)`;
    }
  }, [value]);
};
