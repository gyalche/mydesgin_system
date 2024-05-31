import React from 'react';
import expect from 'expect';
import { render, screen } from '@testing-library/react';

import Header from 'src/components/Atoms/Header';

test('Component is added to left section', () => {
  const Component = <div>test</div>;
  render(<Header leftContent={Component} />);
  const testSection = screen.getByTestId('leftSection');
  const newComponent = testSection.querySelector('div');
  expect(newComponent).toBeInTheDocument();
  expect(newComponent).toHaveTextContent('test');
});

test('Component is added to center section', () => {
  const Component = <div>test</div>;
  render(<Header centerContent={Component} />);
  const testSection = screen.getByTestId('centerSection');
  const newComponent = testSection.querySelector('div');
  expect(newComponent).toBeInTheDocument();
  expect(newComponent).toHaveTextContent('test');
});

test('Component is added to right section', () => {
  const Component = <div>test</div>;
  render(<Header rightContent={Component} />);
  const testSection = screen.getByTestId('rightSection');
  const newComponent = testSection.querySelector('div');
  expect(newComponent).toBeInTheDocument();
  expect(newComponent).toHaveTextContent('test');
});
