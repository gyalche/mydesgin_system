import React from 'react';
import expect from 'expect';
import { render, screen } from '@testing-library/react';

import Profile from 'src/components/Molecules/Profile';

it('should render the correct text', () => {
  render(<Profile.Header icon="global-circle-yen" text="料金プラン" />);

  const headerElement = screen.getByText('料金プラン');

  expect(headerElement).toBeInTheDocument();
});
