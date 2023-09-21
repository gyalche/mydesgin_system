import React from 'react';
import expect from 'expect';
import { render, screen } from '@testing-library/react';

import Selector from 'src/components/Molecules/Selector';

it('should render children', () => {
  const item = { label: 'Test', value: 1 };
  render(
    <Selector.Option
      key={item.value}
      item={item}
      index={0}
      highlightedIndex={0}
      getItemProps={() => {}}
    >
      {item.label}
    </Selector.Option>
  );
  const option = screen.getByText(item.label);

  expect(option).toBeInTheDocument();
});
