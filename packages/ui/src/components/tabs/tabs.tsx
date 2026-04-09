import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from 'react';

export interface TabProps {
  children?: ReactNode;
  label?: ReactNode;
  tabKey?: string;
}

export function Tab(_props: TabProps) {
  return null;
}

export interface TabsProps {
  appearance?: 'primary' | 'secondary';
  children?: ReactNode;
  defaultTab?: string;
  gap?: string;
  mb?: string;
  ml?: string;
  mr?: string;
  mt?: string;
  onClick?: (tabKey: string) => void;
}

type TabElement = ReactElement<TabProps>;

const primaryButtonStyle: CSSProperties = {
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: '4px 8px',
};

const secondaryButtonStyle: CSSProperties = {
  backgroundColor: 'var(--rds-color-neutral-0)',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  padding: '8px 12px',
};

function isTabElement(child: ReactNode): child is TabElement {
  return isValidElement(child) && child.type === Tab;
}

function TabsRoot({
  appearance = 'primary',
  children,
  defaultTab = '1',
  gap = '12px',
  mb = '0px',
  ml = '0px',
  mr = '0px',
  mt = '0px',
  onClick,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const tabsId = useId();
  const tabChildren = Children.toArray(children).filter(isTabElement);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  const activeChild = tabChildren.find(child => child.props.tabKey === activeTab);

  return (
    <div
      style={{
        marginLeft: ml,
        marginRight: mr,
        marginTop: mt,
      }}
    >
      <div
        aria-orientation="horizontal"
        role="tablist"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap,
          marginBottom: mb,
        }}
      >
        {tabChildren.map((child, index) => {
          const tabKey = child.props.tabKey ?? String(index + 1);
          const selected = activeTab === tabKey;
          const panelId = `${tabsId}-panel-${tabKey}`;
          const tabId = `${tabsId}-tab-${tabKey}`;

          return (
            <div
              key={tabKey}
              style={selected
                ? { borderBottom: '2px solid var(--rds-color-primary-1-normal)' }
                : { borderRadius: '40px' }}
            >
              <button
                aria-controls={panelId}
                aria-selected={selected}
                id={tabId}
                onClick={() => {
                  setActiveTab(tabKey);
                  onClick?.(tabKey);
                }}
                role="tab"
                style={{
                  ...(appearance === 'primary' ? primaryButtonStyle : secondaryButtonStyle),
                  color: selected ? 'var(--rds-color-primary-1-dark)' : 'inherit',
                }}
                type="button"
              >
                {child.props.label}
              </button>
            </div>
          );
        })}
      </div>

      {activeChild
        ? cloneElement(activeChild, {
            children: (
              <div
                aria-labelledby={`${tabsId}-tab-${activeTab}`}
                id={`${tabsId}-panel-${activeTab}`}
                role="tabpanel"
              >
                {activeChild.props.children}
              </div>
            ),
          }).props.children
        : null}
    </div>
  );
}

export interface TabsComponent extends React.FC<TabsProps> {
  Tab: typeof Tab;
}

export const Tabs = TabsRoot as TabsComponent;
Tabs.Tab = Tab;
