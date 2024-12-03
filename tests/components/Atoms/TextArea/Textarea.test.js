import React from 'react';
import expect from 'expect';
import { render, screen } from '@testing-library/react';
import TextArea from 'src/components/Atoms/TextArea';

describe('TextArea Component', () => {
  it('applies default styles', () => {
    render(<TextArea placeholder='Test Placeholder' />);
    const textAreaElement = screen.getByPlaceholderText('Test Placeholder');
    expect(textAreaElement).toHaveStyleRule('width: 200px');
    expect(textAreaElement).toHaveStyleRule('height: 300px');
    expect(textAreaElement).toHaveStyleRule('margin-top: 0');
    expect(textAreaElement).toHaveStyleRule('margin-right: 0');
    expect(textAreaElement).toHaveStyleRule('margin-bottom: 0');
    expect(textAreaElement).toHaveStyleRule('margin-left: 0');
    expect(textAreaElement).toHaveStyleRule(
      'border: 1px solid var(--rds-color-neutral-3)'
    );
  });

  it('applies custom styles', () => {
    render(
      <TextArea
        mt='10px'
        mr='20px'
        mb='30px'
        ml='40px'
        w='400px'
        h='500px'
        isInvalid
        placeholder='Custom Placeholder'
      />
    );
    const textAreaElement = screen.getByPlaceholderText('Custom Placeholder');

    expect(textAreaElement).toHaveStyleRule('width: 400px');
    expect(textAreaElement).toHaveStyleRule('height: 500px');
    expect(textAreaElement).toHaveStyleRule('margin-top: 10px');
    expect(textAreaElement).toHaveStyleRule('margin-right: 20px');
    expect(textAreaElement).toHaveStyleRule('margin-bottom: 30px');
    expect(textAreaElement).toHaveStyleRule('margin-left: 40px');
    expect(textAreaElement).toHaveStyleRule(
      'border: 1px solid var(--rds-color-secondary-3-normal)'
    );
  });

  it('displays placeholder text', () => {
    render(<TextArea placeholder='Placeholder Text' />);
    const textAreaElement = screen.getByPlaceholderText('Placeholder Text');

    expect(textAreaElement).toBeInTheDocument();
  });

  it('changes border color on hover', () => {
    render(<TextArea placeholder='Hover Test' />);
    const textAreaElement = screen.getByPlaceholderText('Hover Test');

    expect(textAreaElement).toHaveStyleRule(
      'border',
      '1px solid var(--rds-color-primary-1-normal)',
      {
        modifier: '&:hover',
      }
    );
  });

  it('changes style when disabled', () => {
    render(<TextArea disabled placeholder='Disabled Test' />);
    const textAreaElement = screen.getByPlaceholderText('Disabled Test');

    expect(textAreaElement).toHaveStyleRule(
      'background-color: var(--rds-color-neutral-2)'
    );
    expect(textAreaElement).toHaveStyleRule(
      'border: 1px solid var(--rds-color-neutral-3)'
    );
    expect(textAreaElement).toHaveStyleRule(
      'color: var(--rds-color-neutral-5)'
    );
  });

  it('handles invalid prop correctly', () => {
    render(<TextArea isInvalid placeholder='Invalid Test' />);
    const textAreaElement = screen.getByPlaceholderText('Invalid Test');

    expect(textAreaElement).toHaveStyleRule(
      'border: 1px solid var(--rds-color-secondary-3-normal)'
    );
  });
});
