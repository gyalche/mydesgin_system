import React from 'react';

import Input from 'components/Atoms/Input';

import CommonFormField from './CommonFormField';

function FormFieldInput(props) {
  return (
    <CommonFormField customField={Input} {...props} />
  );
}

export default FormFieldInput;
