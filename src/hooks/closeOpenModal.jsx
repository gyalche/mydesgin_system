import { useEffect } from 'react';

const useCloseOpenModal = callback => {
  useEffect(() => {
    const closeTheOpenModel = event => {
      if (event.key === 'Escape') {
        if (typeof callback === 'function') {
          try {
            callback();
          } catch (error) {
            throw new Error(error);
          }
        }
      }
    };
    document.addEventListener('keydown', closeTheOpenModel);

    return () => {
      document.removeEventListener('keydown', closeTheOpenModel);
    };
  }, [callback]);
};

export default useCloseOpenModal;
