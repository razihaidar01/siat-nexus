import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ParticleField = () => {
  const meshRef = useRef<THREE.Points>(null);
  const count = 80;

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      sz[i] = Math.random() * 3 + 1;
    }
    return [pos, sz];
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime * 0.15;
    const posArray = meshRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 1] += Math.sin(time + i * 0.5) * 0.003;
      posArray[i * 3] += Math.cos(time + i * 0.3) * 0.002;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y = time * 0.05;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#93b8e8" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
};

const FloatingSphere = ({ position, scale, color }: { position: [number, number, number]; scale: number; color: string }) => {
  const ref = useRef<THREE.Mesh>(null);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * 0.3 + offset;
    ref.current.position.y = position[1] + Math.sin(t) * 0.5;
    ref.current.position.x = position[0] + Math.cos(t * 0.7) * 0.3;
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[scale, 16, 16]} />
      <meshStandardMaterial color={color} transparent opacity={0.12} roughness={0.8} />
    </mesh>
  );
};

const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.3} />
        <ParticleField />
        <FloatingSphere position={[-4, 2, -2]} scale={0.8} color="#6a9fd8" />
        <FloatingSphere position={[3, -1, -3]} scale={1.2} color="#8bb8e8" />
        <FloatingSphere position={[5, 3, -4]} scale={0.6} color="#a3c8f0" />
        <FloatingSphere position={[-3, -2, -1]} scale={0.5} color="#c5a84d" />
      </Canvas>
    </div>
  );
};

export default ParticleBackground;
