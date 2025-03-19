import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import Badge from 'src/components/Atoms/Badge';

describe('Badge Component', () => {
  it('should render with default styles', () => {
    const { container } = render(<Badge />);
    expect(container.firstChild).toHaveStyleRule(
      'background-color',
      'var(--rds-color-tertiary-2-subtle)',
    );
    expect(container.firstChild).toHaveStyleRule(
      'color',
      'var(--rds-color-tertiary-2-deep)',
    );
    expect(container.firstChild).toHaveStyleRule('font-size', '12px');
    expect(container.firstChild).toHaveStyleRule('padding', '0 4px');
  });

  it('should render with Blue appearance', () => {
    const { container } = render(<Badge appearance="blue" />);
    expect(container.firstChild).toHaveStyleRule(
      'background-color',
      'var(--rds-color-tertiary-2-subtle)',
    );
    expect(container.firstChild).toHaveStyleRule(
      'color',
      'var(--rds-color-tertiary-2-deep)',
    );
  });

  it('should render with Green appearance', () => {
    const { container } = render(<Badge appearance="green" />);
    expect(container.firstChild).toHaveStyleRule(
      'background-color',
      'var(--rds-color-secondary-2-subtle)',
    );
    expect(container.firstChild).toHaveStyleRule(
      'color',
      'var(--rds-color-secondary-2-deep)',
    );
  });

  it('should apply margin and padding props', () => {
    const { container } = render(
      <Badge mt="10px" mr="15px" mb="5px" ml="20px" padding="10px 20px" />,
    );
    expect(container.firstChild).toHaveStyleRule('margin-top', '10px');
    expect(container.firstChild).toHaveStyleRule('margin-right', '15px');
    expect(container.firstChild).toHaveStyleRule('margin-bottom', '5px');
    expect(container.firstChild).toHaveStyleRule('margin-left', '20px');
    expect(container.firstChild).toHaveStyleRule('padding', '10px 20px');
  });

  it('should apply fontSize prop', () => {
    const { container } = render(<Badge fontSize="16px" />);
    expect(container.firstChild).toHaveStyleRule('font-size', '16px');
  });

  it('should apply the correct styles for other appearances', () => {
    const appearances = [
      {
        appearance: 'yellow',
        bgColor: 'var(--rds-color-tertiary-1-subtle)',
        color: 'var(--rds-color-tertiary-1-deep)',
      },
      {
        appearance: 'red',
        bgColor: 'var(--rds-color-secondary-3-subtle)',
        color: 'var(--rds-color-secondary-3-deep)',
      },
      {
        appearance: 'violet',
        bgColor: 'var(--rds-color-secondary-1-subtle)',
        color: 'var(--rds-color-secondary-1-deep)',
      },
      {
        appearance: 'teal',
        bgColor: 'var(--rds-color-primary-1-subtle)',
        color: 'var(--rds-color-primary-1-deep)',
      },
      {
        appearance: 'pink',
        bgColor: 'var(--rds-color-tertiary-3-subtle)',
        color: 'var(--rds-color-tertiary-3-deep)',
      },
      {
        appearance: 'orange',
        bgColor: 'var(--rds-color-tertiary-4-subtle)',
        color: 'var(--rds-color-tertiary-4-deep)',
      },
    ];

    appearances.forEach(({ appearance, bgColor, color }) => {
      const { container } = render(<Badge appearance={appearance} />);
      expect(container.firstChild).toHaveStyleRule('background-color', bgColor);
      expect(container.firstChild).toHaveStyleRule('color', color);
    });
  });
});
