import React from 'react';

import TextArea from 'components/Atoms/TextArea';

import CommonFormField from './CommonFormField';

function FormFieldTextArea(props) {
  return (
    <CommonFormField customField={TextArea} {...props} />
  );
}

export default FormFieldTextArea;
