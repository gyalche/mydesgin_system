import React, { forwardRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'components/Atoms';
import { Flex } from 'components/Atoms/Layout';

import { CloseIconPlacement, DialogContainer } from './styles';

const Dialog = forwardRef((
  {
    showClose, w, maxW, buttons, children, ...rest
  },
  ref,
) => {
  const handleDialogClose = useCallback(() => {
    ref.current.close();
  }, [ref]);

  const handleOutsideClick = useCallback(event => {
    if (ref.current && !ref.current.contains(event.target)) {
      handleDialogClose();
    }
  }, [ref, handleDialogClose]);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    ref && (
      <DialogContainer
        ref={ref}
        $w={w}
        $maxW={maxW}
        data-testid="dialog"
        {...rest}
      >
        {showClose && (
          <CloseIconPlacement
            onClick={() => handleDialogClose()}
            data-testid="close-icon-placement"
          >
            <Icon name="action-cross" />
          </CloseIconPlacement>
        )}
        {children}
        {buttons?.length > 0 && (
          <Flex alignItems="center" gap="12px" justifyContent="end" mt="16px">
            {buttons.map(buttonData => {
              const {
                text, button: BtnComponent, onClick, props,
              } = buttonData;

              const handleClick = () => {
                if (onClick === 'close') {
                  ref.current.close();
                  return;
                }
                onClick.bind(ref.current)();
              };

              return (
                <BtnComponent
                  onClick={() => handleClick()}
                  key={text}
                  {...props}
                >
                  {text}
                </BtnComponent>
              );
            })}
          </Flex>
        )}
      </DialogContainer>
    )
  );
});

Dialog.displayName = 'Dialog';

Dialog.defaultProps = {
  showClose: false,
  buttons: [],
  w: '400px',
  maxW: null,
};

Dialog.propTypes = {
  showClose: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired,
  buttons: PropTypes.oneOfType([PropTypes.array]),
  w: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxW: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Dialog;
