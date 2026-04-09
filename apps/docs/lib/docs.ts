export interface NavItem {
  description?: string;
  href: string;
  label: string;
}

export interface NavGroup {
  items: readonly NavItem[];
  title: string;
}

export const topNavigation = [
  { href: '/getting-started', label: 'Docs' },
  { href: '/components', label: 'Components' },
  { href: '/design-tokens', label: 'Tokens' },
  { href: '/theming', label: 'Theming' },
  { href: '/templates', label: 'Templates' },
  { href: '/changelog', label: 'Changelog' },
] as const satisfies readonly NavItem[];

export const docsNavigationGroups = [
  {
    title: 'Start Here',
    items: [
      { href: '/', label: 'Overview', description: 'Platform overview and product positioning.' },
      { href: '/getting-started', label: 'Getting Started', description: 'Fast path from install to first render.' },
      { href: '/installation', label: 'Installation', description: 'Package install, styles, and consumer setup.' },
      { href: '/usage', label: 'Usage', description: 'Daily patterns, composition, and imports.' },
    ],
  },
  {
    title: 'Foundations',
    items: [
      { href: '/architecture', label: 'Architecture', description: 'Workspace structure and migration model.' },
      { href: '/design-tokens', label: 'Design Tokens', description: 'Color, type, spacing, motion, and semantic tokens.' },
      { href: '/theming', label: 'Theming', description: 'Theme provider, overrides, and dark mode strategy.' },
      { href: '/design', label: 'Design', description: 'Design kit alignment and design-system governance.' },
    ],
  },
  {
    title: 'Product',
    items: [
      { href: '/components', label: 'Components', description: 'Index of the library surface.' },
      { href: '/products', label: 'Products', description: 'Package, docs, templates, and future product line.' },
      { href: '/templates', label: 'Templates', description: 'Starter kits and app shells.' },
      { href: '/showcase', label: 'Showcase', description: 'Reference screens and example surfaces.' },
      { href: '/changelog', label: 'Changelog', description: 'Milestones and release direction.' },
    ],
  },
] as const satisfies readonly NavGroup[];

export const productPillars = [
  {
    title: 'Core UI',
    description: 'Typed React primitives and core components with consistent APIs, accessibility discipline, and theme-first styling.',
    href: '/components',
  },
  {
    title: 'Docs Platform',
    description: 'A product-style docs site with onboarding, examples, API references, and library guidance teams can actually adopt from.',
    href: '/getting-started',
  },
  {
    title: 'Token System',
    description: 'Semantic design tokens, light and dark themes, and a long-term contract for system-wide customization.',
    href: '/design-tokens',
  },
  {
    title: 'Templates',
    description: 'Reference surfaces and starter layouts that prove the system works in real product contexts beyond isolated stories.',
    href: '/templates',
  },
] as const;

export const templateCatalog = [
  {
    name: 'Operations Console',
    summary: 'Admin-grade shell with sidebar, topbar, data tables, activity feed, and dense information hierarchy.',
  },
  {
    name: 'Marketing System',
    summary: 'Editorial landing framework with premium hero, pricing modules, testimonials, and conversion-focused sections.',
  },
  {
    name: 'Workspace Settings',
    summary: 'Account and workspace management shell using forms, tabs, alerts, and status-heavy control surfaces.',
  },
] as const;

export const designResources = [
  {
    title: 'Token Dictionary',
    detail: 'Raw scales and semantic aliases shared across themes, docs, and component implementations.',
  },
  {
    title: 'Figma Foundations',
    detail: 'Typography, color, radius, shadows, and component anatomy mapped to the same language used in code.',
  },
  {
    title: 'Reference Screens',
    detail: 'High-quality product layouts used to verify consistency, density, and hierarchy across the system.',
  },
] as const;

