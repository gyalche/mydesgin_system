import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Status from 'components/Molecules/Status';
import Label from 'components/Atoms/Label';
import { Flex } from 'components/Atoms/Layout';
import { Layout } from 'components/Atoms';

const MainContainer = styled(Flex).attrs(props => ({
  w: props.w,
  direction: props.$isLeftSideLabel ? 'row' : 'column',
}))`
`;

const TopContainer = styled(Flex).attrs(props => ({
  mr: props.$isLeftSideLabel ? '8px' : '0px',
}))`
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
      <Layout.Block>
        <CustomField
          {...input}
          disabled={disabled}
          isInvalid={error && touched}
          {...inputProps}
        />
        {getStatusComponent()}
      </Layout.Block>
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
