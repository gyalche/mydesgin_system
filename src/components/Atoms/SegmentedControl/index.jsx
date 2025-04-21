import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Typography from '../Typography';
import { Flex } from '../Layout';

const SegmentContainer = styled(Flex).attrs(() => ({
  justifyContent: 'center',
  gap: '4px',
  borderRadius: '40px',
}))`
  background-color: var(--rds-color-neutral-3);
`;

const Segment = styled.div`
  min-width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  margin-top: 4px;
  margin-bottom: 4px;
  margin-top: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  ${props => (
    props.$active && `
      background-color: var(--rds-color-neutral-0);
      color: var(--rds-color-primary-1-dark);
  `)}

  &:hover {
    background-color: var(--rds-color-neutral-4);
  }

  &:active {
    background-color: var(--rds-color-neutral-5);
  }

  &:first-child {
    margin-left: 4px;
    min-width: 66px;
    border-radius: 40px 0 0 40px;
  }

  &:last-child {
    margin-right: 4px;
    min-width: 66px;
    border-radius: 0 40px 40px 0;
  }

  ${props => (
    props.$disabled && `
      background-color: var(--rds-color-neutral-3);
      color: var(--rds-color-neutral-4);
      &:hover {
        background-color: var(--rds-color-neutral-3);
  }
  `)}
`;

function SegmentedControl({
  defaultSegment, mt, mb, ml, mr, segments,
}) {
  const [activeSegment, setActiveSegment] = useState(defaultSegment);

  useEffect(() => {
    setActiveSegment(defaultSegment);
  }, [defaultSegment]);

  const handleSegmentClick = (segmentKey, customOnClick) => {
    customOnClick(segmentKey);
    setActiveSegment(segmentKey);
  };

  return (
    <SegmentContainer mt={mt} mb={mb} ml={ml} mr={mr}>
      {segments.map(segment => (
        <Segment
          key={segment.segmentKey}
          onClick={segment.disabled ? null : () => handleSegmentClick(segment.segmentKey, segment.onClick)}
          $active={activeSegment === segment.segmentKey}
          $disabled={segment.disabled}
        >
          <Typography level="h7">
            {segment.label}
          </Typography>
        </Segment>
      ))}
    </SegmentContainer>
  );
}

SegmentedControl.displayName = 'Segment';

SegmentedControl.defaultProps = {
  mt: '0',
  mb: '0',
  ml: '0',
  mr: '0',
};

SegmentedControl.propTypes = {
  mt: PropTypes.string,
  mb: PropTypes.string,
  ml: PropTypes.string,
  mr: PropTypes.string,
  defaultSegment: PropTypes.string.isRequired,
  segments: PropTypes.arrayOf(
    PropTypes.shape({
      segmentKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func,
      disabled: PropTypes.bool,
    }),
  ).isRequired,
};

export default SegmentedControl;
