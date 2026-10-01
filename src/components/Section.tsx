import type { ReactNode } from 'react'

// A document-style section: the label sits in the left margin, the content in
// the main column. On narrow screens the label simply stacks on top.
export default function Section({
  id,
  label,
  note,
  children,
}: {
  id: string
  label: string
  note?: ReactNode
  children: ReactNode
}) {
  return (
    <section id={id} className="doc-section" aria-labelledby={`${id}-title`}>
      <div className="container doc-grid">
        <header className="doc-label">
          <h2 id={`${id}-title`}>{label}</h2>
          {note && <p className="doc-note">{note}</p>}
        </header>
        <div className="doc-body">{children}</div>
      </div>
    </section>
  )
}
