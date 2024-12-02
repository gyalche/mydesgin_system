import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Block from 'src/components/Atoms/Layout/Block';

describe('Block Component', () => {
  it('renders with default styles', () => {
    const { container } = render(<Block />);
    const blockElement = container.firstChild;

    expect(blockElement).toHaveStyleRule(`
      display: block;
      width: 100%;
      height: auto;
      min-width: unset;
      min-height: unset;
      max-width: none;
      max-height: none;
      margin-top: 0;
      margin-right: 0;
      margin-bottom: 0;
      margin-left: 0;
      padding-top: 0;
      padding-right: 0;
      padding-bottom: 0;
      padding-left: 0;
      cursor: auto;
      border: none;
      border-radius: unset;
    `);
  });

  it('applies custom width, height, and padding', () => {
    const { container } = render(
      <Block w='50%' h='200px' pt='10px' pr='15px' pb='20px' pl='25px' />
    );
    const blockElement = container.firstChild;

    expect(blockElement).toHaveStyleRule(`
      width: 50%;
      height: 200px;
      padding-top: 10px;
      padding-right: 15px;
      padding-bottom: 20px;
      padding-left: 25px;
    `);
  });

  it('applies custom margin, min and max dimensions, and cursor', () => {
    const { container } = render(
      <Block
        mt='10px'
        mr='15px'
        mb='20px'
        ml='25px'
        minW='100px'
        maxW='300px'
        minH='50px'
        maxH='150px'
        cursor='pointer'
      />
    );
    const blockElement = container.firstChild;

    expect(blockElement).toHaveStyleRule(`
      margin-top: 10px;
      margin-right: 15px;
      margin-bottom: 20px;
      margin-left: 25px;
      min-width: 100px;
      max-width: 300px;
      min-height: 50px;
      max-height: 150px;
      cursor: pointer;
    `);
  });

  it('applies custom border and border radius', () => {
    const { container } = render(
      <Block border='1px solid black' borderRadius='5px' />
    );
    const blockElement = container.firstChild;

    expect(blockElement).toHaveStyleRule(`
      border: 1px solid black;
      border-radius: 5px;
    `);
  });

  it('applies disabled styles when disabled is true', () => {
    const { container } = render(<Block disabled />);
    const blockElement = container.firstChild;

    expect(blockElement).toHaveStyleRule(`
      pointer-events: none;
      user-select: none;
    `);
  });
});
