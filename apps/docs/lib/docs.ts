export const docsNavigation = [
  { href: '/', label: 'Overview' },
  { href: '/getting-started', label: 'Getting Started' },
  { href: '/architecture', label: 'Architecture' },
  { href: '/theming', label: 'Theming' },
  { href: '/components', label: 'Components' },
  { href: '/changelog', label: 'Changelog' },
] as const;

export const componentRoadmap = [
  {
    title: 'Foundation',
    items: ['ThemeProvider', 'tokens contract', 'Box', 'Text', 'Heading', 'Stack', 'Inline'],
  },
  {
    title: 'Core',
    items: ['Button', 'IconButton', 'Input', 'Textarea', 'Label', 'Badge', 'Card'],
  },
  {
    title: 'Interactive',
    items: ['Tabs', 'Dialog', 'Tooltip', 'Checkbox', 'RadioGroup', 'Select'],
  },
  {
    title: 'Composite',
    items: ['FormField', 'Table', 'Toast', 'Notification', 'Date picker patterns'],
  },
] as const;

export const releaseMilestones = [
  {
    version: '0.4.x',
    summary: 'Stabilise the current package for npm and deploy the public docs surface.',
  },
  {
    version: '0.5.x',
    summary: 'Move tokens and the first rewritten core components into the new workspace packages.',
  },
  {
    version: '0.6.x',
    summary: 'Add advanced accessibility-heavy components and consumer-app validation.',
  },
  {
    version: '1.0.0',
    summary: 'Publish the stable multi-package platform with migration notes and release automation.',
  },
] as const;

