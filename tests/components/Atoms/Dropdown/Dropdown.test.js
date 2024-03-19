import React from 'react';
import expect from 'expect';
import { render, screen } from '@testing-library/react';

import Dropdown from 'src/components/Atoms/Dropdown';

it('should change dropdown style when w has value', () => {
  const width = '300px';
  render(<Dropdown w={width}>test</Dropdown>);
  const dropdown = screen.getByTestId('dropdown');

  expect(dropdown).toHaveStyleRule('width', width);
});

it('should change dropdown style when h has value', () => {
  const height = '500px';
  render(<Dropdown h={height}>test</Dropdown>);
  const dropdown = screen.getByTestId('dropdown');

  expect(dropdown).toHaveStyleRule('height', height);
});

it('should be hidden if isOpen value is false', () => {
  render(<Dropdown isOpen={false}>test</Dropdown>);
  const dropdown = screen.getByTestId('dropdown');

  expect(dropdown).toHaveStyleRule('visibility', 'hidden');
});

it('should not render children if isOpen value is false', () => {
  render(<Dropdown isOpen={false}>children test</Dropdown>);
  const dropdown = screen.getByTestId('dropdown');

  expect(dropdown.children.length).toBe(0);
});

it('should have height when scroll value is true', () => {
  const height = '200px';
  render(
    <Dropdown h={height} scroll>
      test
    </Dropdown>
  );
  const dropdown = screen.getByTestId('dropdown');

  expect(dropdown).toHaveStyleRule('height', height);
});

it('should have min-height when scroll value is false', () => {
  const height = '200px';
  render(
    <Dropdown h={height} scroll={false}>
      test
    </Dropdown>
  );
  const dropdown = screen.getByTestId('dropdown');

  expect(dropdown).toHaveStyleRule('min-height', height);
});

it('button changes style when mt has value', () => {
  const margin = '100px';
  render(<Dropdown mt={margin}>test</Dropdown>);
  const dropdown = screen.getByTestId('dropdown');

  expect(dropdown).toHaveStyleRule('margin-top', margin);
});

it('button changes style when mr has value', () => {
  const margin = '100px';
  render(<Dropdown mr={margin}>test</Dropdown>);
  const dropdown = screen.getByTestId('dropdown');

  expect(dropdown).toHaveStyleRule('margin-right', margin);
});

it('button changes style when mb has value', () => {
  const margin = '100px';
  render(<Dropdown mb={margin}>test</Dropdown>);
  const dropdown = screen.getByTestId('dropdown');

  expect(dropdown).toHaveStyleRule('margin-bottom', margin);
});

it('button changes style when ml has value', () => {
  const margin = '100px';
  render(<Dropdown ml={margin}>test</Dropdown>);
  const dropdown = screen.getByTestId('dropdown');

  expect(dropdown).toHaveStyleRule('margin-left', margin);
});
