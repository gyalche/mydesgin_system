import React from 'react';
import expect from 'expect';
import { render, screen } from '@testing-library/react';

import Tooltip from 'src/components/Molecules/Tooltip';

it('should render the correct header, message and subMessage', () => {
  const header = 'Tooltip Header';
  const message = 'Tooltip Message';
  const subMessage = 'Tooltip Sub Message';

  render(
    <Tooltip header={header} message={message} subMessage={subMessage}>
      test
    </Tooltip>
  );

  const headerElement = screen.getByText(header);
  const messageElement = screen.getByText(message);
  const subMessageElement = screen.getByText(subMessage);

  expect(headerElement).toBeInTheDocument();
  expect(messageElement).toBeInTheDocument();
  expect(subMessageElement).toBeInTheDocument();
});

it('should change background color and font color', () => {
  const bgColor = 'var(--rds-color-primary-1-normal)';
  const fontColor = 'var(--rds-color-neutral-11)';

  render(
    <Tooltip bgColor={bgColor} fontColor={fontColor}>
      test
    </Tooltip>
  );
  const displayTextElement = screen.getByTestId('tooltip-display-text');

  expect(displayTextElement).toHaveStyleRule(
    'background-color',
    'var(--rds-color-primary-1-normal)'
  );

  expect(displayTextElement).toHaveStyleRule(
    'color',
    'var(--rds-color-neutral-11)'
  );
});
