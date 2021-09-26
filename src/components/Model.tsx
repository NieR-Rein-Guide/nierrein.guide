import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  useFBX,
  Html,
  useProgress,
  PerspectiveCamera,
  OrbitControls,
  Environment,
} from "@react-three/drei";
import Error from "@components/Error";

export default function Scene({ path }: { path: string }): JSX.Element {
  return (
    <Error>
      <Canvas style={{ cursor: "grab" }}>
        <group position={[0, -1, 0]}>
          <Suspense fallback={<Loader />}>
            <PerspectiveCamera makeDefault position={[0, 1, 10]} zoom={4} />
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
            />
            <ambientLight />
            <Environment background={false} preset="studio" />

            <Model path={path} />
          </Suspense>
        </group>
      </Canvas>
    </Error>
  );
}

function Model({ path }): JSX.Element {
  const fbx = useFBX(path);
  return <primitive key={path} object={fbx} dispose={null} />;
}

function Loader(): JSX.Element {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}
