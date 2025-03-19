import ProgressTrackComponent from 'components/Molecules/ProgressTracker';

const meta = {
  title: 'UI Components/Progress Tracker',
  component: ProgressTrackComponent,
  tags: ['!dev'],
};

export default meta;

export const Progress = {
  argTypes: {
    steps: {
      control: 'array',
      description: `Array of steps to be displayed. The array format must follow the
      [documented](..?path=/docs/ui-components-progress-tracker--docs#step-format) attributes.`,
    },
    currentStep: {
      control: { type: 'select' },
      options: {
        'Start / Not a step': -1,
        'By ID (step-1)': 'step-1',
        'By ID (step-2)': 'step-2',
        'By ID (step-3)': 'step-3',
        'By ID (step-4)': 'step-4',
        'By index (0)': 0,
        'By index (1)': 1,
        'By index (2)': 2,
        'By index (3)': 3,
      },
      description: 'Current step in progress, can be an index (0-based) or a step ID (e.g., "step-1").',
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
    currentStep: -1,
  },
  render: ({ ...args }) => (
    <ProgressTrackComponent {...args} />
  ),
};
