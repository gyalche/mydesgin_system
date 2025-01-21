import React from 'react';
import expect from 'expect';
import { render, screen, waitFor } from '@testing-library/react';
import Spinner from 'src/components/Molecules/Loading';

describe('Spinner Component', () => {
  it('renders with default size prop', async() => {
    render(<Spinner />);
    const spinnerIcon = screen.findByRole('img', { name: /global-spinner/i });
    
    waitFor(()=>{
      expect(spinnerIcon).toHaveClass('spin');
      expect(spinnerIcon).toHaveStyleRule('font-size: 96px');
    });
  });

  it('renders with large size', () => {
    render(<Spinner size="large" />);
    const spinnerIcon = screen.findByRole('img', { name: /global-spinner/i });
    
    waitFor(() => {
      expect(spinnerIcon).toHaveStyleRule('font-size: 48px');
    });
  });

  it('renders with medium size', () => {
    render(<Spinner size="medium" />);
    const spinnerIcon = screen.findByRole('img', { name: /global-spinner/i });
    
    waitFor(() => {
      expect(spinnerIcon).toHaveStyleRule('font-size: 24px');
    });
  });

  it('renders with small size', () => {
    render(<Spinner size="small" />);
    const spinnerIcon = screen.findByRole('img', { name: /global-spinner/i });

    waitFor(() => {
      expect(spinnerIcon).toHaveStyleRule('font-size: 16px');
    });
  });

  it('applies the spin class', () => {
    render(<Spinner />);
    const spinnerIcon = screen.findByRole('img', { name: /global-spinner/i });
    
    waitFor(() => {
      expect(spinnerIcon).toHaveClass('spin');
    });
  });
});
