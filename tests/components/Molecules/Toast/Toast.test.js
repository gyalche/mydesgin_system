import React, { useState } from 'react';
import PropTypes from 'prop-types';
import expect from 'expect';
import { act, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@storybook/testing-library';

import Button from 'src/components/Atoms/Button';
import { ToastProvider, useToast } from 'src/components/Molecules/Toast';

const TEST_DURATION = 10000;
const testTitle = 'Test title';
const testDescription = 'Test description';

const mockAction = jest.fn();

const TestComponent = ({ title, description, placement }) => {
  const toast = useToast();

  const handleClick = () => {
    toast?.success(title, description, placement);
  };

  return <Button.Primary onClick={handleClick}>Open Toast</Button.Primary>;
};

TestComponent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  placement: PropTypes.string,
};

it('should open a toast when button is clicked', async () => {
  render(
    <ToastProvider>
      <TestComponent title={testTitle} />
    </ToastProvider>
  );

  const openToastBtn = screen.getByText('Open Toast');

  await act(async () => await userEvent.click(openToastBtn));

  await waitFor(() => {
    const toastsWrapper = screen.getByTestId('toasts-wrapper');
    expect(toastsWrapper).toBeInTheDocument();
  });
});

it('should close the toast when the close button is clicked', async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const openToastBtn = screen.getByText('Open Toast');

    await act(async () => await userEvent.click(openToastBtn));

    await waitFor(() => {
      const toastsWrapper = screen.getByTestId('toasts-wrapper');
      expect(toastsWrapper).toBeInTheDocument();
    });

    await act(async () => {
      const closeIcon = screen.getByTestId('close-icon');
      userEvent.click(closeIcon);

      const EXTRA_TIME_FOR_STATE_TO_UPDATE = 3000;
      await new Promise(resolve =>
        setTimeout(resolve, EXTRA_TIME_FOR_STATE_TO_UPDATE)
      );
    });

    await waitFor(() => {
      const toastsWrapper = screen.queryByTestId('toasts-wrapper');
      expect(toastsWrapper).not.toBeInTheDocument();
    });
  },
  TEST_DURATION
);

it('should render ToastButton and call action on click (action provided, title provided, description provided)', async () => {
    render(
      <ToastProvider>
        <TestComponent
          title={testTitle}
          description={testDescription}
          action={mockAction}
          btnLabel="Action"
        />
      </ToastProvider>
    );

    const openToastBtn = screen.getByText('Open Toast');

    await userEvent.click(openToastBtn);

    // Check that the toast is in the document
    await waitFor(() => {
      const toastsWrapper = screen.getByTestId('toasts-wrapper');
      expect(toastsWrapper).toBeInTheDocument();
    });

    // Check that ToastButton is rendered
    const toastButton = screen.getByTestId('button-id');
    expect(toastButton).toBeInTheDocument();
  },
  TEST_DURATION
);

it('should close the toast automatically after 5 seconds', async () => {
    render(
      <ToastProvider>
        <TestComponent title={testTitle} />
      </ToastProvider>
    );

    const openToastBtn = screen.getByText('Open Toast');

    await act(async () => await userEvent.click(openToastBtn));

    await waitFor(() => {
      const toastsWrapper = screen.getByTestId('toasts-wrapper');
      expect(toastsWrapper).toBeInTheDocument();
    });

    // When testing, code that causes React state updates should be wrapped into act(...)
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 5000));
    });

    await waitFor(() => {
      const toastsWrapper = screen.queryByTestId('toasts-wrapper');
      expect(toastsWrapper).not.toBeInTheDocument();
    });
  },
  TEST_DURATION
);

it('should render the correct title and description', async () => {
  render(
    <ToastProvider>
      <TestComponent title={testTitle} description={testDescription} />
    </ToastProvider>
  );

  const openToastBtn = screen.getByText('Open Toast');

  await act(async () => await userEvent.click(openToastBtn));

  await waitFor(() => {
    const toastsWrapper = screen.getByTestId('toasts-wrapper');
    const title = screen.getByText('Test title');
    const description = screen.getByText('Test description');

    expect(toastsWrapper).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});

it('should render the action button on the right when action and title is provided', async ()=>{
  render(
    <ToastProvider>
      <TestComponent title={testTitle} action={mockAction} btnLabel="action" />
    </ToastProvider>
  );

  const openToastBtn = screen.getByText('Open Toast');

  await userEvent.click(openToastBtn);

  // Check that the toast is in the document
  await waitFor(() => {
    const toastsWrapper = screen.getByTestId('toasts-wrapper');
    expect(toastsWrapper).toBeInTheDocument();
  });

  // Check that action button is render on the right
  const toastButton = screen.getByTestId('right-side-btn');
  expect(toastButton).toBeInTheDocument();
});


it('should render ToastButton below description if props(title, action) is passed and not iconButton', async () => {
    render(
      <ToastProvider>
        <TestComponent title={testTitle} action={mockAction} btnLabel="action" />
      </ToastProvider>
    );

    const openToastBtn = screen.getByText('Open Toast');

    await userEvent.click(openToastBtn);

    // Check that the toast is in the document
    await waitFor(() => {
      const toastsWrapper = screen.getByTestId('toasts-wrapper');
      expect(toastsWrapper).toBeInTheDocument();
    });

    // Check that ToastButton is rendered below description
    const toastButton = screen.getByTestId('right-side-btn');
    expect(toastButton).toBeInTheDocument();
   
    // Check that the CloseIcon is also rendered
    const closeIcon = screen.queryByTestId('close-icon');
    expect(closeIcon).toBeInTheDocument();
  },
  TEST_DURATION
);
