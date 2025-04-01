import React from 'react';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';

import Typography from 'components/Atoms/Typography';
import Button from 'components/Atoms/Button';
import Input from 'components/Atoms/Input';
import TextArea from 'components/Atoms/TextArea';
import Checkbox from 'components/Molecules/Checkbox';
import RadioButton from 'components/Molecules/RadioButton';
import Selector from 'components/Molecules/Selector';
import FormField from 'components/Molecules/FormField';
import Divider from 'components/Atoms/Divider';
import Card from 'components/Atoms/Card';
import DatePicker from 'components/Molecules/DateTimePicker';
import * as Layout from 'components/Atoms/Layout';

export default {
  title: 'Guidelines/Forms',
  tags: ['!dev'],
};

// Simple validation function
const required = value => (value ? undefined : 'Required');
const minLength = min => value => (
  value && value.length < min ? `Must be at least ${min} characters` : undefined
);
const isEmail = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
);
const composeValidators = (...validators) => value => validators.reduce((error, validator) => error || validator(value), undefined);

// Options for Selector component
const departmentOptions = [
  { value: 'engineering', label: 'Engineering' },
  { value: 'design', label: 'Design' },
  { value: 'product', label: 'Product Management' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
];

export const ReactFinalFormExample = {
  argTypes: {
    showFormState: {
      control: 'boolean',
      description: 'Show/hide form state for debugging',
      defaultValue: false,
    },
    showValidation: {
      control: 'boolean',
      description: 'Enable/disable form validation',
      defaultValue: true,
    },
    submitBehavior: {
      control: 'select',
      options: ['success', 'error', 'loading'],
      description: 'Control the form submission behavior',
      defaultValue: 'success',
    },
  },
  args: {
    showFormState: false,
    showValidation: true,
    submitBehavior: 'success',
  },
  render: ({ showFormState, showValidation, submitBehavior }) => {
    const onSubmit = async values => {
      // Simulate API call
      await new Promise(resolve => {
        setTimeout(resolve, 1000);
      });

      if (submitBehavior === 'error') {
        return { [FORM_ERROR]: 'Submission failed! Server error' };
      }

      // Success case - would normally redirect or show success message
      alert(`Form submitted successfully: \n${JSON.stringify(values)}`);
      return undefined;
    };

    const getSelectorValue = value => {
      const selectedValue = departmentOptions?.find(val => val.value === value);
      return selectedValue;
    };

    return (
      <Layout.Flex justifyContent="center" alignItems="center">
        <Card padding="24px" w="480px">
          <Form
            onSubmit={onSubmit}
            initialValues={{
              fullName: 'Yamada Taro',
              email: 'yamada.taro@receptionist.co.jp',
              contactPreference: 'email',
              department: getSelectorValue('engineering'),
              birthday: new Date('2017/1/1'),
            }}
            validate={values => {
              const errors = {};
              if (showValidation && !values.agreeToTerms) {
                errors.agreeToTerms = 'You must agree to the terms and conditions';
              }
              return errors;
            }}
            render={({
              handleSubmit, form, submitting, pristine, values, submitError, submitSucceeded,
            }) => (
              <form onSubmit={handleSubmit}>
                {showFormState && (
                  <Card padding="16px" mt="12px" mb="24px" style={{ backgroundColor: 'var(--rds-color-neutral-1)' }}>
                    <Layout.Flex direction="column" gap="8px">
                      <Typography level="h6">Form State</Typography>
                      <Layout.Flex padding="12px" maxH="200px" overflowY="auto">
                        <Typography level="p3">
                          <pre>
                            {JSON.stringify(values, null, 2)}
                          </pre>
                        </Typography>
                      </Layout.Flex>
                    </Layout.Flex>
                  </Card>
                )}
                <Layout.Flex direction="column" gap="24px">
                  <Layout.Flex direction="column" gap="16px">
                    <Typography level="h3">Personal Information</Typography>

                    <Field
                      name="fullName"
                      validate={showValidation ? required : undefined}
                      component={FormField}
                      customField={Input}
                      labelText="Full Name"
                      helperText="Enter your full name"
                      w="100%"
                    />

                    <Field
                      name="email"
                      validate={showValidation ? composeValidators(required, isEmail) : undefined}
                      component={FormField}
                      customField={Input}
                      labelText="Email Address"
                      helperText="We'll never share your email"
                      w="100%"
                    />

                    <Field
                      name="department"
                      validate={showValidation ? required : undefined}
                      component={FormField}
                      customField={Selector}
                      labelText="Department"
                      helperText="Select your department"
                      options={departmentOptions}
                      w="100%"
                    />
                    <div>
                      <Field
                        name="birthday"
                        component={FormField}
                        customField={DatePicker}
                        onlyFuture={false}
                        labelText="Birthday"
                        helperText="Select your DOB"
                        w="100%"
                      />
                    </div>
                  </Layout.Flex>

                  <Divider />

                  <Layout.Flex direction="column" gap="16px">
                    <Typography level="h3">Additional Information</Typography>

                    <Field
                      name="bio"
                      validate={showValidation ? minLength(10) : undefined}
                      component={FormField}
                      customField={TextArea}
                      labelText="Bio"
                      helperText="Tell us about yourself"
                      w="100%"
                    />

                    <Layout.Flex direction="column" gap="8px">
                      <Typography level="p2">Contact Preference</Typography>
                      <Layout.Flex direction="column" gap="8px">
                        <Field name="contactPreference" type="radio" value="email">
                          {({ input }) => (
                            <RadioButton
                              label="Email"
                              checked={input.checked}
                              onChange={input.onChange}
                              value={input.value}
                            />
                          )}
                        </Field>
                        <Field name="contactPreference" type="radio" value="phone">
                          {({ input }) => (
                            <RadioButton
                              label="Phone"
                              checked={input.checked}
                              onChange={input.onChange}
                              value={input.value}
                            />
                          )}
                        </Field>
                      </Layout.Flex>
                    </Layout.Flex>
                  </Layout.Flex>

                  <Divider />

                  <Layout.Flex direction="column" gap="16px">
                    <Field
                      name="agreeToTerms"
                      type="checkbox"
                      validate={showValidation ? required : undefined}
                      component={FormField}
                      customField={Checkbox}
                      label="I agree to the terms and conditions"
                      labelText=""
                      helperText=""
                    />
                  </Layout.Flex>

                  {submitError && (
                    <Layout.Flex direction="column" gap="8px">
                      <Typography level="p2" color="var(--rds-color-secondary-3-normal)">
                        {submitError}
                      </Typography>
                    </Layout.Flex>
                  )}

                  {submitSucceeded && submitBehavior === 'success' && (
                    <Layout.Flex direction="column" gap="8px">
                      <Typography level="p2" color="var(--rds-color-primary-1-normal)">
                        Form submitted successfully!
                      </Typography>
                    </Layout.Flex>
                  )}

                  <Layout.Flex justifyContent="Layout.Flex-end" gap="12px" mt="24px">
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
                      disabled={submitting || (showValidation && pristine)}
                      loading={submitting || submitBehavior === 'loading'}
                    >
                      Submit
                    </Button>
                  </Layout.Flex>
                </Layout.Flex>
              </form>
            )}
          />
        </Card>
      </Layout.Flex>
    );
  },
};
