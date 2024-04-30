import React from 'react';
import expect from 'expect';
import { render, screen } from '@testing-library/react';
import FormField from 'src/components/Molecules/FormField';

describe('FormField component', () => {
  const helperText = "helperText";
  const labelText = "labelText";
  const validText = "validText";

  it('Should render Helper Text', () => {
    const mockMeta = {
      error: 'error',
      touched: false,
    };
    render(
      <FormField.Input meta={ mockMeta } helperText={ helperText } />
    );
    const helperTextDiv = screen.getByText(helperText);
    expect(helperTextDiv).toHaveTextContent('helperText');
  });

  it('Should render Validation Text if touched', () => {
    const mockMeta = {
      error: '',
      touched: true,
    };

    render(
      <FormField.Input meta={ mockMeta } validText={ validText } />
    );

    const validTextDiv = screen.queryByText(validText)
    expect(validTextDiv).toHaveTextContent('validText');
  });

  it('Should render error if touched and if error is defined', () => {
    const mockMeta = {
      error: 'error',
      touched: true,
    };

    render(
      <FormField.Input meta={ mockMeta } validText={ validText } />
    );

    const errorTextDiv = screen.queryByText('error')
    expect(errorTextDiv).toHaveTextContent('error');
  });

  it('Should render label if touched', () => {
    const mockMeta = {
      error: '',
      touched: false,
    };

    render(
      <FormField.Input meta={ mockMeta } labelText={ labelText } />
    );

    const labelTextDiv = screen.queryByText(labelText)
    expect(labelTextDiv).toHaveTextContent('labelText');
  });

  it('Should render an input field', () => {
    const mockMeta = {
      error: '',
      touched: false,
    };

    render(
      <FormField.Input meta={ mockMeta } />
    );

    const inputElement = screen.getByRole('textbox');

    expect(inputElement.tagName).toBe('INPUT');
  });

  it('Should render an input field with a modified style', () => {
    const mockMeta = {
      error: '',
      touched: false,
    };

    render(
      <FormField.Input meta={ mockMeta } w='200px'/>
    );

    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toHaveStyleRule(`width`, '200px');
  });

  it('Should render an textarea field', () => {
    const mockMeta = {
      error: '',
      touched: false,
    };

    render(
      <FormField.TextArea meta={ mockMeta } />
    );

    const inputElement = screen.getByRole('textbox');

    expect(inputElement.tagName).toBe('TEXTAREA');
  });

  it('Should render an textarea field with a modified style', () => {
    const mockMeta = {
      error: '',
      touched: false,
    };

    render(
      <FormField.TextArea meta={ mockMeta } h='200px'/>
    );

    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toHaveStyleRule(`height`, '200px');
  });
});
