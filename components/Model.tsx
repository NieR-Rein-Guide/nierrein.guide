import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useFBX } from '@react-three/drei'

export default function Scene() {

  return (
    <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={<p>Loading...</p>}>
          <Model />
        </Suspense>
      </Canvas>
  )
}

function Model() {
  const fbx = useFBX('/model/model.fbx')
  return <primitive object={fbx} dispose={null} />
}