import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@storybook/test';
import expect from 'expect';
import Button from 'src/components/Atoms/Button';
import Dialog from 'src/components/Molecules/Dialog';

const TestComponent = ({ backdrop, showClose, buttons }) => {
  const ref = useRef();

  const handleDialogOpen = () => {
    ref.current.show();
  };

  return (
    <>
      <Button onClick={() => handleDialogOpen()}>Open dialog</Button>
      <Dialog ref={ref} backdrop={backdrop} showClose={showClose} buttons={buttons}>
        test
      </Dialog>
    </>
  );
};

TestComponent.defaultProps = {
  backdrop: false,
  showClose: false,
  buttons: [],
};

TestComponent.propTypes = {
  backdrop: PropTypes.bool,
  showClose: PropTypes.bool,
  buttons: PropTypes.oneOfType([PropTypes.array]),
};

it('should render what is passed as children to the component', async () => {
  render(<TestComponent />);

  const buttonElement = screen.getByRole('button');
  userEvent.click(buttonElement);

  await waitFor(() => {
    const dialogElement = screen.getByTestId('dialog');
    expect(dialogElement).toHaveTextContent('test');
  });
});

it('should have backdrop when backdrop prop is true', async () => {
  render(<TestComponent backdrop />);

  const buttonElement = screen.getByRole('button');
  userEvent.click(buttonElement);

  await waitFor(() => {
    const dialogElement = screen.getByTestId('dialog');

    expect(dialogElement).toHaveStyleRule(
      'background',
      'rgba(71,77,102,0.64)',
      {
        modifier: '::backdrop',
      }
    );
  });
});

it('should render X icon when showClose prop is true', async () => {
  render(<TestComponent showClose />);

  const buttonElement = screen.getByRole('button');
  userEvent.click(buttonElement);

  await waitFor(() => {
    const closeIconElement = screen.getByTestId('close-icon-placement');
    expect(closeIconElement).toBeInTheDocument();
  });
});

it('should display buttons passed to the buttons prop', async () => {
  const buttons = [
    {
      text: 'Close',
      button: Button,
      onClick: 'close',
    },
    {
      text: 'OK',
      button: Button,
      onClick: () => alert('OK'),
    },
  ];

  render(<TestComponent buttons={buttons} />);

  const openDialogBtnElement = screen.getByText('Open dialog');
  userEvent.click(openDialogBtnElement);

  await waitFor(() => {
    const closeBtnElement = screen.getByText('Close');
    const okBtnElement = screen.getByText('OK');

    expect(closeBtnElement).toBeInTheDocument();
    expect(okBtnElement).toBeInTheDocument();
  });
});
