import React, { Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  useFBX,
  Html,
  useProgress,
  PerspectiveCamera,
  OrbitControls,
  Environment,
  ContactShadows,
  Plane,
} from "@react-three/drei";
import Error from "@components/Error";
import * as THREE from "three";

const floor_width = 100
const floor_color = "#94918b"
const wall_color = "#CFCFCF"

export default function Scene({ path }: { path: string }): JSX.Element {
  return (
    <Error>
      <Canvas style={{ cursor: "grab" }}>
        <PerspectiveCamera makeDefault position={[0, 1, 10]} zoom={4} />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
        />
        <group position={[0, -1, 0]}>
          <Suspense fallback={<Loader />}>
            
            <ambientLight />
            <Environment background={false} preset="studio" />
            <SkyBox />
            <Model path={path} />
            <ContactShadows position={[0, 0, 0]} width={10} height={10} far={10} rotation={[Math.PI / 2, 0, 0]} />
            <Plane args={[floor_width, floor_width]} position={[0, -.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <meshBasicMaterial attach="material" color={floor_color} />
            </Plane>
          </Suspense>
        </group>
      </Canvas>
    </Error>
  );
}

function Model({ path }): JSX.Element {
  const fbx = useFBX(path);
  fbx.visible = true;
  return <primitive key={path} object={fbx} dispose={null} />;
}

function Loader(): JSX.Element {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

function SkyBox() {
  const { scene } = useThree();
  scene.background = new THREE.Color(wall_color);
  return null;
}