import { useState } from 'react';

const usePagination = (initialIndex: number, maxIndex: number) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return {
    currentIndex,
    handleNext,
    handlePrev,
  };
};

export default usePagination;
