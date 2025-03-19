import ProgressTrack from 'components/Molecules/ProgressTracker';

export default {
  title: 'Design System/Molecules/ProgressTracker',
  component: ProgressTrack,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/7GhAI7t2dM3tVWpWMAVFXJ/Design-System?type=design&node-id=6044-14890&mode=design&t=g6nxjdQUCysTShhd-0',
    },
  },
  argTypes: {
    steps: {
      control: 'array',
      description: 'Array of step labels',
    },
    currentStep: {
      control: { type: 'select' },
      options: ['step-1', 'step-2', 'step-3', 'step-4', 0, 1, 2, 3],
      description: 'The current step, can be an index (0-based) or a step ID (e.g., "step-1").',
    },
  },
  args: {
    steps: [
      {
        id: 'step-1',
        label: 'Personal Info',
        inProgressLabel: 'In progress',
        completedLabel: 'Completed',
      },
      {
        id: 'step-2',
        label: 'Upload documentation',
        inProgressLabel: 'Selecting',
        completedLabel: 'Uploaded',
      },
      {
        id: 'step-3',
        label: 'Information check',
        inProgressLabel: 'Reviewing',
        completedLabel: 'Registered',
      },
      {
        id: 'step-4',
        label: 'Re-Check',
        inProgressLabel: 'checking',
        completedLabel: 'Checked',
      },
    ],
    currentStep: 'step-1',
  },
};

export function ProgressTracker(args) {
  return <ProgressTrack {...args} />;
}
