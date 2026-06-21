import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

interface PointerRef {
  x: number;
  y: number;
  tx: number;
  ty: number;
}

interface HeroConstellationProps {
  reduced?: boolean;
  pointer: React.MutableRefObject<PointerRef>;
}

/**
 * Centerpiece — a slowly-rotating "neural network" constellation: nodes connected by
 * thin links. On-brand for an AI / NLP engineer, delicate on a light background, and
 * deliberately NOT a solid blob. Tilts toward the cursor and breathes via Float.
 */
export function HeroConstellation({ reduced = false, pointer }: HeroConstellationProps) {
  const tilt = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);

  const { nodes, linePositions } = useMemo(() => {
    const N = 48;
    const R = 2.05;
    const pts: THREE.Vector3[] = [];
    // golden-angle (fibonacci) distribution on a sphere + a little jitter
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const phi = i * Math.PI * (3 - Math.sqrt(5));
      const jit = 0.3;
      pts.push(
        new THREE.Vector3(
          Math.cos(phi) * r * R + (Math.random() - 0.5) * jit,
          y * R + (Math.random() - 0.5) * jit,
          Math.sin(phi) * r * R + (Math.random() - 0.5) * jit,
        ),
      );
    }

    // link near neighbours
    const segs: number[] = [];
    const thresh = 1.25;
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        if (pts[i].distanceTo(pts[j]) < thresh) {
          segs.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
        }
      }
    }
    return { nodes: pts, linePositions: new Float32Array(segs) };
  }, []);

  useFrame((_, delta) => {
    const p = pointer.current;
    if (tilt.current) {
      const max = reduced ? 0 : 0.4;
      tilt.current.rotation.y += (p.x * max - tilt.current.rotation.y) * 0.06;
      tilt.current.rotation.x += (-p.y * max - tilt.current.rotation.x) * 0.06;
    }
    if (spin.current && !reduced) {
      spin.current.rotation.y += delta * 0.12;
      spin.current.rotation.z += delta * 0.02;
    }
  });

  return (
    <Float speed={reduced ? 0 : 1.1} rotationIntensity={reduced ? 0 : 0.22} floatIntensity={reduced ? 0 : 0.5}>
      <group ref={tilt}>
        <group ref={spin}>
          {/* links */}
          <lineSegments>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
            </bufferGeometry>
            <lineBasicMaterial color="#4F46E5" transparent opacity={0.38} depthWrite={false} />
          </lineSegments>

          {/* nodes — a few larger "hubs", the rest small */}
          {nodes.map((n, i) => {
            const hub = i % 6 === 0;
            return (
              <mesh key={i} position={[n.x, n.y, n.z]}>
                <sphereGeometry args={[hub ? 0.085 : 0.05, 14, 14]} />
                <meshBasicMaterial color={hub ? '#2563EB' : '#3B82F6'} />
              </mesh>
            );
          })}
        </group>
      </group>
    </Float>
  );
}
