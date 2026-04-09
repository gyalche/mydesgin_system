interface ApiRow {
  defaultValue: string;
  description: string;
  prop: string;
  type: string;
}

export function ApiTable({ rows }: { rows: readonly ApiRow[] }) {
  return (
    <div className="api-table">
      <div className="api-table__head">
        <span>Prop</span>
        <span>Type</span>
        <span>Default</span>
        <span>Description</span>
      </div>
      {rows.map((row) => (
        <div className="api-table__row" key={row.prop}>
          <code>{row.prop}</code>
          <code>{row.type}</code>
          <code>{row.defaultValue}</code>
          <span>{row.description}</span>
        </div>
      ))}
    </div>
  );
}

