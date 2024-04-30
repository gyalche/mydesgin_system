import React from 'react';
import CommonFormField from './CommonFormField';
import Input from 'src/components/Atoms/Input';

const FormFieldInput = (props) => {
  return (
    <CommonFormField CustomField={Input} {...props} />
  );
};

export default FormFieldInput;
