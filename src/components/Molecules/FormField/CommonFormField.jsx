import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Status from 'components/Molecules/Status';
import Label from 'components/Atoms/Label';

const MainContainer = styled.div`
  width: ${({ w }) => w};
  display: flex;
  flex-direction: ${({ $isLeftSideLabel }) =>
    $isLeftSideLabel ? 'row' : 'column'};
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

const CommonFormField = ({
  customField: CustomField,
  tooltip: Tooltip,
  input,
  meta,
  disabled,
  placeholder,
  labelText,
  isLeftSideLabel,
  helperText,
  validText,
  ...inputProps
}) => {
  const { touched, error } = meta;

  const getStatusComponent = () => {
    if (error && touched)
      return <Status appearance="error">{error}</Status>;

    if (validText && touched)
      return <Status appearance="success">{validText}</Status>;

    return <Status>{helperText}</Status>;
  };

  return (
    <MainContainer $isLeftSideLabel={isLeftSideLabel} w={inputProps.w}>
      <TopContainer $isLeftSideLabel={isLeftSideLabel}>
        <InputLabel disabled={disabled} $isLeftSideLabel={isLeftSideLabel}>
          {labelText}
        </InputLabel>
        {Tooltip && <Tooltip />}
      </TopContainer>
      <BottomContainer>
        <CustomField
          {...input}
          placeholder={placeholder}
          disabled={disabled}
          isInvalid={error && touched}
          {...inputProps}
        />
        {getStatusComponent()}
      </BottomContainer>
    </MainContainer>
  );
};

CommonFormField.propTypes = {
  customField: PropTypes.elementType.isRequired,
  tooltip: PropTypes.elementType,
  input: PropTypes.object,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
  }),
  isLeftSideLabel: PropTypes.bool,
  labelText: PropTypes.string,
  helperText: PropTypes.string,
  validText: PropTypes.string,
  invalidText: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  //Input and TextArea props
  w: PropTypes.string,
  h: PropTypes.string,
  mt: PropTypes.string,
  mr: PropTypes.string,
  mb: PropTypes.string,
  ml: PropTypes.string,
  compact: PropTypes.bool,
};

CommonFormField.defaultProps = {
  isLeftSideLabel: false,
  Tooltip: null,
  disabled: false,
  w: '416px',
  compact: false,
};

export default CommonFormField;
