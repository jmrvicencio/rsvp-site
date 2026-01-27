import { useEffect, useState } from 'react';

export const useWidthCheck = () => {
  const [isSm, setIsSm] = useState(false);
  const [isMd, setIsMd] = useState(false);

  useEffect(() => {
    const small = window.matchMedia('(max-width: 641px)');
    const medium = window.matchMedia('(max-width: 769px)');

    const listener = () => {
      if (small.matches !== isSm) setIsSm(small.matches);
      if (medium.matches !== isMd) setIsMd(medium.matches);
    };

    listener();
    small.addEventListener('change', listener);

    return small.removeEventListener('change', listener);
  }, []);

  return { isSm, isMd };
};
