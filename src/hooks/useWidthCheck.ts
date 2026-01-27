import { useEffect, useState } from 'react';

export const useWidthCheck = () => {
  const [isSm, setIsSm] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 641px)');
    const listener = () => {
      if (media.matches !== isSm) setIsSm(media.matches);
    };

    listener();
    media.addEventListener('change', listener);

    return media.removeEventListener('change', listener);
  }, []);

  return { isSm };
};
