import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { createPortal } from 'react-dom';
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
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const wrapperRef = useRef(null);
  const tooltipRef = useRef(null);

  const hideTimeoutRef = useRef(null);

  function handleMouseEnter() {
    hideTimeoutRef.current = setTimeout(() => {
      setVisible(true);
    }, 251);
  }

  function handleMouseLeave() {
    hideTimeoutRef.current = setTimeout(() => {
      setVisible(false);
    }, 250);
  }

  function handleTooltipMouseEnter() {
    clearTimeout(hideTimeoutRef.current);
    setVisible(true);
  }

  function handleTooltipMouseLeave() {
    hideTimeoutRef.current = setTimeout(() => {
      setVisible(false);
    }, 250);
  }

  const updatePosition = useCallback(() => {
    if (!wrapperRef.current || !tooltipRef.current) {
      return;
    }

    const anchorRect = wrapperRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    let x = anchorRect.left + window.scrollX;
    let y = anchorRect.top + window.scrollY;

    switch (placement) {
      case 'topRight':
        x = anchorRect.right + window.scrollX;
        y = anchorRect.top - tooltipRect.height + window.scrollY + 2;
        break;
      case 'top':
        x = anchorRect.left + (anchorRect.width - tooltipRect.width) / 2 + window.scrollX;
        y = anchorRect.top - tooltipRect.height + window.scrollY + 2;
        break;
      case 'topLeft':
        x = anchorRect.left - tooltipRect.width + window.scrollX;
        y = anchorRect.top - tooltipRect.height + window.scrollY - 2;
        break;
      case 'bottomRight':
        x = anchorRect.right + window.scrollX;
        y = anchorRect.bottom + window.scrollY + 2;
        break;
      case 'bottom':
        x = anchorRect.left + (anchorRect.width - tooltipRect.width) / 2 + window.scrollX;
        y = anchorRect.bottom + window.scrollY + 2;
        break;
      case 'bottomLeft':
        x = anchorRect.left - tooltipRect.width + window.scrollX;
        y = anchorRect.bottom + window.scrollY - 2;
        break;
      case 'left':
        x = anchorRect.left - tooltipRect.width + window.scrollX - 2;
        y = anchorRect.top + (anchorRect.height - tooltipRect.height) / 2 + window.scrollY;
        break;
      case 'right':
        x = anchorRect.right + window.scrollX + 2;
        y = anchorRect.top + (anchorRect.height - tooltipRect.height) / 2 + window.scrollY;
        break;
      default:
        x = anchorRect.right;
        y = anchorRect.top;
    }

    setPosition({ x, y });
  }, [placement]);

  useEffect(() => {
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, [placement, updatePosition]);

  useEffect(() => {
    if (visible) {
      updatePosition();
    }
  }, [visible, updatePosition]);

  return (
    <Wrapper>
      <ContentWrapper
        ref={wrapperRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...rest}
      >
        {children}
      </ContentWrapper>

      {visible
      && createPortal(
        <Anchor
          style={{ left: `${position.x}px`, top: `${position.y}px` }}
          onMouseEnter={handleTooltipMouseEnter}
          onMouseLeave={handleTooltipMouseLeave}
        >
          <DisplayText
            ref={tooltipRef}
            $bgColor={bgColor}
            $fontColor={fontColor}
            $width={width}
            $placement={placement}
            data-testid="tooltip-display-text"
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
        </Anchor>,
        document.body,
      )}
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
  children: PropTypes.oneOfType([PropTypes.bool, PropTypes.array, PropTypes.node])
    .isRequired,
};

export default Tooltip;
