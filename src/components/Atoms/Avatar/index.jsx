import React, { useEffect, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

// Define all color pairs
const colorPairs = [
  css`
    background-color: var(--rds-color-teritary-2-subtle);
    color: var(--rds-color-tertiary-2-deep);
  `,
  css`
    background-color: var(--rds-color-secondary-2-subtle);
    color: var(--rds-color-secondary-2-deep);
  `,
  css`
    background-color: var(--rds-color-tertiary-1-subtle);
    color: var(--rds-color-tertiary-1-deep);
  `,
  css`
    background-color: var(--rds-red-200);
    color: var(--rds-color-secondary-3-deep);
  `,
  css`
    background-color: var(--rds-color-secondary-1-subtle);
    color: var(--rds-color-secondary-1-deep);
  `,
  css`
    background-color: var(--rds-teal-200);
    color: var(--rds-color-primary-1-deep);
  `,
  css`
    background-color: var(--rds-pink-200);
    color: var(--rds-color-teritary-3-deep);
  `,
  css`
    background-color: var(--rds-color-teritary-4-pale);
    color: var(--rds-color-teritary-4-deep);
  `,
  css`
    background-color: var(--rds-color-neutral-2);
    color: var(--rds-color-neutral-10);
  `,
];

// Get color pair based on the Unicode of the first character
const getColorPair = (char) => {
  const unicode = char?.charCodeAt(0);
  const index = unicode % 9;
  return colorPairs[index];
};

// Styled component with dynamic styles based on the color pair
export const CommonAvatarStyle = styled.div`
  display: flex;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 32px;
  font-size: ${({ fontSize }) => fontSize};
  font-weight: 400;
  margin-right: ${({ mr }) => mr};
  margin-left: ${({ ml }) => ml};
  margin-top: ${({ mt }) => mt};
  margin-bottom: ${({ mb }) => mb};
  padding: ${({ padding }) => padding};
  ${({ colorStyle }) => colorStyle}

  img {
    width: 32px;
    height: 32px;
    border-radius: 32px;
    object-fit: cover;
  }
`;

const Avatar = ({ name, src, ...props }) => {
  const [isImageValid, setIsImageValid] = useState(true);

  const usernameFirstChar = useMemo(() => {
    return name?.trim()[0]?.toUpperCase();
  }, [name]);

  const colorStyle = useMemo(() => {
    return getColorPair(usernameFirstChar);
  }, [usernameFirstChar]);

  useEffect(() => {
    if (src) {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsImageValid(true);
      img.onerror = () => setIsImageValid(false);
    } else {
      setIsImageValid(false);
    }
  }, [src]);

  return (
    <CommonAvatarStyle colorStyle={colorStyle} {...props}>
      {isImageValid && src ? (
        <img 
          src={src} 
          alt={name} 
          onError={() => setImgError(true)} 
        />
      ) : (
        usernameFirstChar
      )}
    </CommonAvatarStyle>
  );
};

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string,
  padding: PropTypes.string,
  fontSize: PropTypes.string,
  mt: PropTypes.string,
  mr: PropTypes.string,
  mb: PropTypes.string,
  ml: PropTypes.string,
};

Avatar.defaultProps = {
  src: '',
  padding: '0 4px',
  fontSize: '12px',
  mt: '0',
  mr: '0',
  mb: '0',
  ml: '0',
};

export default Avatar;
