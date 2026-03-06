import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ParticleField = () => {
  const meshRef = useRef<THREE.Points>(null);
  const count = 120;

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      sz[i] = Math.random() * 3.5 + 1;
    }
    return [pos, sz];
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime * 0.12;
    const posArray = meshRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 1] += Math.sin(time + i * 0.4) * 0.004;
      posArray[i * 3] += Math.cos(time + i * 0.3) * 0.003;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y = time * 0.04;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#93b8e8" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
};

const FloatingSphere = ({ position, scale, color }: { position: [number, number, number]; scale: number; color: string }) => {
  const ref = useRef<THREE.Mesh>(null);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * 0.25 + offset;
    ref.current.position.y = position[1] + Math.sin(t) * 0.6;
    ref.current.position.x = position[0] + Math.cos(t * 0.7) * 0.4;
    ref.current.rotation.x = t * 0.15;
    ref.current.rotation.z = t * 0.1;
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[scale, 24, 24]} />
      <meshStandardMaterial color={color} transparent opacity={0.14} roughness={0.6} metalness={0.2} />
    </mesh>
  );
};

const FloatingTorus = ({ position, scale, color }: { position: [number, number, number]; scale: number; color: string }) => {
  const ref = useRef<THREE.Mesh>(null);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * 0.2 + offset;
    ref.current.position.y = position[1] + Math.sin(t) * 0.5;
    ref.current.rotation.x = t * 0.3;
    ref.current.rotation.y = t * 0.2;
  });

  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[scale, scale * 0.3, 16, 32]} />
      <meshStandardMaterial color={color} transparent opacity={0.1} roughness={0.5} metalness={0.3} />
    </mesh>
  );
};

const FloatingOcta = ({ position, scale, color }: { position: [number, number, number]; scale: number; color: string }) => {
  const ref = useRef<THREE.Mesh>(null);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * 0.22 + offset;
    ref.current.position.y = position[1] + Math.cos(t) * 0.4;
    ref.current.position.x = position[0] + Math.sin(t * 0.5) * 0.3;
    ref.current.rotation.y = t * 0.4;
    ref.current.rotation.z = t * 0.15;
  });

  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[scale]} />
      <meshStandardMaterial color={color} transparent opacity={0.12} roughness={0.4} metalness={0.3} wireframe />
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
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.4} />
        <pointLight position={[-5, -3, 3]} intensity={0.2} color="#6a9fd8" />
        <ParticleField />
        {/* Spheres */}
        <FloatingSphere position={[-5, 2.5, -2]} scale={0.9} color="#6a9fd8" />
        <FloatingSphere position={[4, -1.5, -3]} scale={1.3} color="#8bb8e8" />
        <FloatingSphere position={[6, 3, -4]} scale={0.5} color="#a3c8f0" />
        <FloatingSphere position={[-3, -2.5, -1]} scale={0.6} color="#c5a84d" />
        {/* Torus rings */}
        <FloatingTorus position={[-6, 0, -5]} scale={0.7} color="#93b8e8" />
        <FloatingTorus position={[5, 2, -6]} scale={0.5} color="#c5a84d" />
        {/* Octahedrons */}
        <FloatingOcta position={[2, 3.5, -3]} scale={0.5} color="#6a9fd8" />
        <FloatingOcta position={[-4, -3, -4]} scale={0.4} color="#a3c8f0" />
      </Canvas>
    </div>
  );
};

export default ParticleBackground;
