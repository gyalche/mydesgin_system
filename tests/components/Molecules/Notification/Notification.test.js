import React from 'react';
import expect from 'expect';
import { render, screen, waitFor } from '@testing-library/react';

import Notification from 'src/components/Molecules/Notification';
import { userEvent } from '@storybook/test';

const TestNotification = () => {
  const notifications = [
      {
        title: 'title',
        category: 'important',
        date: '04/04/2025',
      },
    ]
  return <Notification notifications={notifications}>test</Notification>;
};

it('should render title, category and date as passed in props', async () => {
  render(<TestNotification />);
  const profileDropdown = screen.queryByTestId('dropdown');
  expect(profileDropdown).toHaveStyleRule('visibility', 'hidden');

  const image = screen.getByTestId('bell-icon-button');
  userEvent.click(image);

  await waitFor(() => {
    const notificationDropdown = screen.getByTestId('dropdown');
    expect(notificationDropdown).toHaveStyleRule('visibility', 'visible');

    const titleElement = screen.getByText('title');
    expect(titleElement).toBeInTheDocument();

    const categoryElement = screen.getByText('important | 04/04/2025');
    expect(categoryElement).toBeInTheDocument();

  });
});

it('should open dropdown when image is clicked', async () => {
  render(<TestNotification />);
  const profileDropdown = screen.queryByTestId('dropdown');
  expect(profileDropdown).toHaveStyleRule('visibility', 'hidden');

  const image = screen.getByTestId('bell-icon-button');
  userEvent.click(image);

  await waitFor(() => {
    const profileDropdown = screen.getByTestId('dropdown');
    expect(profileDropdown).toHaveStyleRule('visibility', 'visible');
  });
});

it('should close dropdown when clicked outside', async () => {
  render(<TestNotification />);
  const profileDropdown = screen.queryByTestId('dropdown');
  expect(profileDropdown).toHaveStyleRule('visibility', 'hidden');

  const image = screen.getByTestId('bell-icon-button');
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
