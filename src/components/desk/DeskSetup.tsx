import { Box, Cylinder, Edges, Html, Outlines, Sphere, useTexture } from '@react-three/drei'
import { useThree, type ThreeEvent } from '@react-three/fiber'
import { createContext, useContext, useEffect, type ReactNode } from 'react'
import * as THREE from 'three'
import photoUrl from '../../assets/gurdeep-square.jpg'
import { DESK_OBJECTS, type DeskObject } from './objects'

// The desk is drawn like an axonometric sketch: flat paper tones, ink edges on
// creases and ink outlines around curved parts. The hovered object turns blue.
const INK = '#1c1b18'
const ACCENT = '#1f4ed8'
const ACCENT_FILL = '#dbe4fb'

const Active = createContext(false)

function Sketch({ fill, curved = false }: { fill: string; curved?: boolean }) {
  const active = useContext(Active)
  const line = active ? ACCENT : INK
  return (
    <>
      <meshLambertMaterial color={active ? ACCENT_FILL : fill} />
      <Edges threshold={28} color={line} lineWidth={1.2} />
      {curved && <Outlines thickness={1.3} color={line} />}
    </>
  )
}

type HoverProps = {
  hovered: DeskObject | null
  onHover: (object: DeskObject | null) => void
  onSelect: (object: DeskObject) => void
}

function Hotspot({
  id,
  hovered,
  onHover,
  onSelect,
  position,
  rotation,
  children,
}: HoverProps & {
  id: DeskObject
  position: [number, number, number]
  rotation?: [number, number, number]
  children: ReactNode
}) {
  return (
    <group
      position={position}
      rotation={rotation}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation()
        onHover(id)
      }}
      onPointerOut={() => onHover(null)}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation()
        onSelect(id)
      }}
    >
      <Active.Provider value={hovered === id}>{children}</Active.Provider>
    </group>
  )
}

