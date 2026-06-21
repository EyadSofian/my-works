import { Suspense, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { HeroConstellation } from './HeroConstellation';
import { Particles } from './Particles';

interface PointerRef {
  x: number;
  y: number;
  tx: number;
  ty: number;
}

interface HeroSceneProps {
  reduced: boolean;
  isMobile: boolean;
  dark: boolean;
  active: boolean;
  pointer: React.MutableRefObject<PointerRef>;
  progress: React.MutableRefObject<number>;
}

function SceneContents({ reduced, isMobile, pointer, progress }: Omit<HeroSceneProps, 'active' | 'dark'>) {
  const { camera } = useThree();
  const rig = useRef<THREE.Group>(null);

  useFrame(() => {
    const p = progress.current;
    camera.position.z += (6 + p * 2.8 - camera.position.z) * 0.1;
    camera.position.y += (p * 0.5 - camera.position.y) * 0.1;
    camera.lookAt(0, 0, 0);

    if (rig.current) {
      const targetScale = 1 - p * 0.66;
      rig.current.scale.setScalar(THREE.MathUtils.lerp(rig.current.scale.x, targetScale, 0.12));
      rig.current.position.x += (-p * 2.0 - rig.current.position.x) * 0.12;
      rig.current.position.y += (p * 2.4 - rig.current.position.y) * 0.12;
    }
  });

  return (
    <>
      {/* lighting for the lit orb */}
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 5, 3]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-4, -2, 2]} intensity={9} distance={16} color="#3B82F6" />
      <pointLight position={[3, -3, 4]} intensity={6} distance={16} color="#A855F7" />

      <group ref={rig}>
        <HeroConstellation reduced={reduced} pointer={pointer} />
      </group>
      <Particles count={isMobile ? 1100 : 2400} reduced={reduced} pointer={pointer} />
    </>
  );
}

export function HeroScene({ reduced, isMobile, dark, active, pointer, progress }: HeroSceneProps) {
  // Bloom only on dark theme (it washes out a light background).
  const enablePost = dark && !reduced && !isMobile;

  return (
    <Canvas
      className="absolute inset-0"
      dpr={[1, isMobile ? 1.3 : 1.75]}
      frameloop={active ? 'always' : 'demand'}
      camera={{ position: [0, 0, 6], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <Suspense fallback={null}>
        <SceneContents reduced={reduced} isMobile={isMobile} pointer={pointer} progress={progress} />
        {enablePost && (
          <EffectComposer enableNormalPass={false}>
            <Bloom luminanceThreshold={0.55} luminanceSmoothing={0.3} intensity={0.6} mipmapBlur radius={0.7} />
            <Vignette eskil={false} offset={0.32} darkness={0.7} />
          </EffectComposer>
        )}
      </Suspense>
    </Canvas>
  );
}
