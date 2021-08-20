import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useFBX, Html, useProgress, PerspectiveCamera, OrbitControls } from '@react-three/drei'

export default function Scene({ path }) {
  return (
    <Canvas className="border border-beige-dark" style={{ cursor: 'grab' }}>
      <PerspectiveCamera
        makeDefault
        position={[0, 1, 10]} zoom={4} />
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      <ambientLight />

      <group position={[0, -1, 0]}>
        <Suspense fallback={<Loader />}>
          <Model path={path} />
        </Suspense>
      </group>
    </Canvas>
  )
}

function Model({ path }) {
  const fbx = useFBX(path)
  return (
    <primitive
      key={path}
      object={fbx}
      dispose={null} />
  )
}

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}