export default function DeskSetup(props: HoverProps) {
  const { hovered } = props
  const invalidate = useThree((s) => s.invalidate)
  const photo = useTexture(photoUrl, (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace
  })

  // The canvas only draws on demand, and this subtree mounts after the texture
  // loads. Without a fresh frame the <Html> screen never gets positioned.
  useEffect(() => {
    invalidate(2)
  }, [invalidate])

  return (
    <group>
      {hovered && (
        <Html position={DESK_OBJECTS[hovered].anchor} center zIndexRange={[6, 0]} pointerEvents="none">
          <span className="desk-tag">→ {DESK_OBJECTS[hovered].label}</span>
        </Html>
      )}

      {/* ============ DESK ============ */}
      <Box args={[5, 0.15, 2.5]}>
        <Sketch fill="#e7dac3" />
      </Box>
      {[
        [-2.2, -1.0],
        [2.2, -1.0],
        [-2.2, 1.0],
        [2.2, 1.0],
      ].map(([x, z]) => (
        <Box key={`${x}${z}`} args={[0.12, 1.6, 0.12]} position={[x, -0.88, z]}>
          <Sketch fill="#cfcac0" />
        </Box>
      ))}
      <Box args={[4.2, 0.06, 0.06]} position={[0, -1.2, -1.0]}>
        <Sketch fill="#cfcac0" />
      </Box>

      {/* ============ MONITOR → Work ============ */}
      <Hotspot id="monitor" position={[0, 0.08, -0.6]} {...props}>
        <Cylinder args={[0.35, 0.4, 0.06, 32]} position={[0, 0.03, 0]}>
          <Sketch fill="#d9d5cc" curved />
        </Cylinder>
        <Box args={[0.08, 0.55, 0.08]} position={[0, 0.3, 0]}>
          <Sketch fill="#d9d5cc" />
        </Box>
        <Box args={[2.4, 1.5, 0.08]} position={[0, 0.82, 0]}>
          <Sketch fill="#3a3935" />
        </Box>
        <mesh position={[0, 0.82, 0.041]}>
          <planeGeometry args={[2.2, 1.3]} />
          <meshBasicMaterial color="#1f1e1b" />
        </mesh>
        {/* Terminal on screen, listing the projects in the Work section */}
        <Html transform position={[0, 0.82, 0.05]} scale={0.14} zIndexRange={[5, 0]} pointerEvents="none">
          <div className="desk-screen">
            <p>
              <span className="prompt">~/work $</span> ls
            </p>
            <p className="ls">{'tricity-rides     nearnex'}</p>
            <p className="ls">{'direct-stay       boardsync'}</p>
            <p className="ls">{'english-learning  isavelife'}</p>
            <p>
              <span className="prompt">~/work $</span> <span className="cursor" />
            </p>
          </div>
        </Html>
      </Hotspot>

      {/* ============ KEYBOARD + MOUSE ============ */}
      <group position={[0, 0.1, 0.2]}>
        <Box args={[1.4, 0.05, 0.5]}>
          <Sketch fill="#f3f0ea" />
        </Box>
        {[-0.15, -0.05, 0.05, 0.15].map((z) => (
          <Box key={z} args={[1.2, 0.015, 0.06]} position={[0, 0.032, z]}>
            <Sketch fill="#e2ded6" />
          </Box>
        ))}
      </group>
      <Box args={[0.18, 0.06, 0.3]} position={[1.2, 0.11, 0.3]}>
        <Sketch fill="#f3f0ea" />
      </Box>

      {/* ============ PHONE + LETTER → Contact ============ */}
      <Hotspot id="phone" position={[0.7, 0.08, 0.65]} {...props}>
        <Box args={[0.22, 0.02, 0.4]} position={[0, 0.01, 0]}>
          <Sketch fill="#3a3935" />
        </Box>
        <group position={[0.05, -0.005, 0.25]} rotation={[0, 0.15, 0]}>
          <Box args={[0.4, 0.01, 0.28]}>
            <Sketch fill="#fbfaf7" />
          </Box>
          <Cylinder args={[0.03, 0.03, 0.008, 24]} position={[0, 0.009, 0]}>
            <Sketch fill="#d9583b" curved />
          </Cylinder>
        </group>
      </Hotspot>

      {/* ============ BOOKS → Skills ============ */}
      <Hotspot id="books" position={[-1.6, 0.08, 0.15]} {...props}>
        <Box args={[0.5, 0.12, 0.7]} position={[0, 0.06, 0]}>
          <Sketch fill="#9fb3d8" />
        </Box>
        <Box args={[0.45, 0.1, 0.65]} position={[0.02, 0.17, 0]}>
          <Sketch fill="#e5c27c" />
        </Box>
        <Box args={[0.42, 0.08, 0.6]} position={[-0.02, 0.26, 0]}>
          <Sketch fill="#d98c79" />
        </Box>
      </Hotspot>

      {/* ============ COFFEE CUP → About ============ */}
      <Hotspot id="coffee" position={[1.8, 0.08, -0.4]} {...props}>
        <Cylinder args={[0.14, 0.12, 0.28, 32]} position={[0, 0.14, 0]}>
          <Sketch fill="#fbfaf7" curved />
        </Cylinder>
        <Cylinder args={[0.12, 0.12, 0.02, 32]} position={[0, 0.27, 0]}>
          <Sketch fill="#8a6a4f" curved />
        </Cylinder>
        <mesh position={[0.18, 0.16, 0]}>
          <torusGeometry args={[0.06, 0.015, 16, 24, Math.PI]} />
          <Sketch fill="#fbfaf7" curved />
        </mesh>
      </Hotspot>

      {/* ============ POLAROID PHOTO → About ============ */}
      <Hotspot id="polaroid" position={[-1.8, 0.08, -0.6]} rotation={[0, 0.3, 0]} {...props}>
        <Box args={[0.5, 0.6, 0.02]} position={[0, 0.3, 0]}>
          <Sketch fill="#fbfaf7" />
        </Box>
        <mesh position={[0, 0.36, 0.0115]}>
          <planeGeometry args={[0.42, 0.42]} />
          <meshBasicMaterial map={photo} />
        </mesh>
      </Hotspot>

      {/* ============ CALENDAR → Experience ============ */}
      <Hotspot id="calendar" position={[1.6, 0.08, -1.0]} rotation={[0, -0.3, 0]} {...props}>
        <Box args={[0.26, 0.22, 0.01]} position={[0, 0.1, 0]} rotation={[-0.2, 0, 0]}>
          <Sketch fill="#fbfaf7" />
        </Box>
        <Box args={[0.26, 0.22, 0.01]} position={[0, 0.1, -0.05]} rotation={[0.2, 0, 0]}>
          <Sketch fill="#cfcac0" />
        </Box>
        <Box args={[0.26, 0.04, 0.012]} position={[0, 0.19, 0.01]} rotation={[-0.2, 0, 0]}>
          <Sketch fill="#d9583b" />
        </Box>
      </Hotspot>

      {/* ============ PLANT ============ */}
      <group position={[-2, 0.08, 0.7]}>
        <Cylinder args={[0.18, 0.14, 0.25, 32]} position={[0, 0.12, 0]}>
          <Sketch fill="#d39b7a" curved />
        </Cylinder>
        <Sphere args={[0.12, 24, 16]} position={[0, 0.42, 0]}>
          <Sketch fill="#9cc2a2" curved />
        </Sphere>
        <Sphere args={[0.09, 24, 16]} position={[0.08, 0.53, 0.05]}>
          <Sketch fill="#9cc2a2" curved />
        </Sphere>
        <Sphere args={[0.07, 24, 16]} position={[-0.06, 0.5, -0.04]}>
          <Sketch fill="#9cc2a2" curved />
        </Sphere>
      </group>

      {/* ============ DESK LAMP ============ */}
      <group position={[-1.9, 0.08, -0.8]}>
        <Cylinder args={[0.15, 0.18, 0.04, 32]} position={[0, 0.02, 0]}>
          <Sketch fill="#d9d5cc" curved />
        </Cylinder>
        <Box args={[0.03, 0.8, 0.03]} position={[0, 0.42, 0]}>
          <Sketch fill="#d9d5cc" />
        </Box>
        <Cylinder args={[0.06, 0.2, 0.15, 32]} position={[0.1, 0.82, 0]} rotation={[0, 0, -0.3]}>
          <Sketch fill="#e5c27c" curved />
        </Cylinder>
      </group>

      {/* ============ COMPUTER UNDER THE DESK ============ */}
      <group position={[2, -1.03, -0.6]}>
        <Box args={[0.9, 1.3, 0.9]}>
          <Sketch fill="#3a3935" />
        </Box>
        {[0.45, 0.15, -0.15].map((y, i) => (
          <mesh key={y} position={[0.25, y, 0.451]}>
            <planeGeometry args={[0.08, 0.08]} />
            <meshBasicMaterial color={['#7fd394', '#9fb3d8', '#e5c27c'][i]} />
          </mesh>
        ))}
      </group>
    </group>
  )
}
