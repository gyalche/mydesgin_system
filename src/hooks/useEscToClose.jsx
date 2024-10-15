import React, { useEffect } from 'react';

const useEscToClose = (callback) => {
    useEffect(() => {
      const closeTheOpenModel = (event) => {
        if (event.key==='Escape') {
          callback();
        }
      };
      document.addEventListener('keydown', closeTheOpenModel);
    
    return () => {
      document.removeEventListener('keydown', closeTheOpenModel);
    };
  },[callback]);

};

export default useEscToClose;
