import React, { useEffect } from 'react';

const closeOpenModal = (callback) => {
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

export default closeOpenModal;
