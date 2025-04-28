import React from 'react';
import expect from 'expect';
import { render, screen, fireEvent } from '@testing-library/react';

import Tag from 'components/Atoms/Tag';

describe('Tag Component', () => {
  it('renders correctly with default props', async () => {
    render(<Tag name="Tag" onClick={() => {}} />);

    const label = screen.getByText('Tag');
    expect(label).toBeInTheDocument();
    const removeButton = screen.getByLabelText('Remove Tag');
    expect(removeButton).toBeInTheDocument();
  });

  it('applies the correct style for normal state', () => {
    render(<Tag name="Tag" onClick={() => {}} />);

    const container = screen.getByText('Tag').closest('div');
    // Using jest-styled-components to test styles
    expect(container).toHaveStyleRule('background-color', '#FFFFFF');
    expect(container).toHaveStyleRule('border', '1px solid #A8A19D');
    expect(container).toHaveStyleRule('color', '#333');
  });

  it('applies the correct style for disabled state', () => {
    render(<Tag name="Tag" onClick={() => {}} disabled={true} />);

    const container = screen.getByText('Tag').closest('div');
    // Using jest-styled-components to test styles
    expect(container).toHaveStyleRule('background-color', '#F5F5F5');
    expect(container).toHaveStyleRule('color', '#A8A19D');
  });

  it('calls onClick when close icon is clicked', () => {
    const handleClick = jest.fn();
    render(<Tag name="Tag" onClick={handleClick} />);

    const removeButton = screen.getByLabelText('Remove Tag');
    fireEvent.click(removeButton);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders without crashing when onClick is not provided', () => {
    render(<Tag name="Tag" />);
    // No remove button should be rendered when onClick is not provided
    const removeButton = screen.queryByLabelText('Remove Tag');
    expect(removeButton).not.toBeInTheDocument();
  });

  it('renders with the correct name prop', () => {
    render(<Tag name="Test Label" />);

    const label = screen.getByText('Test Label');
    expect(label).toBeInTheDocument();
  });

  it('renders with a graphic when provided', () => {
    const testGraphic = <div data-testid="test-graphic">Icon</div>;
    render(<Tag name="Tag" graphic={testGraphic} />);
    const graphic = screen.getByTestId('test-graphic');
    expect(graphic).toBeInTheDocument();
  });
});
