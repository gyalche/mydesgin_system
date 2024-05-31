import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'components/Molecules/IconButton';

import {
  Anchor,
  ContentWrapper,
  DisplayText,
  HelpLink,
  TextBody,
  TextHeader,
  TextMessage,
  TextSubMessage,
  Wrapper,
} from './styles';

let startTime;
let endTime;
let anchorDisplayed = false;

function hoverDuration() {
  endTime = new Date();
  let timeDiff = endTime - startTime;
  // strip the ms
  timeDiff /= 1000;
  return Math.round(timeDiff % 60);
}

function handleMouseEnter() {
  startTime = new Date();
}

function handleAnchorMouseLeave(onHover) {
  if (onHover) {
    anchorDisplayed = false;
    // duration in seconds
    const duration = hoverDuration();
    if (duration > 1) {
      onHover(duration);
    }
  }
}

function handleIconMouseLeave(onHover) {
  if (onHover) {
    setTimeout(() => {
      if (!anchorDisplayed) {
        const duration = hoverDuration();
        if (duration > 1) {
          return onHover(duration);
        }
      } else {
        anchorDisplayed = false;
      }
      return null;
    }, 250);
  }
}

function Tooltip({
  message,
  subMessage,
  width,
  header,
  linkURL,
  onHelpLinkClick,
  onHover,
  btnText,
  bgColor,
  fontColor,
  iconName,
  children,
  placement,
  ...rest
}) {
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const contentRef = useRef(null);

  const [contentWidth, setContentWidth] = useState(0);

  const updateContentWidth = () => {
    if (contentRef.current) {
      const width = contentRef.current.offsetWidth;
      setContentWidth(width);
    }
  };

  useEffect(() => {
    updateContentWidth();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updateContentWidth);
    return () => {
      window.removeEventListener('resize', updateContentWidth);
    };
  }, []);

  const updateWindowSize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWindowSize);
    return () => {
      window.removeEventListener('resize', updateWindowSize);
    };
  }, []);

  return (
    <Wrapper ref={elem => setOffsetLeft(elem?.offsetLeft)} {...rest}>
      <ContentWrapper
        ref={contentRef}
        onMouseEnter={() => {
          handleMouseEnter();
        }}
        onMouseLeave={() => {
          handleIconMouseLeave(onHover);
        }}
      >
        {children}
      </ContentWrapper>
      <Anchor className="display-text">
        <DisplayText
          $bgColor={bgColor}
          $fontColor={fontColor}
          $width={width}
          $left={windowWidth <= 599 ? offsetLeft : contentWidth}
          $windowWidth={windowWidth}
          $placement={placement}
          data-testid="tooltip-display-text"
          onMouseEnter={() => {
            anchorDisplayed = true;
          }}
          onMouseLeave={() => {
            handleAnchorMouseLeave(onHover);
          }}
        >
          {header && <TextHeader>{header}</TextHeader>}
          <TextBody>
            <TextMessage>{message}</TextMessage>
            {subMessage && <TextSubMessage>{subMessage}</TextSubMessage>}
          </TextBody>
          {linkURL && (
            <HelpLink>
              <IconButton.Link
                as="a"
                target="_blank"
                rel="noopener noreferrer"
                iconName={iconName}
                href={linkURL}
                onClick={() => onHelpLinkClick()}
                text={btnText}
              />
            </HelpLink>
          )}
        </DisplayText>
      </Anchor>
    </Wrapper>
  );
}

Tooltip.defaultProps = {
  message: '',
  subMessage: '',
  width: '216px',
  linkURL: null,
  header: null,
  onHelpLinkClick: () => {},
  onHover: () => {},
  btnText: 'More Details',
  bgColor: 'var(--rds-color-neutral-9)',
  fontColor: 'var(--rds-color-neutral-0)',
  iconName: 'global-circle-question',
  placement: 'right',
};

Tooltip.propTypes = {
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  subMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  linkURL: PropTypes.string,
  onHover: PropTypes.func,
  onHelpLinkClick: PropTypes.func,
  width: PropTypes.string,
  btnText: PropTypes.node,
  bgColor: PropTypes.string,
  fontColor: PropTypes.string,
  iconName: PropTypes.string,
  placement: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,
};

export default Tooltip;
