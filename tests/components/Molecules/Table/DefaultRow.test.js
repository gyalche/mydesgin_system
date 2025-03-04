import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import DefaultRow from 'src/components/Molecules/Table/DefaultRow';

describe('DefaultRow', () => {
  const columns = [
    { label: 'Title', field: 'title', flex: '2' },
    { label: 'Visitor', field: 'visitor', flex: '1' },
    { label: 'Meeting Room', field: 'meetingRoom', flex: '1' },
  ];

  const data = {
    title: 'Checking in',
    visitor: 'Dawa sherpa',
    meetingRoom: 'Room A',
  };

  it('renders without crashing', () => {
    const { getByText } = render(<DefaultRow columns={columns} data={data} />);
    columns.forEach(column => {
      expect(getByText(data[column.field])).toBeInTheDocument();
    });
  });

  it('applies correct styles', () => {
    const { container } = render(<DefaultRow columns={columns} data={data} />);
    expect(container.firstChild).toHaveStyleRule('border-bottom', '1px solid var(--rds-color-neutral-3)');
    expect(container.firstChild).toHaveStyleRule('background-color', 'var(--rds-color-neutral-0)');
  });
});
