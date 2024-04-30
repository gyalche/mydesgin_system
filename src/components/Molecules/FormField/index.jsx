import CommonFormField from './CommonFormField';
import { default as FormFieldInput } from './FormFieldInput';
import { default as FormFieldTextArea } from './FormFieldTextArea';

const FormField = CommonFormField;

FormField.Input = FormFieldInput;
FormField.TextArea = FormFieldTextArea;

export default FormField;
