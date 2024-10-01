import React, { forwardRef } from 'react';
import { InputFieldStyle } from './styles';

const InputField = forwardRef(({ ...props }, ref) => (
  <InputFieldStyle ref={ref} {...props} />
));

InputField.displayName = 'InputField';
  
export default InputField;
