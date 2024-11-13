import React, { useEffect } from 'react';

const closeOpenModal = (callback) => {
    useEffect(() => {
      const closeTheOpenModel = (event) => {
        if (event.key === 'Escape') {
          if(typeof callback === 'function'){
            try {
              callback();
            } catch (error) {
              new Error(error);
            }
            
          }
        }
      };
      document.addEventListener('keydown', closeTheOpenModel);
    
    return () => {
      document.removeEventListener('keydown', closeTheOpenModel);
    };
  },[callback]);
};

export default closeOpenModal;
