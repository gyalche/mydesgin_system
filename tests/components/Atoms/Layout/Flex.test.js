import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Flex from 'src/components/Atoms/Layout/Flex';

describe('Flex Component', () => {
  it('renders with default styles', () => {
    const { container } = render(<Flex />);
    const flexElement = container.firstChild;

    expect(flexElement).toHaveStyleRule(`
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
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
      gap: 0;
      cursor: auto;
      border: none;
      border-radius: unset;
    `);
  });

  it('applies custom flex-direction, justify-content, and align-items', () => {
    const { container } = render(
      <Flex direction='column' justifyContent='center' alignItems='center' />
    );
    const flexElement = container.firstChild;

    expect(flexElement).toHaveStyleRule(`
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `);
  });

  it('applies custom width, height, margin, and padding', () => {
    const { container } = render(
      <Flex
        w='50%'
        h='200px'
        mt='10px'
        mr='15px'
        mb='20px'
        ml='25px'
        pt='10px'
        pr='15px'
        pb='20px'
        pl='25px'
      />
    );
    const flexElement = container.firstChild;

    expect(flexElement).toHaveStyleRule(`
      width: 50%;
      height: 200px;
      margin-top: 10px;
      margin-right: 15px;
      margin-bottom: 20px;
      margin-left: 25px;
      padding-top: 10px;
      padding-right: 15px;
      padding-bottom: 20px;
      padding-left: 25px;
    `);
  });

  it('applies custom gap, border, and border-radius', () => {
    const { container } = render(
      <Flex gap='10px' border='1px solid black' borderRadius='5px' />
    );
    const flexElement = container.firstChild;

    expect(flexElement).toHaveStyleRule(`
      gap: 10px;
      border: 1px solid black;
      border-radius: 5px;
    `);
  });

  it('applies disabled styles when disabled is true', () => {
    const { container } = render(<Flex disabled />);
    const flexElement = container.firstChild;

    expect(flexElement).toHaveStyleRule(`
      pointer-events: none;
      user-select: none;
    `);
  });
});
