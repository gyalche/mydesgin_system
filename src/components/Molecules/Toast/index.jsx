import React, { createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import SuccessToast from './Success';
import ErrorToast from './Error';
import InfoToast from './Info';
import WarningToast from './Warning';
import { ToastsWrapper } from './CommonToastStyle';

const DEFAULT_TOAST_DURATION = 5000;
const FADE_OUT_DURATION_MS = 1000;

const ToastContext = createContext();

const useToast = () => {
  const context = useContext(ToastContext);
  return context;
};

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [currentPlacement, setCurrentPlacement] = useState('bottomCenter');
  const [duration, setDuration] = useState(DEFAULT_TOAST_DURATION);

  const openToast = (title, description, placement, type, receivedDuration) => {
    const newToast = {
      id: Date.now(),
      title,
      description,
      placement,
      type,
    };

    const receivedPlacement = placement || 'bottomCenter';

    setCurrentPlacement(receivedPlacement);
    setDuration(receivedDuration || DEFAULT_TOAST_DURATION);

    if (currentPlacement === receivedPlacement) {
      setToasts(prevToasts => [...prevToasts, newToast]);
    } else {
      setToasts([newToast]);
    }

    setTimeout(() => {
      triggerFadeOut(newToast.id);
    }, duration);
  };

  const triggerFadeOut = id => {
    setToasts(prevToasts =>
      prevToasts.map(toast =>
        toast.id === id ? { ...toast, fadeOut: true } : toast
      )
    );

    setTimeout(() => {
      closeToast(id);
    }, FADE_OUT_DURATION_MS);
  };

  const closeToast = id => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };

  const success = (title, description, placement, duration) => {
    openToast(title, description, placement, 'success', duration);
  };

  const info = (title, description, placement, duration) => {
    openToast(title, description, placement, 'info', duration);
  };

  const warning = (title, description, placement, duration) => {
    openToast(title, description, placement, 'warning', duration);
  };

  const error = (title, description, placement, duration) => {
    openToast(title, description, placement, 'error', duration);
  };

  const contextValue = useMemo(() => ({
    success,
    info,
    error,
    warning,
  }));

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {toasts?.length > 0 && (
        <ToastsWrapper
          $placement={currentPlacement}
          data-testid="toasts-wrapper"
        >
          {toasts.map(toast => {
            const { id, title, description, placement, type, fadeOut } = toast;
            return (
              <Toast
                key={id}
                title={title}
                description={description}
                placement={placement}
                type={type}
                fadeOut={fadeOut}
                close={() => closeToast(id)}
              />
            );
          })}
        </ToastsWrapper>
      )}
    </ToastContext.Provider>
  );
};

ToastProvider.propTypes = {
  children: PropTypes.node,
};

const Toast = ({
  title,
  description,
  type,
  placement,
  close,
  fadeOut,
  ...rest
}) => {
  const toastComponents = {
    success: SuccessToast,
    error: ErrorToast,
    info: InfoToast,
    warning: WarningToast,
  };
  const ToastComponent = toastComponents[type] || SuccessToast;

  return (
    <ToastComponent
      title={title}
      description={description}
      $placement={placement}
      $fadeOut={fadeOut}
      close={close}
      data-testid="toast"
      {...rest}
    />
  );
};

Toast.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  placement: PropTypes.string,
  type: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  fadeOut: PropTypes.bool,
};

Toast.defaultProps = {
  placement: 'bottomCenter',
};

export { Toast, ToastProvider, useToast };
