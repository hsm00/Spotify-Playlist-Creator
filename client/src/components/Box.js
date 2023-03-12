import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";   
import { TextureLoader } from "three/src/loaders/TextureLoader";
import logo from "../images/logo.svg";

export default function Box() {
  const colorMap = useLoader(TextureLoader, logo);
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta * 0.5;
  });

  return (
    <mesh ref={meshRef}>
      <boxBufferGeometry attach="geometry" args={[3, 3, 3]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );
}