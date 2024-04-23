import React from 'react';
import expect from 'expect';
import { render, screen } from '@testing-library/react';

import Profile from 'src/components/Molecules/Profile';

it('should be an anchor element if a is passed in as prop', () => {
  render(<Profile.Item as="a" text="Test" link="text" />);

  const anchorElement = document.querySelector('a');

  expect(anchorElement).toBeInTheDocument();
});

it('should render correct icon', () => {
  render(<Profile.Item icon="global-puzzle" />);

  const iconElement = screen.getByTestId('icon-global-puzzle');

  expect(iconElement).toBeInTheDocument();
  expect(iconElement).toHaveClass('rds-global-puzzle');
});

it('should change color on hover, active and focus states', () => {
  render(
    <Profile.Item
      as="a"
      text="Test"
      icon="global-puzzle"
      onClick={() => alert('test')}
    />
  );

  const itemElement = screen.getByTestId('profile-item');

  expect(itemElement).toHaveStyleRule(
    'background',
    'var(--rds-color-neutral-alpha-1)',
    {
      modifier: ':hover',
    }
  );
  expect(itemElement).toHaveStyleRule(
    'background',
    'var(--rds-color-neutral-alpha-2)',
    {
      modifier: ':active',
    }
  );
  expect(itemElement).toHaveStyleRule(
    'background',
    'var(--rds-color-neutral-alpha-2)',
    {
      modifier: ':focus',
    }
  );
});
