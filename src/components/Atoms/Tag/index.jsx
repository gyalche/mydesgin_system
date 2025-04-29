import React from 'react';
import PropTypes from 'prop-types';

import {
  TagContainer,
  TagName,
  RemoveButton,
  CrossIcon,
  GraphicWrapper,
} from './styles';

function Tag({
  name, onClick, graphic, disabled, isActive,
}) {
  const hasGraphic = !!graphic;
  const hasOnClick = typeof onClick === 'function';

  return (
    <TagContainer
      disabled={disabled}
      isActive={isActive}
      hasGraphic={hasGraphic}
      hasOnClick={hasOnClick}
    >
      {hasGraphic && (
        <GraphicWrapper>
          {graphic}
        </GraphicWrapper>
      )}
      <TagName
        title={name}
        style={{ maxWidth: `${Math.min((name && name.length) ? name.length * 8 + 32 : 32, 300)}px` }}
      >
        {name}
      </TagName>
      {hasOnClick && (
        <RemoveButton
          onClick={onClick}
          type="button"
          aria-label={`Remove ${name}`}
          disabled={disabled}
        >
          <CrossIcon name="action-cross" />
        </RemoveButton>
      )}
    </TagContainer>
  );
}

Tag.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  graphic: PropTypes.node,
  disabled: PropTypes.bool,
  isActive: PropTypes.bool,
};

Tag.defaultProps = {
  graphic: null,
  disabled: false,
  isActive: false,
  onClick: null,
};

export default Tag;
