import React from 'react';
import { Form, Field } from 'react-final-form';

import Typography from 'components/Atoms/Typography';
import Button from 'components/Atoms/Button';
import Input from 'components/Atoms/Input';
import TextArea from 'components/Atoms/TextArea';
import Checkbox from 'components/Molecules/Checkbox';
import RadioButton from 'components/Molecules/RadioButton';
import Toggle from 'components/Molecules/Toggle';
import Selector from 'components/Molecules/Selector';
import FormField from 'components/Molecules/FormField';
import Divider from 'components/Atoms/Divider';
import Card from 'components/Atoms/Card';
import DatePicker from 'components/Molecules/DateTimePicker';
import * as Layout from 'components/Atoms/Layout';

const { Time, DateTime } = DatePicker;

export default {
  title: 'Tools/Form Component Tester',
  tags: ['!dev'],
};

// Component configurations with initial values
const componentConfigs = {
  Input: {
    component: Input,
    initialValue: 'Example input text',
    fieldName: 'inputField',
  },
  TextArea: {
    component: TextArea,
    initialValue: 'Example multi-line text content',
    fieldName: 'textAreaField',
  },
  Checkbox: {
    component: Checkbox,
    initialValue: true,
    fieldName: 'checkboxField',
    props: {
      label: 'sample checkbox',
    },
  },
  RadioButton: {
    component: ({ input, ...props }) => (
      <Layout.Flex direction="column" gap="8px">
        <RadioButton
          label="Option 1"
          checked={input.value === 'option1'}
          onChange={() => input.onChange('option1')}
          {...props}
        />
        <RadioButton
          label="Option 2"
          checked={input.value === 'option2'}
          onChange={() => input.onChange('option2')}
          {...props}
        />
        <RadioButton
          label="Option 3"
          checked={input.value === 'option3'}
          onChange={() => input.onChange('option3')}
          {...props}
        />
      </Layout.Flex>
    ),
    initialValue: 'option2', // Second option selected by default
    fieldName: 'radioField',
  },
  Toggle: {
    component: Toggle,
    initialValue: true,
    fieldName: 'toggleField',
    props: {
      labels: ['On', 'Off'],
    },
  },
  Selector: {
    component: Selector,
    initialValue: { value: 'design', label: 'Design' },
    fieldName: 'selectorField',
    props: {
      options: [
        { value: 'engineering', label: 'Engineering' },
        { value: 'design', label: 'Design' },
        { value: 'product', label: 'Product Management' },
        { value: 'marketing', label: 'Marketing' },
      ],
    },
  },
  DatePicker: {
    component: DatePicker,
    fieldName: 'datePickerField',
    initialValue: new Date(),
  },
  TimePicker: {
    component: Time,
    fieldName: 'timePickerField',
    initialValue: new Date(),
    props: {
      is12Hour: false,
    },
  },
  DateTimePicker: {
    component: DateTime,
    fieldName: 'dateTimePickerField',
    initialValue: new Date('Dec 20 2025 15:50:00'),
    props: {
      step: 2,
    },
  },
};

// Custom validator that returns errors based on validation state
const createValidator = (validationState, errorMessage) => () => {
  if (validationState === 'Invalid') {
    return errorMessage || 'This field has an error';
  }
  return undefined;
};