export const showcaseExamples = [
  {
    title: 'Workspace analytics',
    detail: 'Data-dense dashboard surface with cards, tables, tabs, filters, and navigation shell components.',
  },
  {
    title: 'Onboarding journey',
    detail: 'Lighter guidance-heavy flow that demonstrates empty states, steppers, alerts, and forms.',
  },
  {
    title: 'Brand-led marketing page',
    detail: 'A high-polish public-facing expression powered by the same token contract and component language.',
  },
] as const;

export const componentRoadmap = [
  {
    title: 'Foundation',
    items: ['ThemeProvider', 'Typography', 'Label', 'Layout', 'Card', 'Divider'],
  },
  {
    title: 'Core inputs',
    items: ['Button', 'IconButton', 'Input', 'TextArea', 'Select', 'Checkbox', 'Radio', 'Switch'],
  },
  {
    title: 'Status & feedback',
    items: ['Badge', 'Alert', 'Spinner', 'FormField', 'Toast / Snackbar'],
  },
  {
    title: 'Navigation & overlay',
    items: ['Tabs', 'Accordion', 'Dialog', 'Drawer', 'Tooltip', 'Dropdown Menu'],
  },
] as const;

export const releaseMilestones = [
  {
    version: '0.4.x',
    summary: 'Stabilise the current publish target, emit declarations, and launch a serious docs shell.',
  },
  {
    version: '0.5.x',
    summary: 'Expand the TypeScript workspace with form, feedback, and navigation primitives backed by semantic tokens.',
  },
  {
    version: '0.6.x',
    summary: 'Add accessibility-heavy overlays, richer examples, and stronger template surfaces for adoption.',
  },
  {
    version: '1.0.0',
    summary: 'Publish the multi-package platform with migration notes, release automation, and mature documentation.',
  },
] as const;

export const componentCatalog = [
  {
    slug: 'button',
    name: 'Button',
    category: 'Actions',
    status: 'ready',
    description: 'Primary action surface with clean variant, tone, and size APIs.',
    installCommand: 'npm install hamro-design-system',
    importCommand: "import { Button } from 'hamro-design-system';",
    example: '<Button variant="solid" tone="brand">Create workspace</Button>',
    tags: ['variant', 'tone', 'asChild'],
  },
  {
    slug: 'badge',
    name: 'Badge',
    category: 'Data display',
    status: 'ready',
    description: 'Compact semantic marker for counts, state, and contextual labels.',
    installCommand: 'npm install hamro-design-system',
    importCommand: "import { Badge } from 'hamro-design-system';",
    example: '<Badge tone="success">Stable</Badge>',
    tags: ['status', 'semantic', 'compact'],
  },
  {
    slug: 'alert',
    name: 'Alert',
    category: 'Feedback',
    status: 'ready',
    description: 'Inline contextual messaging for info, success, warning, and danger states.',
    installCommand: 'npm install hamro-design-system',
    importCommand: "import { Alert } from 'hamro-design-system';",
    example: '<Alert tone="warning" heading="Heads up" />',
    tags: ['status', 'feedback', 'semantic'],
  },
  {
    slug: 'input',
    name: 'Input',
    category: 'Forms',
    status: 'ready',
    description: 'Text-entry foundation for forms, search, and settings surfaces.',
    installCommand: 'npm install hamro-design-system',
    importCommand: "import { Input } from 'hamro-design-system';",
    example: '<Input placeholder="Workspace name" />',
    tags: ['focus', 'validation', 'form'],
  },
  {
    slug: 'select',
    name: 'Select',
    category: 'Forms',
    status: 'ready',
    description: 'Native-select wrapper with token-driven styling and invalid state support.',
    installCommand: 'npm install hamro-design-system',
    importCommand: "import { Select } from 'hamro-design-system';",
    example: '<Select defaultValue="team">...</Select>',
    tags: ['forms', 'selection', 'native'],
  },
  {
    slug: 'form-field',
    name: 'FormField',
    category: 'Forms',
    status: 'ready',
    description: 'Shared label, helper text, and validation wrapper for predictable forms.',
    installCommand: 'npm install hamro-design-system',
    importCommand: "import { FormField } from 'hamro-design-system';",
    example: '<FormField label="Workspace">...</FormField>',
    tags: ['forms', 'helper text', 'errors'],
  },
  {
    slug: 'tabs',
    name: 'Tabs',
    category: 'Navigation',
    status: 'ready',
    description: 'Compound tab API for related content views with predictable navigation.',
    installCommand: 'npm install hamro-design-system',
    importCommand: "import { Tabs } from 'hamro-design-system';",
    example: '<Tabs defaultTab="overview">...</Tabs>',
    tags: ['navigation', 'compound', 'views'],
  },
  {
    slug: 'dialog',
    name: 'Dialog',
    category: 'Overlay',
    status: 'planned',
    description: 'Focus-managed modal surface planned for the accessibility-heavy layer.',
    installCommand: 'npm install hamro-design-system',
    importCommand: "import { Dialog } from 'hamro-design-system';",
    example: '<Dialog open={open}>...</Dialog>',
    tags: ['overlay', 'focus', 'planned'],
  },
  {
    slug: 'table',
    name: 'Table',
    category: 'Data display',
    status: 'planned',
    description: 'Composable data table patterns targeted at admin and enterprise workflows.',
    installCommand: 'npm install hamro-design-system',
    importCommand: "import { Table } from 'hamro-design-system';",
    example: '<Table data={rows} columns={columns} />',
    tags: ['data', 'density', 'planned'],
  },
] as const;

