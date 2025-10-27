import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import 'jest-styled-components';
import Avatar from 'components/Atoms/Avatar';

describe('Avatar Component', () => {
  it('renders with initials when no image is provided', () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('renders with initials when image source is invalid', async () => {
    // Mock Image.onerror
    const originalImage = global.Image;
    global.Image = class {
      constructor() {
        setTimeout(() => {
          this.onerror();
        }, 100);
      }
    };

    render(<Avatar name="John Doe" src="invalid-image.jpg" />);

    // Wait for the image error handler to be called
    await waitFor(() => {
      expect(screen.getByText('J')).toBeInTheDocument();
    });

    // Restore original Image constructor
    global.Image = originalImage;
  });

  it('renders with image when valid source is provided', async () => {
    // Mock successful image load
    const originalImage = global.Image;
    global.Image = class {
      constructor() {
        setTimeout(() => {
          this.onload();
        }, 100);
      }
    };

    render(<Avatar name="John Doe" src="valid-image.jpg" />);

    await waitFor(() => {
      const img = screen.getByAltText('John Doe');
      expect(img).toBeInTheDocument();
      expect(img.tagName).toBe('IMG');
      expect(img).toHaveAttribute('src', 'valid-image.jpg');
    });

    // Restore original Image constructor
    global.Image = originalImage;
  });

  it('applies different sizes correctly', () => {
    const { rerender } = render(<Avatar name="John Doe" size="small" />);
    expect(screen.getByText('J')).toHaveStyleRule('width', '24px');
    expect(screen.getByText('J')).toHaveStyleRule('height', '24px');
    expect(screen.getByText('J')).toHaveStyleRule('font-size', '12px');

    rerender(<Avatar name="John Doe" size="medium" />);
    expect(screen.getByText('J')).toHaveStyleRule('width', '32px');
    expect(screen.getByText('J')).toHaveStyleRule('height', '32px');
    expect(screen.getByText('J')).toHaveStyleRule('font-size', '16px');

    rerender(<Avatar name="John Doe" size="large" />);
    expect(screen.getByText('J')).toHaveStyleRule('width', '40px');
    expect(screen.getByText('J')).toHaveStyleRule('height', '40px');
    expect(screen.getByText('J')).toHaveStyleRule('font-size', '20px');
  });

  it('applies margin props correctly', () => {
    render(
      <Avatar
        name="John Doe"
        mt="10px"
        mr="20px"
        mb="30px"
        ml="40px"
      />,
    );

    const avatar = screen.getByText('J');
    expect(avatar).toHaveStyleRule('margin-top', '10px');
    expect(avatar).toHaveStyleRule('margin-right', '20px');
    expect(avatar).toHaveStyleRule('margin-bottom', '30px');
    expect(avatar).toHaveStyleRule('margin-left', '40px');
  });

  it('applies consistent color based on name', () => {
    const { rerender } = render(<Avatar name="John Doe" />);
    const firstElement = screen.getByText('J');
    const firstColorStyle = firstElement.getAttribute('colorstyle');

    rerender(<Avatar name="John Doe" />);
    const secondElement = screen.getByText('J');
    const secondColorStyle = secondElement.getAttribute('colorstyle');

    // Same name should get same color
    expect(firstColorStyle).toBe(secondColorStyle);

    rerender(<Avatar name="Jane Smith" />);
    // Different name might get different color, but we don't test that
    // as it's implementation-dependent
  });

  it('trims whitespace from name when getting first character', () => {
    render(<Avatar name="  John Doe  " />);
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('handles empty name gracefully', () => {
    const { container } = render(<Avatar name="" />);
    // Should not crash, but might not display anything
    // Instead of looking for a specific element, just check that the component rendered
    expect(container.firstChild).toBeInTheDocument();
  });
});
