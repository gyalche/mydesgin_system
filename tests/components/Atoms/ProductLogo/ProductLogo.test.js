import React from 'react';
import expect from 'expect';
import { render } from '@testing-library/react';

import ProductLogo from 'src/components/Atoms/ProductLogo';

it('should render the Receptionist product logo', () => {
  const product = 'Receptionist';
  const { container } = render(<ProductLogo product={product} />);

  expect(container.querySelector('svg')).not.toBe(null);
});

it('should render the Meetingrooms product logo', () => {
  const product = 'Meetingrooms';
  const { container } = render(<ProductLogo product={product} />);

  expect(container.querySelector('svg')).not.toBe(null);
});

it('should render the Scheduling product logo', () => {
  const product = 'Scheduling';
  const { container } = render(<ProductLogo product={product} />);

  expect(container.querySelector('svg')).not.toBe(null);
});

it("should throw error if product doesn't exist", () => {
  const product = 'NotExistingProduct';

  expect(() => render(<ProductLogo product={product} />)).toThrowError();
});
