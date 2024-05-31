import React from 'react';
import expect from 'expect';
import { render, screen, waitFor } from '@testing-library/react';

import Profile from 'src/components/Molecules/Profile';
import { userEvent } from '@storybook/testing-library';

const TestProfile = () => {
  const account = {
    name: 'John Doe',
    email: 'email@users.email',
    image:
      'https://s3-ap-northeast-1.amazonaws.com/receptionist/uploads/employee/icon_uri/1/0b0912de-ea24-4392-a2e0-ca02c83f8614.jpg',
  };
  return <Profile account={account}>test</Profile>;
};

it('should render name, email and image as passed in props', async () => {
  render(<TestProfile />);
  const profileDropdown = screen.queryByTestId('dropdown');
  expect(profileDropdown).toHaveStyleRule('visibility', 'hidden');

  const image = screen.getByTestId('profile-image');
  userEvent.click(image);

  await waitFor(() => {
    const profileDropdown = screen.getByTestId('dropdown');
    expect(profileDropdown).toHaveStyleRule('visibility', 'visible');

    const nameElement = screen.getByText('John Doe');
    expect(nameElement).toBeInTheDocument();

    const emailElement = screen.getByText('email@users.email');
    expect(emailElement).toBeInTheDocument();
  });
});

it('should open dropdown when image is clicked', async () => {
  render(<TestProfile />);
  const profileDropdown = screen.queryByTestId('dropdown');
  expect(profileDropdown).toHaveStyleRule('visibility', 'hidden');

  const image = screen.getByTestId('profile-image');
  userEvent.click(image);

  await waitFor(() => {
    const profileDropdown = screen.getByTestId('dropdown');
    expect(profileDropdown).toHaveStyleRule('visibility', 'visible');
  });
});

it('should close dropdown when clicked outside', async () => {
  render(<TestProfile />);
  const profileDropdown = screen.queryByTestId('dropdown');
  expect(profileDropdown).toHaveStyleRule('visibility', 'hidden');

  const image = screen.getByTestId('profile-image');
  userEvent.click(image);

  await waitFor(() => {
    const profileDropdown = screen.getByTestId('dropdown');
    expect(profileDropdown).toHaveStyleRule('visibility', 'visible');
  });

  userEvent.click(document.body);
  
  await waitFor(() => {
    const profileDropdown = screen.getByTestId('dropdown');
    expect(profileDropdown).toHaveStyleRule('visibility', 'hidden');
  });
});
