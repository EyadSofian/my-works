import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const vert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const frag = /* glsl */ `
  precision mediump float;
  uniform float uTime;
  uniform vec3 uAmber;
  uniform vec3 uEmber;
  varying vec2 vUv;
  void main() {
    // vUv.x wraps around the ring → gradient + travelling highlight
    float t = fract(vUv.x + uTime * 0.05);
    vec3 col = mix(uAmber, uEmber, smoothstep(0.0, 1.0, sin(t * 6.2831) * 0.5 + 0.5));
    float pulse = 0.55 + 0.45 * sin(uTime * 1.5 + vUv.x * 6.2831);
    gl_FragColor = vec4(col * pulse, 0.5);
  }
`;

interface AccentRingProps {
  reduced?: boolean;
}

export function AccentRing({ reduced = false }: AccentRingProps) {
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmber: { value: new THREE.Color('#3B82F6') },
      uEmber: { value: new THREE.Color('#6366F1') },
    }),
    [],
  );

  useFrame((_, delta) => {
    if (matRef.current && !reduced) matRef.current.uniforms.uTime.value += delta;
    if (ref.current && !reduced) {
      ref.current.rotation.z += delta * 0.08;
      ref.current.rotation.x = Math.sin(performance.now() * 0.0002) * 0.25;
    }
  });

  return (
    <mesh ref={ref} rotation={[0.4, 0, 0]} position={[0, 0, -0.6]}>
      <torusGeometry args={[3.1, 0.018, 16, 220]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vert}
        fragmentShader={frag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