export const componentDocs = {
  button: {
    title: 'Button',
    description: 'Buttons communicate priority and intent. The API should stay small, consistent, and easy to scan at a glance.',
    previewCode: `<Button variant="solid" tone="brand">Create workspace</Button>\n<Button variant="soft" tone="neutral">Save draft</Button>\n<Button variant="outline" tone="danger">Archive</Button>`,
    anatomy: ['Container', 'Label', 'Optional icon slot', 'Focus-visible ring'],
    dos: [
      'Use variant and tone to communicate emphasis instead of one-off color props.',
      'Keep labels action-oriented and concise.',
      'Use full-width buttons only when the layout genuinely benefits from it.',
    ],
    donts: [
      'Do not create multiple unrelated prop systems for visual style.',
      'Do not remove focus-visible treatment.',
      'Do not overload one button with too many nested indicators.',
    ],
    accessibility: [
      'Prefer native button semantics by default.',
      'Keep focus treatment visible in every theme.',
      'Disabled and loading states should still communicate meaning clearly.',
    ],
    examples: [
      { title: 'Default usage', code: `import { Button } from 'hamro-design-system';\n\nexport function Example() {\n  return <Button>Create workspace</Button>;\n}` },
      { title: 'Variant and tone', code: `export function Example() {\n  return <Button variant="outline" tone="danger">Archive</Button>;\n}` },
    ],
    variants: ['solid', 'soft', 'outline', 'ghost'],
    sizes: ['sm', 'md', 'lg'],
    apiRows: [
      { prop: 'variant', type: `'solid' | 'soft' | 'outline' | 'ghost'`, defaultValue: `'solid'`, description: 'Controls the visual treatment.' },
      { prop: 'tone', type: `'brand' | 'neutral' | 'danger'`, defaultValue: `'brand'`, description: 'Controls semantic emphasis.' },
      { prop: 'size', type: `'sm' | 'md' | 'lg'`, defaultValue: `'md'`, description: 'Scales padding and type rhythm.' },
      { prop: 'fullWidth', type: 'boolean', defaultValue: 'false', description: 'Makes the button span its container width.' },
    ],
  },
  badge: {
    title: 'Badge',
    description: 'Badges provide compact semantic context for state, counts, and labels without becoming miniature buttons.',
    previewCode: `<Badge tone="success">Stable</Badge>\n<Badge tone="info">Beta</Badge>\n<Badge tone="danger" variant="solid">Blocked</Badge>`,
    anatomy: ['Pill container', 'Semantic color treatment', 'Short label'],
    dos: [
      'Keep badge copy short and noun-like.',
      'Use semantic tones consistently across the product.',
      'Prefer soft badges for dense surfaces and solid badges for emphasis.',
    ],
    donts: [
      'Do not use badges as full interactive controls without button semantics.',
      'Do not pack long sentences into badge labels.',
      'Do not invent random palette values outside semantic token groups.',
    ],
    accessibility: [
      'Badges should remain readable with sufficient contrast.',
      'If the badge represents live status, pair it with surrounding explanatory text.',
      'Do not rely on color alone when the status meaning is critical.',
    ],
    examples: [
      { title: 'Soft semantic status', code: `import { Badge } from 'hamro-design-system';\n\nexport function Example() {\n  return <Badge tone="success">Stable</Badge>;\n}` },
    ],
    variants: ['soft', 'solid'],
    sizes: ['sm'],
    apiRows: [
      { prop: 'tone', type: `'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info'`, defaultValue: `'neutral'`, description: 'Controls semantic color mapping.' },
      { prop: 'variant', type: `'soft' | 'solid'`, defaultValue: `'soft'`, description: 'Controls emphasis level.' },
    ],
  },
  alert: {
    title: 'Alert',
    description: 'Alerts surface important contextual messaging without interrupting user flow like a dialog would.',
    previewCode: `<Alert tone="warning" heading="Heads up" description="This workspace is visible to every operator." />`,
    anatomy: ['Container', 'Semantic tone', 'Heading', 'Supporting description'],
    dos: [
      'Use alerts for contextual messaging inside a page or workflow.',
      'Keep the heading brief and the body specific.',
      'Map alert tones to a consistent semantic system.',
    ],
    donts: [
      'Do not use alerts for every minor helper message.',
      'Do not make alert bodies unnecessarily verbose.',
      'Do not mix semantic meaning across warning, info, success, and danger.',
    ],
    accessibility: [
      'Use clear copy that communicates severity without relying only on color.',
      'Choose a suitable role or surrounding semantics for the urgency level.',
      'Preserve strong contrast in soft status surfaces.',
    ],
    examples: [
      { title: 'Inline alert', code: `import { Alert } from 'hamro-design-system';\n\nexport function Example() {\n  return <Alert tone="info" heading="Heads up" description="Changes will apply to every member." />;\n}` },
    ],
    variants: ['info', 'success', 'warning', 'danger'],
    sizes: ['md'],
    apiRows: [
      { prop: 'tone', type: `'info' | 'success' | 'warning' | 'danger'`, defaultValue: `'info'`, description: 'Controls semantic styling.' },
      { prop: 'heading', type: 'ReactNode', defaultValue: '—', description: 'Optional leading heading content.' },
      { prop: 'description', type: 'ReactNode', defaultValue: '—', description: 'Supporting message content.' },
    ],
  },
  input: {
    title: 'Input',
    description: 'Input is the text-entry foundation for forms, search surfaces, and settings panels. It should be calm by default and explicit when invalid.',
    previewCode: `<Input placeholder="Project name" />\n<Input value="Hamro Workspace" />\n<Input isInvalid aria-invalid="true" />`,
    anatomy: ['Field container', 'Value or placeholder', 'Focus ring', 'Optional validation state'],
    dos: [
      'Pair input fields with explicit labels in real forms.',
      'Make invalid state visible without relying only on color.',
      'Keep spacing and line-height comfortable across themes.',
    ],
    donts: [
      'Do not use placeholder text as the only label.',
      'Do not overload a single field with too many embedded controls.',
      'Do not remove keyboard focus clarity.',
    ],
    accessibility: [
      'Associate labels, helper text, and validation messages correctly.',
      'Expose invalid state to assistive technology when applicable.',
      'Keep disabled styling visibly distinct.',
    ],
    examples: [
      { title: 'Default usage', code: `import { Input } from 'hamro-design-system';\n\nexport function Example() {\n  return <Input placeholder="Project name" />;\n}` },
    ],
    variants: ['default'],
    sizes: ['sm', 'md'],
    apiRows: [
      { prop: 'compact', type: 'boolean', defaultValue: 'false', description: 'Uses a denser vertical rhythm.' },
      { prop: 'isInvalid', type: 'boolean', defaultValue: 'false', description: 'Applies invalid border styling.' },
      { prop: 'input', type: '{ name?: string; value?: string; onChange?: fn }', defaultValue: '—', description: 'Compatibility bridge for form-library field props.' },
      { prop: 'w', type: 'string', defaultValue: `'auto'`, description: 'Sets a custom width.' },
    ],
  },
  select: {
    title: 'Select',
    description: 'Select provides a token-aligned native choice field for early adoption while richer menu-driven controls mature later.',
    previewCode: `<Select defaultValue="team">\n  <option value="team">Team</option>\n  <option value="workspace">Workspace</option>\n</Select>`,
    anatomy: ['Native select field', 'Selected option', 'Focus ring', 'Invalid state'],
    dos: [
      'Use native select for straightforward choice lists.',
      'Keep option labels direct and scannable.',
      'Prefer a richer custom select only when interaction complexity truly requires it.',
    ],
    donts: [
      'Do not fake a select with non-semantic divs for simple use cases.',
      'Do not hide invalid state.',
    ],
    accessibility: [
      'Native select semantics provide strong baseline accessibility.',
      'Pair the control with an explicit label in forms.',
    ],
    examples: [
      { title: 'Native select', code: `import { Select } from 'hamro-design-system';\n\nexport function Example() {\n  return <Select defaultValue="team"><option value="team">Team</option></Select>;\n}` },
    ],
    variants: ['default'],
    sizes: ['md'],
    apiRows: [
      { prop: 'isInvalid', type: 'boolean', defaultValue: 'false', description: 'Applies invalid border styling.' },
      { prop: 'w', type: 'string', defaultValue: `'auto'`, description: 'Sets the select width.' },
    ],
  },
  tabs: {
    title: 'Tabs',
    description: 'Tabs separate related content into predictable sibling views while preserving context and keyboard affordances.',
    previewCode: `<Tabs defaultTab="overview">\n  <Tabs.Tab tabKey="overview" label="Overview">...</Tabs.Tab>\n</Tabs>`,
    anatomy: ['Tab list', 'Trigger buttons', 'Active indicator', 'Associated panel'],
    dos: [
      'Use tabs for sibling views within the same information context.',
      'Keep tab labels short and scannable.',
      'Preserve obvious active-state visibility.',
    ],
    donts: [
      'Do not use tabs for unrelated actions.',
      'Do not create deeply nested tab stacks without strong hierarchy.',
    ],
    accessibility: [
      'Triggers should remain keyboard reachable and clearly associated with their panel.',
      'Active-state visibility should remain obvious across themes.',
    ],
    examples: [
      { title: 'Compound tabs', code: `import { Tabs } from 'hamro-design-system';\n\nexport function Example() {\n  return <Tabs defaultTab="overview">...</Tabs>;\n}` },
    ],
    variants: ['primary', 'secondary'],
    sizes: ['md'],
    apiRows: [
      { prop: 'defaultTab', type: 'string', defaultValue: `'1'`, description: 'Initial active tab key.' },
      { prop: 'appearance', type: `'primary' | 'secondary'`, defaultValue: `'primary'`, description: 'Controls tab trigger styling.' },
      { prop: 'onClick', type: '(tabKey: string) => void', defaultValue: '—', description: 'Called when the active tab changes.' },
    ],
  },
  'form-field': {
    title: 'FormField',
    description: 'FormField standardises labels, helper text, and validation messages so forms feel like one system instead of many one-off layouts.',
    previewCode: `<FormField label="Workspace" helperText="Visible to the whole team">\n  <Input placeholder="Workspace name" />\n</FormField>`,
    anatomy: ['Label', 'Field control', 'Helper or validation text', 'Shared vertical spacing'],
    dos: [
      'Use FormField as the default wrapper around primary form controls.',
      'Keep helper text concise and specific.',
      'Surface validation copy close to the field.',
    ],
    donts: [
      'Do not rebuild label and message spacing from scratch on every screen.',
      'Do not hide validation too far away from the control.',
    ],
    accessibility: [
      'Associate the field with its label and supporting text.',
      'Use clear validation copy that can be announced by assistive technology.',
    ],
    examples: [
      { title: 'Basic field', code: `import { FormField, Input } from 'hamro-design-system';\n\nexport function Example() {\n  return <FormField label="Workspace"><Input /></FormField>;\n}` },
    ],
    variants: ['default', 'invalid'],
    sizes: ['md'],
    apiRows: [
      { prop: 'label', type: 'ReactNode', defaultValue: '—', description: 'Primary field label.' },
      { prop: 'helperText', type: 'ReactNode', defaultValue: '—', description: 'Supplementary field guidance.' },
      { prop: 'validationText', type: 'ReactNode', defaultValue: '—', description: 'Validation message content.' },
      { prop: 'invalid', type: 'boolean', defaultValue: 'false', description: 'Switches helper styling into validation mode.' },
    ],
  },
  dialog: {
    title: 'Dialog',
    description: 'Dialog is intentionally planned rather than rushed. Overlay primitives need robust focus management and escape handling before they ship.',
    previewCode: `<Dialog open={open} onOpenChange={setOpen}>...</Dialog>`,
    anatomy: ['Overlay', 'Surface', 'Title', 'Body', 'Actions'],
    dos: ['Use for focused decisions and interruptive flows.', 'Provide a clear dismiss path.'],
    donts: ['Do not ship a modal without strong accessibility behavior.', 'Do not use dialogs as a shortcut for full pages.'],
    accessibility: ['Focus must move into the dialog and return on close.', 'Escape handling and aria relationships are non-negotiable.'],
    examples: [{ title: 'Planned API direction', code: `export function Example() {\n  return <Dialog open={open}>...</Dialog>;\n}` }],
    variants: ['default', 'danger'],
    sizes: ['sm', 'md', 'lg'],
    apiRows: [
      { prop: 'open', type: 'boolean', defaultValue: '—', description: 'Controlled open state.' },
      { prop: 'onOpenChange', type: '(open: boolean) => void', defaultValue: '—', description: 'State change handler.' },
    ],
  },
  table: {
    title: 'Table',
    description: 'Table is also still in the planned layer. Dense data display should be built deliberately around composition and accessibility.',
    previewCode: `<Table columns={columns} data={rows} />`,
    anatomy: ['Header row', 'Body rows', 'Cells', 'Optional pagination region'],
    dos: ['Use tables for structured scanning and comparison.', 'Keep header labels brief and explicit.'],
    donts: ['Do not force dense data into decorative cards.', 'Do not hide critical status only in color.'],
    accessibility: ['Headers should stay associated with cells.', 'Interactive row content should remain individually reachable.'],
    examples: [{ title: 'Planned API direction', code: `export function Example() {\n  return <Table columns={columns} data={rows} />;\n}` }],
    variants: ['default', 'compact'],
    sizes: ['md'],
    apiRows: [
      { prop: 'columns', type: 'Column[]', defaultValue: '—', description: 'Column definitions and cell renderers.' },
      { prop: 'data', type: 'Row[]', defaultValue: '—', description: 'Table row data.' },
    ],
  },
} as const;
