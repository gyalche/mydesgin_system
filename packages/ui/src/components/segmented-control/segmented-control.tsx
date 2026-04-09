import { useEffect, useState, type ReactNode } from 'react';

export interface SegmentItem {
  disabled?: boolean;
  label: ReactNode;
  onClick?: (segmentKey: string) => void;
  segmentKey: string;
}

export interface SegmentedControlProps {
  defaultSegment: string;
  mb?: string;
  ml?: string;
  mr?: string;
  mt?: string;
  segments: SegmentItem[];
}

export function SegmentedControl({
  defaultSegment,
  mb = '0',
  ml = '0',
  mr = '0',
  mt = '0',
  segments,
}: SegmentedControlProps) {
  const [activeSegment, setActiveSegment] = useState(defaultSegment);

  useEffect(() => {
    setActiveSegment(defaultSegment);
  }, [defaultSegment]);

  return (
    <div
      style={{
        backgroundColor: 'var(--rds-color-neutral-3)',
        borderRadius: '40px',
        display: 'inline-flex',
        gap: '4px',
        justifyContent: 'center',
        marginBottom: mb,
        marginLeft: ml,
        marginRight: mr,
        marginTop: mt,
      }}
    >
      {segments.map((segment, index) => {
        const active = activeSegment === segment.segmentKey;

        return (
          <button
            disabled={segment.disabled}
            key={segment.segmentKey}
            onClick={() => {
              segment.onClick?.(segment.segmentKey);
              setActiveSegment(segment.segmentKey);
            }}
            style={{
              alignItems: 'center',
              backgroundColor: active ? 'var(--rds-color-neutral-0)' : 'transparent',
              border: 'none',
              borderRadius:
                index === 0
                  ? '40px 0 0 40px'
                  : index === segments.length - 1
                    ? '0 40px 40px 0'
                    : undefined,
              color: segment.disabled
                ? 'var(--rds-color-neutral-4)'
                : active
                  ? 'var(--rds-color-primary-1-dark)'
                  : 'inherit',
              cursor: segment.disabled ? 'not-allowed' : 'pointer',
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '4px',
              marginLeft: index === 0 ? '4px' : undefined,
              marginRight: index === segments.length - 1 ? '4px' : undefined,
              marginTop: '4px',
              minWidth: index === 0 || index === segments.length - 1 ? '66px' : '70px',
              opacity: segment.disabled ? 0.72 : 1,
              padding: '8px 12px',
            }}
            type="button"
          >
            <span
              style={{
                fontSize: '14px',
                fontWeight: 700,
              }}
            >
              {segment.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
