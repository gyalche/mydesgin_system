import React from 'react';
import PropTypes from 'prop-types';
import expect from 'expect';
import {
  act, render, screen,
} from '@testing-library/react';
import { userEvent } from '@storybook/test';

import Button from 'components/Atoms/Button';
import { ToastProvider, useToast } from 'components/Molecules/Toast';

const testTitle = 'Test title';
const testDescription = 'Test description';

const mockAction = jest.fn();

function TestComponent({
  title, description, placement, action, btnLabel,
}) {
  const toast = useToast();

  const handleClick = () => {
    toast?.success(title, description, placement, 1000, action, btnLabel);
  };

  return <Button.Primary onClick={handleClick}>Open Toast</Button.Primary>;
}

TestComponent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  placement: PropTypes.string,
  action: PropTypes.func,
  btnLabel: PropTypes.string,
};

TestComponent.defaultProps = {
  description: undefined,
  placement: undefined,
  action: undefined,
  btnLabel: undefined,
};

it('should open a toast when button is clicked', async () => {
  render(
    <ToastProvider>
      <TestComponent title={testTitle} />
    </ToastProvider>,
  );

  // Use act to wrap the click event that causes state updates
  await act(async () => {
    const openToastBtn = screen.getByText('Open Toast');
    await userEvent.click(openToastBtn);
  });

  // No need for waitFor since act will wait for updates
  const toastsWrapper = screen.getByTestId('toasts-wrapper');
  expect(toastsWrapper).toBeInTheDocument();
});

it('should close the toast when the close button is clicked', async () => {
  render(
    <ToastProvider>
      <TestComponent title={testTitle} />
    </ToastProvider>,
  );

  // Open toast with act
  await act(async () => {
    const openToastBtn = screen.getByText('Open Toast');
    await userEvent.click(openToastBtn);
  });

  // Verify toast is open
  const toastsWrapper = screen.getByTestId('toasts-wrapper');
  expect(toastsWrapper).toBeInTheDocument();

  // Close toast with act
  await act(async () => {
    const closeIcon = screen.getByTestId('close-icon');
    await userEvent.click(closeIcon);
  });

  // Wait for the animation timeout in the component
  // Increase the timeout to ensure the animation completes
  await new Promise(resolve => {
    setTimeout(resolve, 1500);
  });

  // Verify toast is closed
  expect(screen.queryByTestId('toasts-wrapper')).not.toBeInTheDocument();
});

it('should render the correct title and description', async () => {
  render(
    <ToastProvider>
      <TestComponent title={testTitle} description={testDescription} />
    </ToastProvider>,
  );

  // Open toast with act
  await act(async () => {
    const openToastBtn = screen.getByText('Open Toast');
    await userEvent.click(openToastBtn);
  });

  // Verify title and description
  const title = screen.getByText(testTitle);
  const description = screen.getByText(testDescription);
  expect(title).toBeInTheDocument();
  expect(description).toBeInTheDocument();
});

it('should render action button below description when title, description, and action are provided', async () => {
  render(
    <ToastProvider>
      <TestComponent
        title={testTitle}
        description={testDescription}
        action={mockAction}
        btnLabel="Action"
      />
    </ToastProvider>,
  );

  // Open toast with act
  await act(async () => {
    const openToastBtn = screen.getByText('Open Toast');
    await userEvent.click(openToastBtn);
  });

  // Verify action button
  const actionButton = screen.getByTestId('button-id');
  expect(actionButton).toBeInTheDocument();
  expect(actionButton).toHaveTextContent('Action');

  // Click action button with act
  await act(async () => {
    await userEvent.click(actionButton);
  });

  expect(mockAction).toHaveBeenCalled();
});

it('should render action button on the right when title and action are provided without description', async () => {
  render(
    <ToastProvider>
      <TestComponent
        title={testTitle}
        action={mockAction}
        btnLabel="Action"
      />
    </ToastProvider>,
  );

  // Open toast with act
  await act(async () => {
    const openToastBtn = screen.getByText('Open Toast');
    await userEvent.click(openToastBtn);
  });

  // Verify action button position
  const actionButton = screen.getByTestId('right-side-btn');
  expect(actionButton).toBeInTheDocument();
});
