import React from 'react';
import expect from 'expect';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CommonTagStyle from 'src/components/Atoms/Tags';

describe('CommonTagStyle Component', () => {
  it('renders correctly with default props', () => {
    render(<CommonTagStyle content="Tag" icon="close" appearance="normal" />);
    
    const label = screen.getByText('Tag');
    const icon = screen.findByRole('img', { name: /close/i });
    
    expect(label).toBeInTheDocument();
    waitFor(() => {
      expect(icon).toBeInTheDocument();
    });
  });

  it('applies the correct appearance style for normal state', () => {
    render(<CommonTagStyle content="Tag" icon="close" appearance="normal" />);
    
    const container = screen.getByText('Tag').parentElement;
    
    expect(container).toHaveStyle('background-color: var(--rds-color-neutral-0)');
    expect(container).toHaveStyle('border: 1px solid var(--rds-color-neutral-3)');
    expect(container).toHaveStyle('color: var(--rds-color-neutral-10)');
  });

  it('applies the correct appearance style for disabled state', () => {
    render(<CommonTagStyle content="Tag" icon="close" appearance="disabled" />);
    
    const container = screen.getByText('Tag').parentElement;
    
    expect(container).toHaveStyle('background-color: var(--rds-color-neutral-2)');
    expect(container).toHaveStyle('border: 1px solid var(--rds-color-neutral-3)');
    expect(container).toHaveStyle('color: var(--rds-color-neutral-5)');
  });

  it('calls onCloseClick when icon is clicked', () => {
    const handleClick = jest.fn();
    render(<CommonTagStyle content="Tag" icon="close" appearance="normal" onCloseClick={handleClick} />);
    
    const icon = screen.findByRole('img', { name: /close/i });
    waitFor(() => {
      fireEvent.click(icon);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  it('renders without crashing when onCloseClick is not provided', () => {
    render(<CommonTagStyle content="Tag" icon="close" appearance="normal" />);
    
    const icon = screen.findByRole('img', { name: /close/i });

    waitFor(() => {
      fireEvent.click(icon);

      // No errors should be thrown
      expect(icon).toBeInTheDocument();
    });
  });

  it('renders with the correct value prop', () => {
    render(<CommonTagStyle content="Test Label" icon="close" appearance="normal" />);
    
    const label = screen.getByText('Test Label');
    expect(label).toBeInTheDocument();
  });

  it('renders with a different icon name when passed as a prop', async() => {
    render(<CommonTagStyle content="Tag" icon="check" appearance="normal" />);
    const icon = screen.findByRole('img', { name: /check/i });
    waitFor(()=>{
      expect(icon).toHaveAttribute('name', 'check');
    });
  });
});
