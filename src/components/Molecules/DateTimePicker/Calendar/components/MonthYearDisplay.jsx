import React from 'react';
import PropTypes from 'prop-types';

import { TextAreaYearMonth } from '../../styles';
import { getLocalizedMonthName } from '../../../../../utils';

function MonthYearDisplay({
  isDoubleView,
  openDecade,
  openMonth,
  selectedDecade,
  displayYear,
  currentMonth,
  locale,
  onYearClick,
  onMonthClick,
  onKeyDown,
}) {
  const yearText = selectedDecade && openDecade ? `${selectedDecade} - ${selectedDecade + 9}` : displayYear;

  return (
    <>
      <TextAreaYearMonth
        data-calendar-btn={true}
        onClick={onYearClick}
        openDecade={openDecade}
        isDoubleView={isDoubleView && (openMonth || openDecade)}
        onKeyDown={onKeyDown}
      >
        {yearText}
      </TextAreaYearMonth>

      {(!openDecade && !openMonth) && (
        <TextAreaYearMonth
          data-calendar-btn={true}
          onClick={onMonthClick}
          onKeyDown={onKeyDown}
        >
          {getLocalizedMonthName(currentMonth, locale)}
        </TextAreaYearMonth>
      )}
    </>
  );
}

MonthYearDisplay.propTypes = {
  isDoubleView: PropTypes.bool,
  openDecade: PropTypes.bool,
  openMonth: PropTypes.bool,
  selectedDecade: PropTypes.number,
  displayYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  currentMonth: PropTypes.instanceOf(Date).isRequired,
  locale: PropTypes.string,
  onYearClick: PropTypes.func.isRequired,
  onMonthClick: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
};

MonthYearDisplay.defaultProps = {
  isDoubleView: false,
  openDecade: false,
  openMonth: false,
  selectedDecade: null,
  locale: 'ja-JP',
  onKeyDown: () => {},
};

export default MonthYearDisplay;
