import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from 'src/components/Molecules/Table/DefaultTable';

describe('Table', () => {
  const columns = [
    { label: 'Name', field: 'name', flex: '1' },
    { label: 'Age', field: 'age', flex: '1' },
    { label: 'Location', field: 'location', flex: '2' },
  ];

  const data = [
    { name: 'Tester', age: '25', location: 'Nepal' },
    { name: 'Bob', age: '30', location: 'London' },
  ];

  it('renders without crashing', () => {
    render(<Table data={data} columns={columns} />);
    data.forEach(row => {
      expect(screen.getByText(row.name)).toBeInTheDocument();
      expect(screen.getByText(row.age)).toBeInTheDocument();
      expect(screen.getByText(row.location)).toBeInTheDocument();
    });
  });

  it('renders the correct number of rows', () => {
    render(<Table data={data} columns={columns} />);
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(data.length + 1); // Includes header row
  });
});
