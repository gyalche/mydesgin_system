interface SectionProps {
  children: React.ReactNode;
  description?: string;
  title: string;
}

export function ContentSection({ children, description, title }: SectionProps) {
  return (
    <section className="panel content-section">
      <div className="content-section__header">
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

export function CodeExample({ code }: { code: string }) {
  return (
    <div className="code-block">
      <code>{code}</code>
    </div>
  );
}

