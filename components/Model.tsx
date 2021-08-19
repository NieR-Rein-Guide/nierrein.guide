import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { useFBX, Html, useProgress, PerspectiveCamera, OrbitControls } from '@react-three/drei'

export default function Scene({ path }) {
  return (
    <Canvas style={{ cursor: 'grab' }}>
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 4]} />
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      <ambientLight />
      <Suspense fallback={<Loader />}>
        <Model path={path} />
      </Suspense>
    </Canvas>
  )
}

function Model({ path }) {
  const fbx = useFBX(path)
  return <primitive object={fbx} dispose={null} />
}

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}