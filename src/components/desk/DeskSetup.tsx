import { Box, Cylinder, Html, RoundedBox, Sphere, useTexture } from '@react-three/drei'
import { useFrame, type ThreeEvent } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import photoUrl from '../../assets/gurdeep-square.jpg'
import { DESK_OBJECTS, type DeskObject } from './objects'

type Props = {
  hovered: DeskObject | null
  onHover: (object: DeskObject | null) => void
  onSelect: (object: DeskObject) => void
}

const lightTarget = new THREE.Vector3()

export default function DeskSetup({ hovered, onHover, onSelect }: Props) {
  const photo = useTexture(photoUrl, (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace
  })

  const serverGlow1 = useRef<THREE.MeshStandardMaterial>(null)
  const serverGlow2 = useRef<THREE.MeshStandardMaterial>(null)
  const serverGlow3 = useRef<THREE.MeshStandardMaterial>(null)
  const hoverLight = useRef<THREE.PointLight>(null)

  useFrame((state, delta) => {
    // Server rack pulsing lights (staggered)
    const t = state.clock.elapsedTime
    if (serverGlow1.current) serverGlow1.current.emissiveIntensity = 0.4 + Math.sin(t * 3) * 0.6
    if (serverGlow2.current) serverGlow2.current.emissiveIntensity = 0.4 + Math.sin(t * 3 + 1) * 0.6
    if (serverGlow3.current) serverGlow3.current.emissiveIntensity = 0.4 + Math.sin(t * 3 + 2) * 0.6

    // One highlight light glides to whatever is hovered. Toggling lights on and
    // off would force three.js to recompile every material.
    const light = hoverLight.current
    if (!light) return
    if (hovered) {
      light.position.lerp(lightTarget.set(...DESK_OBJECTS[hovered].light), 1 - Math.exp(-12 * delta))
    }
    light.intensity = THREE.MathUtils.damp(light.intensity, hovered ? 1.8 : 0, 10, delta)
  })

  const bind = (object: DeskObject) => ({
    onPointerOver: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation()
      onHover(object)
    },
    onPointerOut: () => onHover(null),
    onClick: (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation()
      onSelect(object)
    },
  })

  return (
    <group>
      <pointLight ref={hoverLight} intensity={0} color="#ffe2b8" distance={2.6} decay={2} />

      {hovered && (
        <Html position={DESK_OBJECTS[hovered].anchor} center zIndexRange={[6, 0]} pointerEvents="none">
          <span className="desk-label">
            {DESK_OBJECTS[hovered].label}
            <span aria-hidden="true">↓</span>
          </span>
        </Html>
      )}

      {/* ============ DESK ============ */}
      <group>
        <RoundedBox args={[5, 0.15, 2.5]} radius={0.03} castShadow receiveShadow>
          <meshStandardMaterial color="#7a4a2a" roughness={0.6} metalness={0.05} />
        </RoundedBox>
        <Box args={[5, 0.04, 0.08]} position={[0, -0.08, 1.24]} castShadow>
          <meshStandardMaterial color="#5c371a" />
        </Box>
        {[
          [-2.2, -1.0],
          [2.2, -1.0],
          [-2.2, 1.0],
          [2.2, 1.0],
        ].map(([x, z]) => (
          <RoundedBox key={`${x}${z}`} args={[0.12, 1.6, 0.12]} radius={0.02} position={[x, -0.88, z]} castShadow>
            <meshStandardMaterial color="#34343a" metalness={0.6} roughness={0.3} />
          </RoundedBox>
        ))}
        <Box args={[4.2, 0.06, 0.06]} position={[0, -1.2, -1.0]} castShadow>
          <meshStandardMaterial color="#34343a" metalness={0.5} roughness={0.3} />
        </Box>
      </group>

      {/* ============ MONITOR → Work ============ */}
      <group position={[0, 0.08, -0.6]} {...bind('monitor')}>
        <Cylinder args={[0.35, 0.4, 0.06, 32]} position={[0, 0.03, 0]} castShadow>
          <meshStandardMaterial color="#1a1a1e" metalness={0.7} roughness={0.2} />
        </Cylinder>
        <Box args={[0.08, 0.55, 0.08]} position={[0, 0.3, 0]} castShadow>
          <meshStandardMaterial color="#1a1a1e" metalness={0.7} roughness={0.2} />
        </Box>
        <RoundedBox args={[2.4, 1.5, 0.08]} radius={0.04} position={[0, 0.82, 0]} castShadow>
          <meshStandardMaterial color="#111115" metalness={0.3} roughness={0.5} />
        </RoundedBox>
        <Box args={[2.2, 1.3, 0.01]} position={[0, 0.82, 0.045]}>
          <meshStandardMaterial color="#0d1117" emissive="#0a0e14" emissiveIntensity={0.3} />
        </Box>
        {/* Terminal on screen, listing the projects in the Work section */}
        <Html transform position={[0, 0.82, 0.056]} scale={0.14} zIndexRange={[5, 0]} pointerEvents="none">
          <div className="desk-screen">
            <div className="desk-screen-bar">
              <i />
              <i />
              <i />
              <span>~/work</span>
            </div>
            <div className="desk-screen-body">
              <p>
                <span className="prompt">$</span> ls projects
              </p>
              <p className="ls">{'tricity-rides     nearnex'}</p>
              <p className="ls">{'direct-stay       boardsync'}</p>
              <p className="ls">{'english-learning  isavelife'}</p>
              <p>
                <span className="prompt">$</span> <span className="cursor" />
              </p>
            </div>
          </div>
        </Html>
        <Sphere args={[0.02, 8, 8]} position={[0, 0.12, 0.05]}>
          <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={2} />
        </Sphere>
      </group>

      {/* ============ KEYBOARD ============ */}
      <group position={[0, 0.09, 0.2]}>
        <RoundedBox args={[1.4, 0.05, 0.5]} radius={0.02} castShadow>
          <meshStandardMaterial color="#222228" metalness={0.3} roughness={0.6} />
        </RoundedBox>
        {[-0.15, -0.05, 0.05, 0.15].map((z) => (
          <Box key={z} args={[1.2, 0.015, 0.06]} position={[0, 0.035, z]}>
            <meshStandardMaterial color="#333" />
          </Box>
        ))}
      </group>

      {/* ============ MOUSE ============ */}
      <group position={[1.2, 0.09, 0.3]}>
        <RoundedBox args={[0.18, 0.06, 0.3]} radius={0.03} castShadow>
          <meshStandardMaterial color="#222228" metalness={0.3} roughness={0.5} />
        </RoundedBox>
      </group>

      {/* ============ PHONE + LETTER → Contact ============ */}
      <group position={[0.7, 0.08, 0.65]} {...bind('phone')}>
        <RoundedBox args={[0.22, 0.02, 0.4]} radius={0.03} position={[0, 0.01, 0]} castShadow>
          <meshStandardMaterial color="#111115" metalness={0.5} roughness={0.3} />
        </RoundedBox>
        <Box args={[0.18, 0.005, 0.34]} position={[0, 0.02, 0]}>
          <meshStandardMaterial color="#1a1a2e" emissive="#0a0e14" emissiveIntensity={0.2} />
        </Box>
        <Box args={[0.04, 0.005, 0.01]} position={[0, 0.021, 0.16]}>
          <meshStandardMaterial color="#333" />
        </Box>
        <group position={[0.05, -0.005, 0.25]} rotation={[0, 0.15, 0]}>
          <Box args={[0.4, 0.01, 0.28]} castShadow>
            <meshStandardMaterial color="#ede5d8" roughness={0.9} />
          </Box>
          <Box args={[0.36, 0.005, 0.12]} position={[0, 0.005, -0.06]} rotation={[0.15, 0, 0]}>
            <meshStandardMaterial color="#e0d6c8" roughness={0.9} />
          </Box>
          <Cylinder args={[0.03, 0.03, 0.008, 12]} position={[0, 0.008, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#e74c3c" roughness={0.5} />
          </Cylinder>
        </group>
      </group>

      {/* ============ BOOKS → Skills ============ */}
      <group position={[-1.6, 0.08, 0.15]} {...bind('books')}>
        <RoundedBox args={[0.5, 0.12, 0.7]} radius={0.015} position={[0, 0.06, 0]} castShadow>
          <meshStandardMaterial color="#4a90e2" roughness={0.7} />
        </RoundedBox>
        <RoundedBox args={[0.45, 0.1, 0.65]} radius={0.015} position={[0.02, 0.17, 0]} castShadow>
          <meshStandardMaterial color="#f5a623" roughness={0.7} />
        </RoundedBox>
        <RoundedBox args={[0.42, 0.08, 0.6]} radius={0.015} position={[-0.02, 0.26, 0]} castShadow>
          <meshStandardMaterial color="#e74c3c" roughness={0.7} />
        </RoundedBox>
      </group>

      {/* ============ COFFEE CUP → About ============ */}
      <group position={[1.8, 0.08, -0.4]} {...bind('coffee')}>
        <Cylinder args={[0.14, 0.12, 0.28, 16]} position={[0, 0.14, 0]} castShadow>
          <meshStandardMaterial color="#eee8dd" roughness={0.8} />
        </Cylinder>
        <Cylinder args={[0.12, 0.12, 0.02, 16]} position={[0, 0.27, 0]}>
          <meshStandardMaterial color="#3e2a1a" roughness={0.3} />
        </Cylinder>
        <mesh position={[0.18, 0.16, 0]}>
          <torusGeometry args={[0.06, 0.015, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#eee8dd" roughness={0.8} />
        </mesh>
        <Sphere args={[0.03, 8, 8]} position={[0, 0.36, 0]}>
          <meshStandardMaterial color="#ffffff" transparent opacity={0.15} />
        </Sphere>
        <Sphere args={[0.025, 8, 8]} position={[0.03, 0.42, 0.02]}>
          <meshStandardMaterial color="#ffffff" transparent opacity={0.1} />
        </Sphere>
      </group>

      {/* ============ POLAROID PHOTO → About ============ */}
      <group position={[-1.8, 0.08, -0.6]} rotation={[0, 0.3, 0]} {...bind('polaroid')}>
        <Box args={[0.5, 0.6, 0.02]} position={[0, 0.3, 0]} castShadow>
          <meshStandardMaterial color="#f4efe6" roughness={0.9} />
        </Box>
        <mesh position={[0, 0.36, 0.0115]}>
          <planeGeometry args={[0.42, 0.42]} />
          <meshStandardMaterial map={photo} roughness={0.6} />
        </mesh>
      </group>

      {/* ============ PLANT POT ============ */}
      <group position={[-2, 0.08, 0.7]}>
        <Cylinder args={[0.18, 0.14, 0.25, 8]} position={[0, 0.12, 0]} castShadow>
          <meshStandardMaterial color="#b87333" roughness={0.8} />
        </Cylinder>
        <Cylinder args={[0.16, 0.16, 0.04, 8]} position={[0, 0.26, 0]}>
          <meshStandardMaterial color="#4a3520" roughness={0.9} />
        </Cylinder>
        <Sphere args={[0.12, 8, 8]} position={[0, 0.45, 0]}>
          <meshStandardMaterial color="#2d8a4e" roughness={0.7} />
        </Sphere>
        <Sphere args={[0.09, 8, 8]} position={[0.08, 0.55, 0.05]}>
          <meshStandardMaterial color="#3ba55d" roughness={0.7} />
        </Sphere>
        <Sphere args={[0.07, 8, 8]} position={[-0.06, 0.52, -0.04]}>
          <meshStandardMaterial color="#248a3d" roughness={0.7} />
        </Sphere>
      </group>

      {/* ============ CALENDAR → Experience ============ */}
      <group position={[1.6, 0.08, -1.0]} rotation={[0, -0.3, 0]} {...bind('calendar')}>
        <Box args={[0.26, 0.22, 0.01]} position={[0, 0.1, 0]} rotation={[-0.2, 0, 0]} castShadow>
          <meshStandardMaterial color="#f5f5f0" roughness={0.9} />
        </Box>
        <Box args={[0.26, 0.22, 0.01]} position={[0, 0.1, -0.05]} rotation={[0.2, 0, 0]} castShadow>
          <meshStandardMaterial color="#2a2a2e" roughness={0.9} />
        </Box>
        <Box args={[0.26, 0.04, 0.012]} position={[0, 0.19, 0.01]} rotation={[-0.2, 0, 0]}>
          <meshStandardMaterial color="#e74c3c" roughness={0.8} />
        </Box>
        <Cylinder args={[0.015, 0.015, 0.26]} position={[0, 0.21, -0.025]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#7a7a80" metalness={0.8} />
        </Cylinder>
      </group>

      {/* ============ SERVER RACK (stands on the floor, under the desk) ============ */}
      <group position={[2, -1.03, -0.6]}>
        <RoundedBox args={[0.9, 1.3, 0.9]} radius={0.03} castShadow receiveShadow>
          <meshStandardMaterial color="#111115" metalness={0.5} roughness={0.4} />
        </RoundedBox>
        {[0.4, 0.1, -0.2].map((y) => (
          <Box key={y} args={[0.7, 0.02, 0.02]} position={[0, y, 0.46]}>
            <meshStandardMaterial color="#222" />
          </Box>
        ))}
        <Box args={[0.08, 0.08, 0.02]} position={[0.25, 0.45, 0.46]}>
          <meshStandardMaterial ref={serverGlow1} color="#00ffcc" emissive="#00ffcc" emissiveIntensity={1} />
        </Box>
        <Box args={[0.08, 0.08, 0.02]} position={[0.25, 0.15, 0.46]}>
          <meshStandardMaterial ref={serverGlow2} color="#58a6ff" emissive="#58a6ff" emissiveIntensity={1} />
        </Box>
        <Box args={[0.08, 0.08, 0.02]} position={[0.25, -0.15, 0.46]}>
          <meshStandardMaterial ref={serverGlow3} color="#f5a623" emissive="#f5a623" emissiveIntensity={1} />
        </Box>
        <pointLight position={[0, 0.2, 0.6]} intensity={0.3} color="#00ffcc" distance={2} />
      </group>

      {/* ============ DESK LAMP ============ */}
      <group position={[-1.9, 0.08, -0.8]}>
        <Cylinder args={[0.15, 0.18, 0.04, 16]} position={[0, 0.02, 0]} castShadow>
          <meshStandardMaterial color="#2a2a2e" metalness={0.7} roughness={0.2} />
        </Cylinder>
        <Box args={[0.03, 0.8, 0.03]} position={[0, 0.42, 0]} castShadow>
          <meshStandardMaterial color="#2a2a2e" metalness={0.7} roughness={0.2} />
        </Box>
        <Cylinder args={[0.06, 0.2, 0.15, 16]} position={[0.1, 0.82, 0]} rotation={[0, 0, -0.3]} castShadow>
          <meshStandardMaterial color="#f5a623" roughness={0.6} />
        </Cylinder>
        <pointLight position={[0.1, 0.7, 0]} intensity={0.6} color="#ffb86c" distance={3} decay={2} />
      </group>
    </group>
  )
}
