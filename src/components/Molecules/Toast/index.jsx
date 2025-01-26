import PropTypes from 'prop-types';
import React, {
  createContext, useCallback, useContext, useMemo, useState,
} from 'react';

import { ToastsWrapper } from './CommonToastStyle';
import ErrorToast from './Error';
import InfoToast from './Info';
import SuccessToast from './Success';
import WarningToast from './Warning';

const DEFAULT_TOAST_DURATION = 5000;
const FADE_OUT_DURATION_MS = 1000;

const ToastContext = createContext();

const useToast = () => {
  const context = useContext(ToastContext);
  const memoizedToast = useMemo(() => context, [context]);
  return memoizedToast;
};

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [currentPlacement, setCurrentPlacement] = useState('bottomCenter');
  const [duration, setDuration] = useState(DEFAULT_TOAST_DURATION);

  const closeToast = useCallback(id => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  }, []);

  const triggerFadeOut = useCallback(id => {
    setToasts(prevToasts => prevToasts.map(toast => (toast.id === id ? { ...toast, fadeOut: true } : toast)));

    setTimeout(() => {
      closeToast(id);
    }, FADE_OUT_DURATION_MS);
  }, [closeToast]);

  const openToast = useCallback((title, description, placement, type, toastDuration, action, btnLabel) => {
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
    setDuration(toastDuration || DEFAULT_TOAST_DURATION);

    if (currentPlacement === receivedPlacement) {
      setToasts(prevToasts => [...prevToasts, newToast]);
    } else {
      setToasts([newToast]);
    }

    setTimeout(() => {
      triggerFadeOut(newToast.id);
    }, duration);
  }, [currentPlacement, duration, triggerFadeOut]);

  const success = useCallback((title, description, placement, toastDuration, action, btnLabel) => {
    openToast(title, description, placement, 'success', toastDuration, action, btnLabel);
  }, [openToast]);

  const info = useCallback((title, description, placement, toastDuration, action, btnLabel) => {
    openToast(title, description, placement, 'info', toastDuration, action, btnLabel);
  }, [openToast]);

  const warning = useCallback((title, description, placement, toastDuration, action, btnLabel) => {
    openToast(title, description, placement, 'warning', toastDuration, action, btnLabel);
  }, [openToast]);

  const error = useCallback((title, description, placement, toastDuration, action, btnLabel) => {
    openToast(title, description, placement, 'error', toastDuration, action, btnLabel);
  }, [openToast]);

  const contextValue = useMemo(() => ({
    success,
    info,
    error,
    warning,
  }), [success, info, error, warning]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {toasts?.length > 0 && (
        <ToastsWrapper
          $placement={currentPlacement}
          data-testid="toasts-wrapper"
        >
          {toasts.map(toast => {
            const {
              id, title, description, placement, type, fadeOut, btnLabel, action,
            } = toast;
            return (
              <Toast
                key={id}
                title={title}
                description={description}
                placement={placement}
                type={type}
                fadeOut={fadeOut}
                close={() => closeToast(id)}
                action={action}
                btnLabel={btnLabel}
              />
            );
          })}
        </ToastsWrapper>
      )}
    </ToastContext.Provider>
  );
}

ToastProvider.defaultProps = {
  children: null,
};

ToastProvider.propTypes = {
  children: PropTypes.node,
};

function Toast({
  title,
  description,
  type,
  placement,
  close,
  fadeOut,
  action,
  btnLabel,
  ...rest
}) {
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
}

Toast.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  placement: PropTypes.string,
  type: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  fadeOut: PropTypes.bool,
  action: PropTypes.func,
  btnLabel: PropTypes.string,
};

Toast.defaultProps = {
  placement: 'bottomCenter',
  action: () => {},
  btnLabel: 'action',
  description: '',
  fadeOut: false,
};

export { Toast, ToastProvider, useToast };
