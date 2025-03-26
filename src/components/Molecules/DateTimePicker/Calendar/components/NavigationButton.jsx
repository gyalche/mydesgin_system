import React from 'react';
import PropTypes from 'prop-types';

import { CalendarIconBtn, CalendarIcon } from '../../styles';

function NavigationButton({
  icon,
  onClick,
  onKeyDown,
  showButton,
}) {
  if (!showButton) return null;

  return (
    <CalendarIconBtn
      data-calendar-btn={true}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onKeyDown}
      type="button"
    >
      <CalendarIcon name={icon} />
    </CalendarIconBtn>
  );
}

NavigationButton.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
  showButton: PropTypes.bool,
};

NavigationButton.defaultProps = {
  onKeyDown: () => {},
  showButton: true,
};

export default NavigationButton;
