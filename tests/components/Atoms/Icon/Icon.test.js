import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import Icon from 'src/components/Atoms/Icon';
import icons from 'shared/css/icons.module.css';

describe('Icon Component', () => {
  it('should render correctly with the required name prop', () => {
    const { container } = render(<Icon name='home' />);
    expect(container.querySelector('i')).toBeInTheDocument();
    expect(container.querySelector('i')).toHaveClass('rds');
    expect(container.querySelector('i')).toHaveClass(icons['rds-home']);
  });

  it('should apply additional className when provided', () => {
    const { container } = render(<Icon name='home' className='extra-class' />);
    expect(container.querySelector('i')).toHaveClass('extra-class');
  });

  it('should accept and pass down additional props', () => {
    const { container } = render(<Icon name='home' aria-label='home icon' />);
    expect(container.querySelector('i')).toHaveAttribute(
      'aria-label',
      'home icon'
    );
  });

  it('should handle different icon names correctly', () => {
    const iconNames = ['user', 'settings', 'search'];

    iconNames.forEach((iconName) => {
      const { container } = render(<Icon name={iconName} />);
      expect(container.querySelector('i')).toHaveClass(
        icons[`rds-${iconName}`]
      );
    });
  });
});
