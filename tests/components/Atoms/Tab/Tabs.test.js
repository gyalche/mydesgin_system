import React from 'react';
import expect from 'expect';
import { render, fireEvent, screen } from '@testing-library/react';
import Tabs from 'src/components/Atoms/Tabs';

describe('Tabs component', () => {
  it('should render Tab components correctly', () => {
    render(
      <Tabs defaultTab="tab1">
        <Tabs.Tab tabKey="tab1" label="Tab 1">
          <div>This is Tab 1 content.</div>
        </Tabs.Tab>
        <Tabs.Tab tabKey="tab2" label="Tab 2">
          <div>This is Tab 2 content.</div>
        </Tabs.Tab>
      </Tabs>
    );

    const tab1Label = screen.getByText('Tab 1');
    const tab2Label = screen.getByText('Tab 2');
    expect(tab1Label).toBeInTheDocument();
    expect(tab2Label).toBeInTheDocument();
  });

  it('should switch tabs properly when clicked', () => {
    render(
      <Tabs defaultTab="tab1">
        <Tabs.Tab tabKey="tab1" label="Tab 1">
          <div>This is Tab 1 content.</div>
        </Tabs.Tab>
        <Tabs.Tab tabKey="tab2" label="Tab 2">
          <div>This is Tab 2 content.</div>
        </Tabs.Tab>
      </Tabs>
    );
    const tab2 = screen.getByText('Tab 2');

    fireEvent.click(tab2);
    const tab2Content = screen.getByText('This is Tab 2 content.');

    expect(tab2Content).toBeInTheDocument();
    expect(screen.queryByText('This is Tab 1 content.')).not.toBeInTheDocument();
  });

  it('should not render components that are not Tab inside Tabs and doesnt have a tabkey', () => {
    const consoleErrorSpy = jest
      .spyOn(global.console, 'error')
      .mockImplementation(jest.fn());

    render(
      <Tabs defaultTab="tab1">
        <Tabs.Tab tabKey="tab1" label="Tab 1">
          <div>This is Tab 1 content.</div>
        </Tabs.Tab>
        <Tabs.Tab tabKey="tab2" label="Tab 2">
          <div>This is Tab 2 content.</div>
        </Tabs.Tab>
        <div tabKey="tab3" label="Tab 3">
          Fake
        </div>
      </Tabs>
    );

    expect(screen.queryByText('Fake')).not.toBeInTheDocument();
    consoleErrorSpy.mockRestore();
  });
});
