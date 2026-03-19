import { Suspense } from 'react'
import DeskSetup from './models/DeskSetup'
import Floor from './models/Floor'
import CameraRig from './CameraRig'
import ScrollWatcher from './ScrollCards'

export default function Scene({ onSectionChange, activeSection }: { onSectionChange: (section: number) => void, activeSection: number }) {
  return (
    <>
      <CameraRig />
      <ScrollWatcher onSectionChange={onSectionChange} />
      <group position={[0, -1.5, 0]}>
        <Floor />
        <Suspense fallback={null}>
          <DeskSetup activeSection={activeSection} />
        </Suspense>
      </group>
    </>
  )
}
