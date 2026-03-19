export default function Floor({ onClick }: { onClick?: (e: any) => void }) {
  return (
    <group>
      {/* Main floor — clickable to dismiss panels */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.51, 0]}
        receiveShadow
        onClick={onClick}
      >
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#1a1a22" roughness={0.9} />
      </mesh>

      {/* Subtle grid pattern on floor */}
      <gridHelper
        args={[40, 40, '#252530', '#1f1f28']}
        position={[0, -0.5, 0]}
      />
    </group>
  )
}