export const FormComponentTester = {
  argTypes: {
    // Component selection
    selectedComponent: {
      control: 'select',
      options: Object.keys(componentConfigs),
      defaultValue: 'TimePicker',
    },

    // Validation controls
    validationState: {
      control: 'select',
      options: ['Valid', 'Invalid', 'Untouched'],
      defaultValue: 'Valid',
    },
    errorMessage: {
      control: 'text',
      defaultValue: 'This field has an error',
      if: { arg: 'validationState', eq: 'Invalid' },
    },

    // Common controls
    labelText: {
      control: 'text',
      defaultValue: 'Field Label',
    },
    helperText: {
      control: 'text',
      defaultValue: 'Helper text',
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    width: {
      control: 'text',
      defaultValue: '100%',
    },
  },

  render: args => {
    const {
      selectedComponent = 'TimePicker', // Default to 'Input' if not specified
      validationState,
      errorMessage,
      labelText,
      helperText,
      disabled,
      width,
    } = args;

    // Get the selected component configuration
    const componentConfig = componentConfigs[selectedComponent] || componentConfigs.Input;

    // Create initial values object
    const initialValues = {
      [componentConfig.fieldName]: componentConfig.initialValue,
    };

    // Create validator based on validation state
    const validator = createValidator(validationState, errorMessage);

    // Handle form submission
    const onSubmit = async values => {
      // Simulate API call
      await new Promise(resolve => {
        setTimeout(resolve, 500);
      });

      // Show submitted values
      alert(`Form submitted with values:\n${JSON.stringify(values, null, 2)}`);
      return undefined;
    };

    return (
      <Layout.Flex direction="column" gap="24px">
        <Card padding="24px">
          <Layout.Flex direction="column" gap="24px">
            <Typography level="p3">
              This story allows you to test different form components within a react-final-form environment.
              Select a component type and configure its properties using the controls below.
            </Typography>

            <Divider />

            <Form
              onSubmit={onSubmit}
              initialValues={initialValues}
              render={({
                handleSubmit, form, submitting, pristine, values, submitSucceeded,
              }) => (
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                  <Layout.Flex gap="24px">
                    <Layout.Item flex="1">
                      <Layout.Flex direction="column" gap="16px">
                        {['RadioButton', 'TimePicker', 'DatePicker', 'DateTimePicker'].includes(selectedComponent) ? (
                          <div>
                            <Typography level="p2" fontWeight="bold">{labelText}</Typography>
                            {helperText && <Typography level="p3" mb="8px">{helperText}</Typography>}
                            <Field
                              name={componentConfig.fieldName}
                              validate={validator}
                              render={({ input, meta }) => (
                                <>
                                  <componentConfig.component
                                    input={input}
                                    disabled={disabled}
                                    {...(componentConfig.props || {})}
                                  />
                                  {meta.error && meta.touched && (
                                    <Typography level="p3" color="var(--rds-color-secondary-3-normal)" mt="4px">
                                      {meta.error}
                                    </Typography>
                                  )}
                                </>
                              )}
                            />
                          </div>
                        ) : (
                          <Field
                            name={componentConfig.fieldName}
                            type={selectedComponent === 'Checkbox' ? 'checkbox' : undefined}
                            validate={validator}
                            component={FormField}
                            customField={componentConfig.component}
                            labelText={labelText}
                            helperText={helperText}
                            disabled={disabled}
                            w={width}
                            {...(componentConfig.props || {})}
                          />
                        )}
                        <Layout.Flex justifyContent="flex-end" gap="12px">
                          <Button
                            type="button"
                            appearance="secondary"
                            onClick={() => form.reset()}
                            disabled={submitting || pristine}
                          >
                            Reset
                          </Button>
                          <Button
                            type="submit"
                            appearance="primary"
                            disabled={submitting}
                            loading={submitting}
                          >
                            Submit
                          </Button>
                        </Layout.Flex>
                        <Card padding="16px" w="100%" style={{ backgroundColor: 'var(--rds-color-neutral-2)' }}>
                          <Layout.Flex direction="column" gap="8px">
                            <Typography level="p2" fontWeight="bold">Form State:</Typography>
                            <Card padding="8px" w="100%">
                              <Typography level="p3">
                                <pre style={{ margin: 0 }}>
                                  {JSON.stringify(
                                    {
                                      pristine,
                                      submitting,
                                      submitSucceeded,
                                      hasValidationErrors: form.getState().hasValidationErrors,
                                      hasSubmitErrors: form.getState().hasSubmitErrors,
                                    },
                                    null,
                                    2,
                                  )}
                                </pre>
                              </Typography>
                            </Card>
                          </Layout.Flex>
                        </Card>
                        <Card padding="16px" w="100%" style={{ backgroundColor: 'var(--rds-color-neutral-2)' }}>
                          <Layout.Flex direction="column" gap="8px">
                            <Typography level="p2" fontWeight="bold">Current Value:</Typography>
                            <Card padding="8px" w="100%">
                              <Typography level="p3">
                                <pre style={{ margin: 0 }}>
                                  {JSON.stringify(values[componentConfig.fieldName], null, 2)}
                                </pre>
                              </Typography>
                            </Card>
                          </Layout.Flex>
                        </Card>
                      </Layout.Flex>
                    </Layout.Item>

                    <Layout.Item flex="1">
                      <Card padding="16px" w="100%" style={{ backgroundColor: 'var(--rds-color-neutral-2)' }}>
                        <Layout.Flex direction="column" gap="8px">
                          <Typography level="p2" fontWeight="bold">Field State:</Typography>
                          <Card padding="8px" w="100%">
                            <Typography level="p3">
                              <pre style={{ margin: 0 }}>
                                {JSON.stringify(
                                  form.getFieldState(componentConfig.fieldName) || 'Field not registered yet',
                                  null,
                                  2,
                                )}
                              </pre>
                            </Typography>
                          </Card>
                        </Layout.Flex>
                      </Card>
                    </Layout.Item>
                  </Layout.Flex>
                </form>
              )}
            />
          </Layout.Flex>
        </Card>
      </Layout.Flex>
    );
  },
};
