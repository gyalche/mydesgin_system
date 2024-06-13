import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon, Input } from 'components/Atoms';
import * as logos from 'components/Atoms/Logo';

const InputWrapper = styled.div`
  position: relative;
`;

const StyledInput = styled(Input)`
  padding-left: ${({ compact }) => (compact ? '30px' : '40px')};
`;

const IconWrapper = styled.div`
  font-size: ${({ $isInputCompact }) => ($isInputCompact ? '16px' : '24px')};
  left: 8px;
  position: absolute;
  top: ${({ $isInputCompact }) => ($isInputCompact ? '17px' : '22px')};
  transform: translateY(-50%);
  color: var(--rds-color-neutral-5);
`;

const SearchInput = ({
  compact,
  placeholder,
  icon,
  name,
  value,
  onChange,
  input,
  ...props
}) => {
  const LogoList = [
    'Chatwork',
    'Garoon',
    'GoogleCalendar',
    'GoogleChat',
    'GoogleMeet',
    'Google',
    'Lineworks',
    'MicrosoftAzureActiveDirectory',
    'MicrosoftOutlook',
    'MicrosoftTeams',
    'Microsoft365',
    'ReceptionistDiscovery',
    'ReceptionistScheduling',
    'Receptionist',
    'ReceptionistRooms',
    'Salesforce',
    'Slack',
    'Webex',
    'Workplace',
    'Zoom',
  ];

  const Logo = logos[icon];

  const handleOnChange = event => {
    const inputValue = event;
    if (onChange) {
      onChange(inputValue);
      return;
    }

    input?.onChange(inputValue);
  };

  return (
    <InputWrapper>
      <StyledInput
        name={name ?? input?.name}
        value={value ?? input?.value}
        onChange={handleOnChange}
        compact={compact}
        placeholder={placeholder}
        {...props}
      />
      <IconWrapper $isInputCompact={compact}>
        {LogoList.includes(icon) ? (
          <Logo
            style={{ width: compact ? '16px' : '24px' }}
            data-testid={`icon-${icon}`}
          />
        ) : (
          <Icon name={icon} data-testid={`icon-${icon}`} />
        )}
      </IconWrapper>
    </InputWrapper>
  );
};

SearchInput.defaultProps = {
  w: 'auto',
  mt: '0',
  mr: '0',
  mb: '0',
  ml: '0',
  placeholder: null,
  compact: false,
  isInvalid: false,
  icon: 'action-loupe',
};

SearchInput.propTypes = {
  w: PropTypes.string,
  mt: PropTypes.string,
  mr: PropTypes.string,
  mb: PropTypes.string,
  ml: PropTypes.string,
  compact: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  isInvalid: PropTypes.bool,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  input: PropTypes.object,
};

export default SearchInput;
