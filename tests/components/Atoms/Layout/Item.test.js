import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Item from 'src/components/Atoms/Layout/Item';

describe('Item Component', () => {
  it('renders with default styles', () => {
    const { container } = render(<Item />);
    const itemElement = container.firstChild;

    expect(itemElement).toHaveStyleRule(`
      flex: 0 1 auto;
      width: 100%;
      height: auto;
      min-width: unset;
      min-height: unset;
      max-width: none;
      max-height: none;
      background-color: transparent;
      margin-top: 0;
      margin-right: 0;
      margin-bottom: 0;
      margin-left: 0;
    `);
  });

  it('applies custom flex property', () => {
    const { container } = render(<Item flex='1 0 auto' />);
    const itemElement = container.firstChild;

    expect(itemElement).toHaveStyleRule('flex: 1 0 auto;');
  });

  it('applies custom width, height, margin, and background color', () => {
    const { container } = render(
      <Item
        w='50%'
        h='200px'
        mt='10px'
        mr='15px'
        mb='20px'
        ml='25px'
        bgColor='red'
      />
    );
    const itemElement = container.firstChild;

    expect(itemElement).toHaveStyleRule(`
      width: 50%;
      height: 200px;
      margin-top: 10px;
      margin-right: 15px;
      margin-bottom: 20px;
      margin-left: 25px;
      background-color: red;
    `);
  });

  it('applies custom min-width, max-width, min-height, and max-height', () => {
    const { container } = render(
      <Item minW='100px' maxW='500px' minH='50px' maxH='300px' />
    );
    const itemElement = container.firstChild;

    expect(itemElement).toHaveStyleRule(`
      min-width: 100px;
      max-width: 500px;
      min-height: 50px;
      max-height: 300px;
    `);
  });
});
