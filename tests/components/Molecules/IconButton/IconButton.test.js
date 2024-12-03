import React from 'react';
import expect from 'expect';
import { render } from '@testing-library/react';
import StyledIconButton from 'src/components/Molecules/IconButton';
import { Typography } from 'src/components/Atoms';

describe('StyledIconButton Component', () => {
  it('should render correctly with default props', () => {
    const { container } = render(<StyledIconButton />);
    expect(container.firstChild).toBeInTheDocument();
    expect(container.querySelector('i')).toHaveClass(
      'rds rds-navigation-users'
    );
    expect(container.querySelector(Typography)).toBeNull();
  });

  it('should render icon with provided iconName', () => {
    const { container } = render(<StyledIconButton iconName='search' />);
    expect(container.querySelector('i')).toHaveClass('rds rds-search');
  });

  it('should render text when provided', () => {
    const { getByText } = render(<StyledIconButton text='Click Me' />);
    expect(getByText('Click Me')).toBeInTheDocument();
  });

  it('should apply correct appearance styles', () => {
    const { container } = render(
      <StyledIconButton appearance='link' text='Click Me' />
    );
    expect(container.querySelector(Typography)).toHaveStyleRule(
      'text-decoration: underline'
    );
    expect(container.querySelector(Typography)).toHaveStyleRule(
      'margin-right: 4px'
    );
    expect(container.querySelector(Typography)).toHaveStyleRule(
      'margin-left: 4px'
    );
  });

  it('should apply custom `as` prop correctly', () => {
    const { container } = render(
      <StyledIconButton as='a' href='https://example.com' />
    );
    expect(container.firstChild).toHaveAttribute('href', 'https://example.com');
    expect(container.firstChild.tagName).toBe('A');
  });

  it('should apply correct flex-direction based on position prop', () => {
    const { container } = render(<StyledIconButton position='right' />);
    expect(container.firstChild).toHaveStyleRule('flex-direction: row-reverse');
  });

  it('should apply correct font-size based on compact and hastext props', () => {
    const { container } = render(<StyledIconButton compact />);
    expect(container.firstChild).toHaveStyleRule('font-size: 24px');

    const { container: containerWithText } = render(
      <StyledIconButton hastext text='Text' />
    );
    expect(containerWithText.firstChild).toHaveStyleRule('font-size: 24px');
  });
});
