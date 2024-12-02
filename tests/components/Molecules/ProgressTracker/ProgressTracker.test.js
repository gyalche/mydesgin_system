import React from 'react';
import expect from 'expect';
import { render, screen, waitFor } from '@testing-library/react';
import ProgressTracker from 'src/components/Molecules/ProgressTracker';

describe('ProgressTracker Component', () => {
  const stepsMock = [
    { id: '1', label: 'Step 1', inProgressLabel: 'In Progress 1', completedLabel: 'Completed 1' },
    { id: '2', label: 'Step 2', inProgressLabel: 'In Progress 2', completedLabel: 'Completed 2' },
    { id: '3', label: 'Step 3', inProgressLabel: 'In Progress 3', completedLabel: 'Completed 3' }
  ];

  it('renders the correct number of steps', async() => {
    render(<ProgressTracker steps={stepsMock} currentStep={1} />);
    const steps = screen.getAllByText(/Step/i);
    waitFor(()=>{
      expect(steps.length).toBe(3);
    });
  });

  it('applies the correct label for the current step', () => {
    render(<ProgressTracker steps={stepsMock} currentStep={1} />);
    const inProgressLabel = screen.getByText('In Progress 2');
    expect(inProgressLabel).toBeInTheDocument();
  });

  it('renders the completed label for completed steps', () => {
    render(<ProgressTracker steps={stepsMock} currentStep={1} />);
    const completedLabel = screen.getByText('Completed 1');
    expect(completedLabel).toBeInTheDocument();
  });

  it('renders the default label for upcoming steps', () => {
    render(<ProgressTracker steps={stepsMock} currentStep={1} />);
    const upcomingLabel = screen.getByText('Step 3');
    expect(upcomingLabel).toBeInTheDocument();
  });

  it('applies the active class to the current and completed steps', () => {
    render(<ProgressTracker steps={stepsMock} currentStep={1} />);
    const activeSteps = screen.getAllByText(/Step|Completed/i).filter(
      (step) => step.parentElement.firstChild.classList.contains('active')
    );
    waitFor(() => {
      expect(activeSteps.length).toBe(2);
    });
  });

  it('applies the correct style to the connector line', async () => {
    render(<ProgressTracker steps={stepsMock} currentStep={1} />);
    const connectorLines = screen.findAllByTestId('connector-line');
    
    waitFor(() => {
      expect(connectorLines[0]).toHaveStyleRule('background-color: var(--rds-color-primary-1-normal)');
      expect(connectorLines[1]).toHaveStyleRule('background-color: var(--rds-color-neutral-2)');
    });
  });

  it('adjusts the gap between steps based on the prop', () => {
    const { container } = render(<ProgressTracker steps={stepsMock} currentStep={1} gap={50} />);
    const stepContainers = container.querySelectorAll('.step-label-container');
    stepContainers.forEach((container, index) => {
      if (index < stepContainers.length - 1) {
        expect(container).toHaveStyleRule('margin-right: 50px');
      }
    });
  });
});
