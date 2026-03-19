import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

/**
 * Pure scroll watcher — no rendering.
 * Reads scroll offset and calls onSectionChange to communicate the active section.
 */
export default function ScrollWatcher({ onSectionChange }: { onSectionChange: (section: number) => void }) {
  const scroll = useScroll()
  const prevSection = useRef(0)

  useFrame(() => {
    const offset = scroll.offset
    let section = 0
    if (offset > 0.85) section = 5
    else if (offset > 0.68) section = 4
    else if (offset > 0.51) section = 3
    else if (offset > 0.34) section = 2
    else if (offset > 0.17) section = 1

    if (section !== prevSection.current) {
      prevSection.current = section
      onSectionChange(section)
    }
  })

  return null
}
