import { useEffect, useState } from 'react';

export const useCalcScrollWidth = () => {
  const calculateWidth = () => {
    if (window.innerWidth <= 1114) {
      return 100 / 2;
    } else {
      return 100 / 3;
    }
  };

  const [scrollWidth, setScrollWidth] = useState(calculateWidth);

  useEffect(() => {
    const handleResize = () => setScrollWidth(calculateWidth());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return scrollWidth;
};
