import React from 'react';
import expect from 'expect';
import { render, screen } from '@testing-library/react';
import Alert from 'src/components/Molecules/InlineAlert';
import { waitFor } from '@storybook/test';

describe('Alert Component', () => {
  it('renders without crashingt', () => {
    const mockAction = jest.fn();
    render(<Alert title="Test Alert" apperance="info" description="This is a description" action={mockAction} />);
    expect(screen.getByText('Test Alert')).toBeInTheDocument();
    expect(screen.getByText('This is a description')).toBeInTheDocument();
    expect(screen.queryByTestId('description')).not.toBeInTheDocument();
  });

  it('Renders proper styling for INFO alert', async () => {
    render(<Alert title="Test Alert" apperance="info" description="This is a description" />);
    const infoAlert = await screen.findByRole('alert');
    expect(infoAlert).toBeInTheDocument();
    expect(infoAlert).toHaveStyleRule({ 'background-color': 'var(--rds-color-neutral-2)' });
  });

  it('Renders proper styling for SUCCESS alert', async () => {
    render(<Alert title="Test Alert" apperance="info" description="This is a description" />);
    const infoAlert = await screen.findByRole('alert');
    expect(infoAlert).toBeInTheDocument();
    expect(infoAlert).toHaveStyleRule({ 'background-color': 'var(--rds-color-secondary-2-pale)' });
  });

  it('Renders proper styling for WARNING alert', async () => {
    render(<Alert title="Test Alert" apperance="info" description="This is a description" />);
    const infoAlert = await screen.findByRole('alert');
    expect(infoAlert).toBeInTheDocument();
    expect(infoAlert).toHaveStyleRule({ 'background-color': 'var(--rds-color-tertiary-1-subtle)' });
  });

  it('Renders proper styling for ERROR alert', async () => {
    render(<Alert title="Test Alert" apperance="info" description="This is a description" />);
    const infoAlert = await screen.findByRole('alert');
    expect(infoAlert).toBeInTheDocument();
    expect(infoAlert).toHaveStyleRule({ 'background-color': 'var(--rds-color-secondary-3-subtle)' });
  });

  describe('ToastIcon Appearance', () => {
    const ICONS = {
      success: 'alert-circle-solid-check',
      info: 'alert-circle-solid-info',
      warning: 'alert-polygon-solid-exclamation',
      error: 'alert-circle-solid-cross',
    };

    it.each(Object.entries(ICONS))(
      'renders correct icon for appearance',
      (appearance, expectedIcon) => {
        const { container } = render(<Alert title="Test" appearance={appearance} />);
        const icon = container.querySelector('.icon-size');
        expect(icon).toBeInTheDocument();
        waitFor(() => {
          expect(icon).toHaveAttribute('name', expectedIcon);
        });
      },
    );
  });
});
