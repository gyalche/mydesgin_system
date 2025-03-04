import React from 'react';
import { render } from '@testing-library/react';
import DefaultHeader from 'src/components/Molecules/Table/DefaultHeader';

describe('DefaultHeader', () => {
  const columns = [
    { label: 'Name', flex: '1' },
    { label: 'Age', flex: '1' },
    { label: 'Location', flex: '2' },
  ];

  it('renders without crashing', () => {
    const { getByText } = render(<DefaultHeader columns={columns} />);
    columns.forEach(column => {
      expect(getByText(column.label)).toBeInTheDocument();
    });
  });

  it('applies default color', () => {
    const { container } = render(<DefaultHeader columns={columns} />);
    expect(container.firstChild).toHaveStyle('color: var(--rds-color-neutral-10)');
  });
});
