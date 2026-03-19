import { ScrollControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useCallback, useState } from 'react'
import HeroOverlay from './components/HeroOverlay'
import InfoCards from './components/InfoCards'
import Scene from './components/Scene'

function App() {
  const [activeSection, setActiveSection] = useState(0)

  const handleScrollSection = useCallback((section: number) => {
    setActiveSection(section)
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {/* 2D Hero Overlay — fades when scrolled past overview */}
      <HeroOverlay faded={activeSection > 0} />

      {/* Info cards — rendered as regular DOM, positioned with CSS */}
      <InfoCards activeSection={activeSection} />

      <Canvas
        shadows
        orthographic
        camera={{
          position: [10, 10, 10],
          zoom: 110,
          near: 0.1,
          far: 1000,
        }}
        style={{ background: '#0f0f13' }}
      >
        <ambientLight intensity={0.6} color="#e8dcc8" />
        <directionalLight
          castShadow
          position={[6, 12, 8]}
          intensity={2}
          color="#fff5e6"
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0001}
        >
          <orthographicCamera attach="shadow-camera" args={[-12, 12, 12, -12]} />
        </directionalLight>
        <directionalLight position={[-5, 5, -5]} intensity={0.4} color="#a0c4ff" />
        <pointLight position={[0, -2, 4]} intensity={0.3} color="#ffb86c" />
        <ScrollControls pages={6} damping={0.25}>
          <Scene onSectionChange={handleScrollSection} activeSection={activeSection} />
        </ScrollControls>
      </Canvas>
    </div>
  )
}

export default App
