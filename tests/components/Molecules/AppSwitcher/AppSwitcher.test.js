import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AppSwitcher from 'src/components/Molecules/AppSwitcher';
import expect from 'expect';

const onClickMock = jest.fn();

const mockOwned = [
  { name: 'Reception', product_type: 'reception', isActive: true, link: 'https://receptionist.jp', onClick: onClickMock},
  { name: 'scheduling', product_type: 'scheduling', isActive: true, link: 'https://scheduling.receptionist.jp', onClick: onClickMock }
];
const mockOther =  [
  { name: 'Rooms', description: 'This is the Rooms App', product_type: 'meetingroom', isActive: false, link: 'https://rooms.receptionist.jp' },
  { name: 'Other', description: 'Other Reception Products', product_type: 'other', isActive: true, link: '/product' }
];
const ownedLabel = 'Owned Products';
const otherLabel = 'Other Products';

const Switcher = <AppSwitcher
  owned = {mockOwned}
  other = {mockOther}
  ownedLabel = {ownedLabel}
  otherLabel = {otherLabel}
/>;

describe('app switcher', () => {
  it('renders the grid icon correctly', () => {
    render(Switcher);
    const gridIconButton = screen.getByTestId('grid-icon-button');
  
    expect(gridIconButton).toBeInTheDocument();
  });
  
  it('opens the drop down menu when the button is clicked', () => {
    render(Switcher);
    const gridIconButton = screen.getByTestId('grid-icon-button');
    fireEvent.click(gridIconButton);

    const receptionLink = screen.getByText('Reception');
    expect(receptionLink).toBeInTheDocument();
  });

  it('triggers an event when an active link is clicked', () => {
    render(Switcher);

    const gridIconButton = screen.getByTestId('grid-icon-button');
    fireEvent.click(gridIconButton);

    const receptionLink = screen.getByText('Reception');
    fireEvent.click(receptionLink);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('menu changes style when width has value', () => {
    const width = '100px';
    render(<AppSwitcher
      owned={ mockOwned }
      other={ mockOther }
      ownedLabel={ ownedLabel }
      otherLabel={ otherLabel }
      width={width}
    />);

    const gridIconButton = screen.getByTestId('grid-icon-button');
    fireEvent.click(gridIconButton);

    const dropdown = screen.getByTestId('dropdown-container');
  
    expect(dropdown).toHaveStyleRule('width', width);
  });
});
