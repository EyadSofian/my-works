import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

interface PointerRef {
  x: number;
  y: number;
  tx: number;
  ty: number;
}

interface HeroObjectProps {
  reduced?: boolean;
  pointer: React.MutableRefObject<PointerRef>;
}

/**
 * Abstract centerpiece — a glossy "liquid" orb (Liquid Glass direction).
 * Slowly spins, breathes via vertex distortion, and tilts toward the cursor.
 */
export function HeroObject({ reduced = false, pointer }: HeroObjectProps) {
  const tilt = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    const p = pointer.current;
    const d = Math.min(1, delta * 4);
    p.x += (p.tx - p.x) * d;
    p.y += (p.ty - p.y) * d;

    if (tilt.current) {
      const max = reduced ? 0 : 0.35;
      tilt.current.rotation.y += (p.x * max - tilt.current.rotation.y) * 0.06;
      tilt.current.rotation.x += (-p.y * max - tilt.current.rotation.x) * 0.06;
    }
    if (spin.current && !reduced) {
      spin.current.rotation.y += delta * 0.16;
      spin.current.rotation.z += delta * 0.04;
    }
  });

  return (
    <Float
      speed={reduced ? 0 : 1.4}
      rotationIntensity={reduced ? 0 : 0.3}
      floatIntensity={reduced ? 0 : 0.7}
    >
      <group ref={tilt}>
        <mesh ref={spin}>
          <sphereGeometry args={[1.75, 96, 96]} />
          <MeshDistortMaterial
            color="#3B82F6"
            distort={reduced ? 0 : 0.4}
            speed={reduced ? 0 : 1.7}
            roughness={0.3}
            metalness={0.18}
          />
        </mesh>
        {/* faint inner core for depth */}
        <mesh scale={0.6}>
          <sphereGeometry args={[1.75, 32, 32]} />
          <meshBasicMaterial color="#6366F1" transparent opacity={0.18} />
        </mesh>
      </group>
    </Float>
  );
}
