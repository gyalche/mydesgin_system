import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SegmentedControl from 'src/components/Atoms/SegmentedControl';

const testSegments = [
  { segmentKey: '1', label: 'Seg 1', onClick: jest.fn() },
  { segmentKey: '2', label: 'Seg 2', onClick: jest.fn(), disabled: true },
  { segmentKey: '3', label: 'Seg 3', onClick: jest.fn() }
];

describe('SegmentedControl component', () => {
  it('should render all segments correctly', () => {
    render(<SegmentedControl segments={testSegments} />);
    expect(screen.getByText('Seg 1')).toBeInTheDocument();
    expect(screen.getByText('Seg 2')).toBeInTheDocument();
    expect(screen.getByText('Seg 3')).toBeInTheDocument();
  });

  it('should call onClick and change active segment when clicking an enabled segment', () => {
    render(<SegmentedControl segments={testSegments} />);

    const segment3 = screen.getByText('Seg 3');
    fireEvent.click(segment3);

    expect(testSegments[2].onClick).toHaveBeenCalled();

    expect(segment3).toHaveStyle('background-color: var(--rds-color-neutral-0)');
  });

  it('should not trigger onClick when clicking a disabled segment', () => {
    render(<SegmentedControl segments={testSegments} />);

    const segment2 = screen.getByText('Seg 2');
    fireEvent.click(segment2);

    expect(testSegments[1].onClick).not.toHaveBeenCalled();

    expect(segment2).not.toHaveStyleRule(
      'background-color',
      'var(--rds-color-neutral-0)',
    );
  });

  it('should only allow one active segment at a time', () => {
    render(<SegmentedControl segments={testSegments} />);

    const segment1 = screen.getByText('Seg 1');
    const segment3 = screen.getByText('Seg 3');

    fireEvent.click(segment3);

    expect(segment3).toHaveStyle('background-color: var(--rds-color-neutral-0)');

    expect(segment1).not.toHaveStyleRule(
      'background-color',
      'var(--rds-color-neutral-0)',
    );
  });
});