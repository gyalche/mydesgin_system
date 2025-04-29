import React from 'react';
import { render, screen } from '@testing-library/react';
import StackedAvatars from 'src/components/Molecules/StackAvatar/StackedAvatars';

const mockUsers = [
  { name: 'Alice', img: 'alice.jpg' },
  { name: 'Bob', img: 'bob.jpg' },
  { name: 'Charlie', img: 'charlie.jpg' },
];

jest.mock('components/Atoms', () => ({
  Avatar: ({ name }) => <div role="img" aria-label={`${name}`}>{name}</div>,
  Icon: () => <div role="img" aria-label="icon" />,
}));

describe('StackedAvatars Component', () => {
  it('renders without crashing', () => {
    render(<StackedAvatars users={mockUsers} max={3} />);
    expect(screen.getByRole('img', { name: /alice/i })).toBeInTheDocument();
  });

  it('renders up to the max number of avatars', () => {
    render(<StackedAvatars users={mockUsers} max={2} />);

    const avatars = screen.getAllByRole('img');
    expect(avatars.length).toBe(2);
    expect(avatars[0]).toHaveAccessibleName('Alice');
    expect(avatars[1]).toHaveAccessibleName('Bob');
  });

  it('renders correct avatars based on user data', () => {
    render(<StackedAvatars users={mockUsers} max={3} />);

    expect(screen.getByRole('img', { name: 'Alice' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Bob' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Charlie' })).toBeInTheDocument();
  });

  it('does not render more avatars than available users', () => {
    render(<StackedAvatars users={mockUsers.slice(0, 2)} max={5} />);

    const avatars = screen.getAllByRole('img');
    expect(avatars.length).toBe(2);
  });

  it('renders no avatars when users list is empty', () => {
    render(<StackedAvatars users={[]} max={3} />);

    const avatars = screen.queryAllByRole('img');
    expect(avatars.length).toBe(0);
  });
});
