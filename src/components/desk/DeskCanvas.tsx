import { ContactShadows } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState, type ReactNode, type RefObject } from 'react'
import * as THREE from 'three'
import DeskSetup from './DeskSetup'
import { DESK_OBJECTS, type DeskObject } from './objects'

// Isometric view of the whole desk. The target sits a little below the desk
// top so the legs and the floor shadow stay in frame.
const TARGET = new THREE.Vector3(0, -0.5, 0)
const ISO_OFFSET = new THREE.Vector3(10, 10, 10)
// Projected size of the desk in world units, plus room for hover labels.
const VIEW_WIDTH = 5.8
const VIEW_HEIGHT = 5.0

function FitCamera() {
  const get = useThree((s) => s.get)
  const width = useThree((s) => s.size.width)
  const height = useThree((s) => s.size.height)

  useEffect(() => {
    const camera = get().camera as THREE.OrthographicCamera
    camera.position.copy(TARGET).add(ISO_OFFSET)
    camera.lookAt(TARGET)
    camera.zoom = Math.min(width / VIEW_WIDTH, height / VIEW_HEIGHT)
    camera.updateProjectionMatrix()
  }, [get, width, height])

  return null
}

// Turns the desk a few degrees toward the pointer.
function Parallax({ enabled, pointerInside, children }: { enabled: boolean; pointerInside: RefObject<boolean>; children: ReactNode }) {
  const group = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    const active = enabled && pointerInside.current
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, active ? state.pointer.x * 0.12 : 0, 3, delta)
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, active ? -state.pointer.y * 0.03 : 0, 3, delta)
  })

  return <group ref={group}>{children}</group>
}

export default function DeskCanvas({ onSelect }: { onSelect: (section: string) => void }) {
  const wrapper = useRef<HTMLDivElement>(null)
  const pointerInside = useRef(false)
  const [hovered, setHovered] = useState<DeskObject | null>(null)
  const [inView, setInView] = useState(true)
  const [parallax] = useState(
    () =>
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  // Stop rendering once the hero is scrolled out of view.
  useEffect(() => {
    const el = wrapper.current
    if (!el || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={wrapper}
      className="desk"
      style={{ cursor: hovered ? 'pointer' : undefined }}
      onPointerEnter={() => {
        pointerInside.current = true
      }}
      onPointerLeave={() => {
        pointerInside.current = false
      }}
    >
      <Canvas
        orthographic
        shadows="percentage"
        dpr={[1, 2]}
        frameloop={inView ? 'always' : 'never'}
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [10, 9.5, 10], zoom: 90, near: 0.1, far: 100 }}
      >
        <FitCamera />
        <ambientLight intensity={0.6} color="#f3e3c8" />
        <directionalLight
          castShadow
          position={[6, 12, 8]}
          intensity={2}
          color="#fff3e0"
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0004}
        >
          <orthographicCamera attach="shadow-camera" args={[-6, 6, 6, -6, 0.1, 40]} />
        </directionalLight>
        <directionalLight position={[-5, 5, -5]} intensity={0.4} color="#a8c3ff" />

        <Parallax enabled={parallax} pointerInside={pointerInside}>
          <Suspense fallback={null}>
            <DeskSetup
              hovered={hovered}
              onHover={setHovered}
              onSelect={(object) => onSelect(DESK_OBJECTS[object].section)}
            />
            {/* Rendered once, after the desk has mounted, since nothing moves relative to it. */}
            <ContactShadows position={[0, -1.69, 0]} scale={11} blur={2.6} far={3.5} opacity={0.65} resolution={512} frames={1} />
          </Suspense>
        </Parallax>
      </Canvas>
    </div>
  )
}
