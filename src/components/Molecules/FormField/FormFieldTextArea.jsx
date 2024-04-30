import React from 'react';
import CommonFormField from './CommonFormField';
import TextArea from 'src/components/Atoms/TextArea';

const FormFieldTextArea = (props) => {
  return (
    <CommonFormField CustomField={TextArea} {...props} />
  );
};

export default FormFieldTextArea;
