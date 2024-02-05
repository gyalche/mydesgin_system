import React, { useRef } from 'react';
import { render, screen } from '@testing-library/react';
import expect from 'expect';
import Dialog from 'src/components/Molecules/Dialog';
import Button from 'src/components/Atoms/Button';

const { Alert } = Dialog;

const TestComponent = () => {
  const ref = useRef();

  const handleDialogAlertOpen = () => {
    ref.current?.show();
  };

  return (
    <>
      <Button onClick={handleDialogAlertOpen}>Open dialog alert</Button>
      <Alert
        ref={ref}
        title="test title"
        titleIcon="action-cross"
        content="test content"
      />
    </>
  );
};

render(<TestComponent />);

it('should render title, titleIcon and content', () => {
  const titleElement = screen.getByTestId('title-container');
  const iconElement = document.querySelector('i');
  const contentElement = screen.getByTestId('content-container');

  expect(titleElement).toHaveTextContent('test title');
  expect(iconElement).toBeInTheDocument();
  expect(contentElement).toHaveTextContent('test content');
});
