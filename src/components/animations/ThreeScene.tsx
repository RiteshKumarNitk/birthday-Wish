"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function TorusKnot() {
  const ref = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useFrame(({ clock, pointer }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * 0.15 + pointer.y * 0.3;
    ref.current.rotation.y = t * 0.2 + pointer.x * 0.3;
    ref.current.position.y = Math.sin(t * 0.3) * 0.3;
    ref.current.position.x = Math.sin(t * 0.2) * 0.2;
  });

  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1.2, 0.4, 128, 16]} />
      <MeshDistortMaterial
        color="#7c3aed"
        emissive="#ff2d78"
        emissiveIntensity={0.15}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.35}
        distort={0.15}
        speed={2}
      />
    </mesh>
  );
}

function Particles() {
  const count = 300;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
    }
    return pos;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#ffffff"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export function ThreeScene() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, -5, -5]} intensity={0.4} color="#ff2d78" />
        <TorusKnot />
        <Particles />
      </Canvas>
    </div>
  );
}
