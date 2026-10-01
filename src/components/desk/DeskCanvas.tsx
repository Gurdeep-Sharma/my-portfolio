import { ContactShadows } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react'
import * as THREE from 'three'
import DeskSetup from './DeskSetup'
import { DESK_OBJECTS, type DeskObject } from './objects'

// Isometric view of the whole desk. The target sits a little below the desk
// top so the legs and the floor shadow stay in frame.
const TARGET = new THREE.Vector3(0, -0.5, 0)
const ISO_OFFSET = new THREE.Vector3(10, 10, 10)
// Projected size of the desk in world units, plus room for the hover tags.
const VIEW_WIDTH = 5.9
const VIEW_HEIGHT = 5.0

function FitCamera() {
  const get = useThree((s) => s.get)
  const width = useThree((s) => s.size.width)
  const height = useThree((s) => s.size.height)

  useEffect(() => {
    const { camera, invalidate } = get()
    camera.position.copy(TARGET).add(ISO_OFFSET)
    camera.lookAt(TARGET)
    ;(camera as THREE.OrthographicCamera).zoom = Math.min(width / VIEW_WIDTH, height / VIEW_HEIGHT)
    camera.updateProjectionMatrix()
    invalidate()
  }, [get, width, height])

  return null
}

export default function DeskCanvas({ onSelect }: { onSelect: (section: string) => void }) {
  const [hovered, setHovered] = useState<DeskObject | null>(null)

  return (
    <div className="desk" style={{ cursor: hovered ? 'pointer' : undefined }}>
      {/* The drawing is static, so it only renders when something changes (resize or hover). */}
      <Canvas
        orthographic
        flat
        frameloop="demand"
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [10, 9.5, 10], zoom: 90, near: 0.1, far: 100 }}
      >
        <FitCamera />
        <ambientLight intensity={1.7} />
        <directionalLight position={[4, 10, 7]} intensity={1.3} />
        <Suspense fallback={null}>
          <DeskSetup
            hovered={hovered}
            onHover={setHovered}
            onSelect={(object) => onSelect(DESK_OBJECTS[object].section)}
          />
          <ContactShadows position={[0, -1.69, 0]} scale={11} blur={2.2} far={3.5} opacity={0.22} resolution={512} frames={1} color="#1c1b18" />
        </Suspense>
      </Canvas>
    </div>
  )
}
