import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Status from 'components/Molecules/Status';
import Label from 'components/Atoms/Label';

const MainContainer = styled.div`
  width: ${({ w }) => w};
  display: flex;
  flex-direction: ${({ $isLeftSideLabel }) => ($isLeftSideLabel ? 'row' : 'column')};
`;

const TopContainer = styled.div`
  margin-right: ${({ $isLeftSideLabel }) => ($isLeftSideLabel ? '8px' : '')};
  display: flex;
`;

const BottomContainer = styled.div`
  display: block;
`;

const InputLabel = styled(Label)`
  width: ${({ $isLeftSideLabel }) => ($isLeftSideLabel ? '160px' : '100%')};
  margin-right: 4px;
  margin-bottom: 4px;
`;

function CommonFormField({
  customField: CustomField,
  tooltip: Tooltip,
  input,
  meta,
  disabled,
  labelText,
  isLeftSideLabel,
  helperText,
  validText,
  ...inputProps
}) {
  const { touched, error } = meta || {};

  const getStatusComponent = () => {
    if (error && touched) return <Status appearance="error">{error}</Status>;

    if (validText && touched) return <Status appearance="success">{validText}</Status>;

    return <Status>{helperText}</Status>;
  };

  return (
    <MainContainer $isLeftSideLabel={isLeftSideLabel} {...inputProps}>
      <TopContainer $isLeftSideLabel={isLeftSideLabel}>
        <InputLabel disabled={disabled} $isLeftSideLabel={isLeftSideLabel}>
          {labelText}
        </InputLabel>
        {Tooltip && <Tooltip />}
      </TopContainer>
      <BottomContainer>
        <CustomField
          {...input}
          disabled={disabled}
          isInvalid={error && touched}
          {...inputProps}
        />
        {getStatusComponent()}
      </BottomContainer>
    </MainContainer>
  );
}

CommonFormField.propTypes = {
  customField: PropTypes.elementType.isRequired,
  tooltip: PropTypes.elementType,
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    checked: PropTypes.bool,
  }),
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  isLeftSideLabel: PropTypes.bool,
  labelText: PropTypes.string,
  helperText: PropTypes.string,
  validText: PropTypes.string,
  disabled: PropTypes.bool,
};

CommonFormField.defaultProps = {
  isLeftSideLabel: false,
  tooltip: null,
  disabled: false,
  meta: {},
  input: {},
  labelText: '',
  helperText: '',
  validText: '',
};

export default CommonFormField;
