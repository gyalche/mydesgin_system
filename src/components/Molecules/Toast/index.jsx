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
  const memoizedToast = useMemo(() => context, []);
  return memoizedToast;
};

const handleActionClick = () => {
  alert('Action button clicked!');
};

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [currentPlacement, setCurrentPlacement] = useState('bottomCenter');
  const [duration, setDuration] = useState(DEFAULT_TOAST_DURATION);

  const openToast = (title, description, placement, type, receivedDuration, action, btnLabel) => {
    const newToast = {
      id: Date.now(),
      title,
      description,
      placement,
      type,
      action,
      btnLabel,
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

  const success = (title, description, placement, duration, action, btnLabel) => {
    openToast(title, description, placement, 'success', duration, action, btnLabel);
  };

  const info = (title, description, placement, duration, action, btnLabel) => {
    openToast(title, description, placement, 'info', duration, action, btnLabel);
  };

  const warning = (title, description, placement, duration, action, btnLabel) => {
    openToast(title, description, placement, 'warning', duration, action, btnLabel);
  };

  const error = (title, description, placement, duration, action, btnLabel) => {
    openToast(title, description, placement, 'error', duration, action, btnLabel);
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
            const { id, title, description, placement, type, fadeOut, action, btnLabel } = toast;
            return (
              <Toast
                key={id}
                title={title}
                description={description}
                placement={placement}
                type={type}
                fadeOut={fadeOut}
                close={() => closeToast(id)}
                action={handleActionClick}
                btnLabel={btnLabel}
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
  action,
  btnLabel,
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
      action={action}
      btnLabel={action ? btnLabel : null}
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
  action: PropTypes.func,
  btnLabel: PropTypes.string
};

Toast.defaultProps = {
  placement: 'bottomCenter',
  action: null,
  btnLabel: 'action'
};

export { Toast, ToastProvider, useToast };
