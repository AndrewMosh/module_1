import { useCalcScrollWidth } from '@hooks/useCalcScrollWidth';

const useNewsSliderStyle = (currentIndex: number) => {
  const calcScrollWidth = useCalcScrollWidth();
  
  return {
    transform: `translateX(-${currentIndex * calcScrollWidth}%)`,
  };
};

export default useNewsSliderStyle;
