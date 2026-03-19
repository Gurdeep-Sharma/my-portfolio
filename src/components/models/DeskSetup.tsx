import { Box, Cylinder, Html, RoundedBox, Sphere, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export default function DeskSetup({ activeSection = 0 }: { activeSection?: number }) {
  const scroll = useScroll()

  const scrollToSection = (index: number) => {
    if (!scroll) return
    const targetScroll = (index / 5) * (scroll.el.scrollHeight - scroll.el.clientHeight)
    scroll.el.scrollTo({ top: targetScroll, behavior: 'smooth' })
  }

  const over = (e: any) => { e.stopPropagation(); document.body.style.cursor = 'pointer' }
  const out = () => { document.body.style.cursor = 'auto' }

  const serverGlow1 = useRef<THREE.MeshStandardMaterial>(null)
  const serverGlow2 = useRef<THREE.MeshStandardMaterial>(null)
  const serverGlow3 = useRef<THREE.MeshStandardMaterial>(null)

  // Server rack pulsing lights (staggered)
  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (serverGlow1.current) serverGlow1.current.emissiveIntensity = 0.4 + Math.sin(t * 3) * 0.6
    if (serverGlow2.current) serverGlow2.current.emissiveIntensity = 0.4 + Math.sin(t * 3 + 1) * 0.6
    if (serverGlow3.current) serverGlow3.current.emissiveIntensity = 0.4 + Math.sin(t * 3 + 2) * 0.6
  })

  return (
    <group>
      {/* ============ DESK ============ */}
      <group position={[0, 0, 0]}>
        <RoundedBox args={[5, 0.15, 2.5]} radius={0.03} position={[0, 0, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#7a4a2a" roughness={0.6} metalness={0.05} />
        </RoundedBox>
        <Box args={[5, 0.04, 0.08]} position={[0, -0.08, 1.24]} castShadow>
          <meshStandardMaterial color="#5c371a" />
        </Box>
        <RoundedBox args={[0.12, 1.6, 0.12]} radius={0.02} position={[-2.2, -0.88, -1.0]} castShadow>
          <meshStandardMaterial color="#2a2a2e" metalness={0.6} roughness={0.3} />
        </RoundedBox>
        <RoundedBox args={[0.12, 1.6, 0.12]} radius={0.02} position={[2.2, -0.88, -1.0]} castShadow>
          <meshStandardMaterial color="#2a2a2e" metalness={0.6} roughness={0.3} />
        </RoundedBox>
        <RoundedBox args={[0.12, 1.6, 0.12]} radius={0.02} position={[-2.2, -0.88, 1.0]} castShadow>
          <meshStandardMaterial color="#2a2a2e" metalness={0.6} roughness={0.3} />
        </RoundedBox>
        <RoundedBox args={[0.12, 1.6, 0.12]} radius={0.02} position={[2.2, -0.88, 1.0]} castShadow>
          <meshStandardMaterial color="#2a2a2e" metalness={0.6} roughness={0.3} />
        </RoundedBox>
        <Box args={[4.2, 0.06, 0.06]} position={[0, -1.2, -1.0]} castShadow>
          <meshStandardMaterial color="#2a2a2e" metalness={0.5} roughness={0.3} />
        </Box>
      </group>

      {/* ============ MONITOR ============ */}
      <group position={[0, 0.08, -0.6]}>
        {activeSection === 3 && <pointLight position={[0, 0.5, 0.5]} intensity={2} color="#fff5e6" distance={3} />}
        <group onClick={(e) => { e.stopPropagation(); scrollToSection(3) }} onPointerOver={over} onPointerOut={out}>
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
          {/* Code editor on screen */}
          <Html transform position={[0, 0.82, 0.056]} scale={0.105} occlude={false}>
            <div style={{
              width: '300px', height: '170px', background: '#0d1117',
              borderRadius: '4px', overflow: 'hidden', fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px', lineHeight: '1.6', pointerEvents: 'none', userSelect: 'none',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                padding: '5px 8px', background: '#161b22', borderBottom: '1px solid #21262d',
              }}>
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#ff5f57' }} />
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#febc2e' }} />
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#28c840' }} />
                <span style={{ marginLeft: '8px', color: '#8b949e', fontSize: '8px' }}>App.tsx — portfolio</span>
              </div>
              <div style={{ padding: '6px 10px' }}>
                <div><span style={{ color: '#ff7b72' }}>import</span> <span style={{ color: '#79c0ff' }}>{'{ Canvas }'}</span> <span style={{ color: '#ff7b72' }}>from</span> <span style={{ color: '#a5d6ff' }}>'@react-three/fiber'</span></div>
                <div><span style={{ color: '#ff7b72' }}>import</span> <span style={{ color: '#79c0ff' }}>{'{ Scene }'}</span> <span style={{ color: '#ff7b72' }}>from</span> <span style={{ color: '#a5d6ff' }}>'./Scene'</span></div>
                <div style={{ color: '#8b949e' }}>&nbsp;</div>
                <div><span style={{ color: '#ff7b72' }}>const</span> <span style={{ color: '#d2a8ff' }}>App</span> <span style={{ color: '#ff7b72' }}>=</span> <span style={{ color: '#c9d1d9' }}>{'() =>'}</span> <span style={{ color: '#c9d1d9' }}>{'{'}</span></div>
                <div>&nbsp;&nbsp;<span style={{ color: '#ff7b72' }}>return</span> <span style={{ color: '#c9d1d9' }}>(</span></div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#7ee787' }}>{'<Canvas'}</span> <span style={{ color: '#79c0ff' }}>orthographic</span> <span style={{ color: '#79c0ff' }}>shadows</span><span style={{ color: '#7ee787' }}>{'>'}</span></div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#7ee787' }}>{'<Scene'}</span> <span style={{ color: '#7ee787' }}>{'/>'}</span></div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#7ee787' }}>{'</Canvas>'}</span></div>
                <div>&nbsp;&nbsp;<span style={{ color: '#c9d1d9' }}>)</span></div>
                <div><span style={{ color: '#c9d1d9' }}>{'}'}</span></div>
                <div style={{ display: 'inline-block', width: '6px', height: '12px', background: '#58a6ff', animation: 'blink 1s step-end infinite', verticalAlign: 'bottom' }} />
              </div>
            </div>
          </Html>
          <Sphere args={[0.02, 8, 8]} position={[0, 0.12, 0.05]}>
            <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={2} />
          </Sphere>
        </group>
      </group>

      {/* ============ KEYBOARD ============ */}
      <group position={[0, 0.09, 0.2]}>
        <RoundedBox args={[1.4, 0.05, 0.5]} radius={0.02} castShadow>
          <meshStandardMaterial color="#222228" metalness={0.3} roughness={0.6} />
        </RoundedBox>
        {[-0.15, -0.05, 0.05, 0.15].map((z, i) => (
          <Box key={i} args={[1.2, 0.015, 0.06]} position={[0, 0.035, z]}>
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

      {/* ============ PHONE + MAIL LETTER ============ */}
      <group position={[0.7, 0.08, 0.65]}>
        {activeSection === 5 && <pointLight position={[0, 0.5, 0]} intensity={1.5} color="#fff5e6" distance={2} />}
        <group onClick={(e) => { e.stopPropagation(); scrollToSection(5) }} onPointerOver={over} onPointerOut={out}>
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
      </group>

      {/* ============ BOOKS ============ */}
      <group position={[-1.6, 0.08, 0.15]}>
        {activeSection === 2 && <pointLight position={[0, 0.5, 0]} intensity={1.5} color="#fff5e6" distance={2} />}
        <group onClick={(e) => { e.stopPropagation(); scrollToSection(2) }} onPointerOver={over} onPointerOut={out}>
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
      </group>

      {/* ============ COFFEE CUP ============ */}
      <group position={[1.8, 0.08, -0.4]}>
        {activeSection === 1 && <pointLight position={[0, 0.5, 0]} intensity={1.5} color="#fff5e6" distance={2} />}
        <group onClick={(e) => { e.stopPropagation(); scrollToSection(1) }} onPointerOver={over} onPointerOut={out}>
          <Cylinder args={[0.14, 0.12, 0.28, 16]} position={[0, 0.14, 0]} castShadow>
            <meshStandardMaterial color="#eee8dd" roughness={0.8} />
          </Cylinder>
          <Cylinder args={[0.12, 0.12, 0.02, 16]} position={[0, 0.27, 0]}>
            <meshStandardMaterial color="#3e2a1a" roughness={0.3} />
          </Cylinder>
          <group position={[0.18, 0.16, 0]}>
            <mesh>
              <torusGeometry args={[0.06, 0.015, 8, 16, Math.PI]} />
              <meshStandardMaterial color="#eee8dd" roughness={0.8} />
            </mesh>
          </group>
          <Sphere args={[0.03, 8, 8]} position={[0, 0.36, 0]}>
            <meshStandardMaterial color="#ffffff" transparent opacity={0.15} />
          </Sphere>
          <Sphere args={[0.025, 8, 8]} position={[0.03, 0.42, 0.02]}>
            <meshStandardMaterial color="#ffffff" transparent opacity={0.1} />
          </Sphere>
        </group>
      </group>

      {/* ============ POLAROID PHOTO ============ */}
      <group position={[-1.8, 0.08, -0.6]} rotation={[0, 0.3, 0]}>
        {/* White Polaroid Border */}
        <Box args={[0.5, 0.6, 0.02]} position={[0, 0.3, 0]} castShadow>
          <meshStandardMaterial color="#f66e0dff" roughness={0.9} />
        </Box>
        {/* Your Professional Photo */}
        <Box args={[0.4, 0.38, 0.005]} position={[0, 0.36, 0.013]}>
          <meshStandardMaterial
            color={"#4a6fa5"}
            roughness={0.5}
          />
        </Box>
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

      {/* ============ CALENDAR ============ */}
      <group position={[1.6, 0.08, -1.0]} rotation={[0, -0.3, 0]}>
        {activeSection === 4 && <pointLight position={[0, 0.5, 0.5]} intensity={1.5} color="#fff5e6" distance={2} />}
        <group onClick={(e) => { e.stopPropagation(); scrollToSection(4) }} onPointerOver={over} onPointerOut={out}>
          {/* Front page */}
          <Box args={[0.26, 0.22, 0.01]} position={[0, 0.10, 0]} rotation={[-0.2, 0, 0]} castShadow>
            <meshStandardMaterial color="#f5f5f0" roughness={0.9} />
          </Box>
          {/* Back stand */}
          <Box args={[0.26, 0.22, 0.01]} position={[0, 0.10, -0.05]} rotation={[0.2, 0, 0]} castShadow>
            <meshStandardMaterial color="#2a2a2e" roughness={0.9} />
          </Box>
          {/* Red header stripe */}
          <Box args={[0.26, 0.04, 0.012]} position={[0, 0.19, 0.01]} rotation={[-0.2, 0, 0]}>
            <meshStandardMaterial color="#e74c3c" roughness={0.8} />
          </Box>
          {/* Ring binder */}
          <Cylinder args={[0.015, 0.015, 0.26]} position={[0, 0.21, -0.025]} rotation={[0, 0, Math.PI / 2]}>
            <meshStandardMaterial color="#7a7a80" metalness={0.8} />
          </Cylinder>
        </group>
      </group>

      {/* ============ SERVER RACK ============ */}
      <group position={[2, -0.7, -0.6]}>
        {activeSection === 6 && <pointLight position={[-0.5, 0.5, 0]} intensity={2} color="#fff5e6" distance={3} />}
        <group onClick={(e) => { e.stopPropagation(); scrollToSection(6) }} onPointerOver={over} onPointerOut={out}>
          <RoundedBox args={[0.9, 1.3, 0.9]} radius={0.03} castShadow receiveShadow>
            <meshStandardMaterial color="#111115" metalness={0.5} roughness={0.4} />
          </RoundedBox>
          <Box args={[0.7, 0.02, 0.02]} position={[0, 0.4, 0.46]}>
            <meshStandardMaterial color="#222" />
          </Box>
          <Box args={[0.7, 0.02, 0.02]} position={[0, 0.1, 0.46]}>
            <meshStandardMaterial color="#222" />
          </Box>
          <Box args={[0.7, 0.02, 0.02]} position={[0, -0.2, 0.46]}>
            <meshStandardMaterial color="#222" />
          </Box>
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
