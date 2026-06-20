import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const vert = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform vec2 uMouse;
  uniform float uAmp;
  attribute float aScale;
  attribute vec3 aColor;
  varying vec3 vColor;
  void main() {
    vColor = aColor;
    vec3 p = position;
    p.x += sin(uTime * 0.2 + position.y * 1.8) * 0.18 * uAmp;
    p.y += cos(uTime * 0.15 + position.x * 1.8) * 0.14 * uAmp;
    // parallax: deeper motes (smaller z) react more
    p.xy += uMouse * (0.25 + (position.z + 4.0) * 0.04);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = uSize * aScale * (300.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const frag = /* glsl */ `
  precision mediump float;
  varying vec3 vColor;
  void main() {
    float d = distance(gl_PointCoord, vec2(0.5));
    float a = smoothstep(0.5, 0.0, d);
    if (a < 0.02) discard;
    gl_FragColor = vec4(vColor, a * 0.9);
  }
`;

interface ParticlesProps {
  count?: number;
  reduced?: boolean;
  pointer: React.MutableRefObject<{ x: number; y: number; tx: number; ty: number }>;
}

export function Particles({ count = 2500, reduced = false, pointer }: ParticlesProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const { positions, scales, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    // mid-tones that read on both light and dark backgrounds
    const palette = [
      new THREE.Color('#3B82F6'), // blue
      new THREE.Color('#6366F1'), // indigo
      new THREE.Color('#0EA5E9'), // sky
      new THREE.Color('#64748B'), // slate
      new THREE.Color('#64748B'),
    ];

    for (let i = 0; i < count; i++) {
      // shallow Z slab behind the portrait
      positions[i * 3 + 0] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = -1 - Math.random() * 5;
      scales[i] = 0.4 + Math.random() * 1.2;
      const c = palette[(Math.random() * palette.length) | 0];
      colors[i * 3 + 0] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, scales, colors };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 0.012 },
      uMouse: { value: new THREE.Vector2() },
      uAmp: { value: reduced ? 0 : 1 },
    }),
    [reduced],
  );

  useFrame((_, delta) => {
    const m = matRef.current;
    if (!m) return;
    if (!reduced) m.uniforms.uTime.value += delta;
    const p = pointer.current;
    m.uniforms.uMouse.value.lerp(new THREE.Vector2(p.x, p.y), 0.05);
  });

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aColor" args={[colors, 3]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={vert}
        fragmentShader={frag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}
