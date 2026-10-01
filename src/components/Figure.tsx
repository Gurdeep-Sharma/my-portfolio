import type { ReactNode } from 'react'

export default function Figure({
  number,
  caption,
  className = '',
  children,
}: {
  number: number
  caption: ReactNode
  className?: string
  children: ReactNode
}) {
  return (
    <figure className={`fig ${className}`}>
      <div className="fig-body">{children}</div>
      <figcaption>
        <span className="fig-no">Fig. {number}</span> {caption}
      </figcaption>
    </figure>
  )
}

// A vertical chain of boxes joined by arrows, used for the small system diagrams.
export function Flow({ nodes }: { nodes: string[] }) {
  return (
    <ol className="flow">
      {nodes.map((node) => (
        <li key={node}>{node}</li>
      ))}
    </ol>
  )
}
