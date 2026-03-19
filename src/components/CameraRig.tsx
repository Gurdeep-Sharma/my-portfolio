import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'

/*
  Camera keyframes for each scroll section.
  position = where the camera is
  target = what the camera looks at
  zoom = orthographic zoom level
*/
const KEYFRAMES = [
  {
    // 0: Overview — full desk
    position: new THREE.Vector3(10, 10, 10),
    target: new THREE.Vector3(0, -0.5, 0),
    zoom: 110,
  },
  {
    // 1: Coffee Cup — About Me
    position: new THREE.Vector3(5, 4, 3),
    target: new THREE.Vector3(1.8, -1.2, -0.4),
    zoom: 200,
  },
  {
    // 2: Books — Skills
    position: new THREE.Vector3(-4, 5, 6),
    target: new THREE.Vector3(-1.6, -1.2, 0.15),
    zoom: 200,
  },
  {
    // 3: Monitor — Projects
    position: new THREE.Vector3(2, 5, 6),
    target: new THREE.Vector3(0, -0.6, -0.6),
    zoom: 170,
  },
  {
    // 4: Calendar — Experience
    position: new THREE.Vector3(3.5, 3, 0),
    target: new THREE.Vector3(1.6, -0.6, -1.0),
    zoom: 240,
  },
  {
    // 5: Phone + Letter — Contact
    position: new THREE.Vector3(4, 4, 6),
    target: new THREE.Vector3(0.7, -1.2, 0.65),
    zoom: 210,
  },
  {
    // 6: Server Rack — Infrastructure (downgraded view)
    position: new THREE.Vector3(2, 0.2, 0.8),
    target: new THREE.Vector3(2, -0.8, -0.6),
    zoom: 260,
  },
]

const tmpPos = new THREE.Vector3()
const tmpTarget = new THREE.Vector3()

export default function CameraRig() {
  const scroll = useScroll()
  const { camera } = useThree()
  const currentTarget = useRef(new THREE.Vector3(0, -0.5, 0))

  useFrame(() => {
    const offset = scroll.offset // 0..1
    const totalSections = KEYFRAMES.length - 1
    const rawIndex = offset * totalSections
    const i = Math.min(Math.floor(rawIndex), totalSections - 1)
    const t = rawIndex - i // fractional part within current section

    // Smoothstep for extra smoothness
    const smooth = t * t * (3 - 2 * t)

    const from = KEYFRAMES[i]
    const to = KEYFRAMES[i + 1]

    // Interpolate position
    tmpPos.lerpVectors(from.position, to.position, smooth)
    camera.position.lerp(tmpPos, 0.08)

    // Interpolate target (lookAt)
    tmpTarget.lerpVectors(from.target, to.target, smooth)
    currentTarget.current.lerp(tmpTarget, 0.08)
    camera.lookAt(currentTarget.current)

    // Interpolate zoom
    const targetZoom = THREE.MathUtils.lerp(from.zoom, to.zoom, smooth)
    ;(camera as THREE.OrthographicCamera).zoom = THREE.MathUtils.lerp(
      (camera as THREE.OrthographicCamera).zoom,
      targetZoom,
      0.08
    )
    camera.updateProjectionMatrix()
  })

  return null
}
