// components/ModelViewer.tsx
"use client";

import React, { JSX, Suspense, useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame, type RootState } from "@react-three/fiber";
import {
  useGLTF,
  useAnimations,
  Environment,
  Html,
  ScrollControls,
  Scroll,
  useScroll,
  Center,
} from "@react-three/drei";
 
 interface GltfModelProps {
   url?: string;
   scale?: number | [number, number, number];
   position?: [number, number, number];
   rotation?: [number, number, number];
 }
 
 // helpers (same style as Experience.tsx)
 const deg = (v: number) => (v * Math.PI) / 180;
 const lerpVec3 = (
   a: THREE.Vector3,
   b: THREE.Vector3,
   t: number,
   out = new THREE.Vector3()
 ) => out.set(
   THREE.MathUtils.lerp(a.x, b.x, t),
   THREE.MathUtils.lerp(a.y, b.y, t),
   THREE.MathUtils.lerp(a.z, b.z, t)
 );
 const slerpQuat = (
   a: THREE.Quaternion,
   b: THREE.Quaternion,
   t: number,
   out = new THREE.Quaternion()
 ) => out.copy(a).slerp(b, t);
 
/**
 * GltfModel component
 * - Plays all animation clips (looping).
 * - Fixed position, scale, and rotation at load.
 */
function GltfModel({
  url = "/models/edhway.glb",
  scale = 0.1,
  position = [0.0, 0.0, 0.0],
  rotation = [5, 2, 4.4],
}: GltfModelProps) {
  const group = useRef<THREE.Group | null>(null);
  const gltf = useGLTF(url) as any;
  const { actions, mixer } = useAnimations(gltf.animations, group);

  // Auto-play & loop all animations
  useEffect(() => {
    if (!actions) return;

    const entries = Object.entries(actions)
      .filter(([, a]) => !!a)
      .map(([name, a]) => ({ name, action: a as THREE.AnimationAction }));

    if (entries.length === 0) return;

    entries.forEach(({ action }) => {
      action.reset();
      action.setLoop(THREE.LoopRepeat, Infinity);
      action.play();
    });

    if (mixer) mixer.timeScale = 1.0;

    return () => {
      entries.forEach(({ action }) => {
        try {
          action.stop();
        } catch (e) {
          /* ignore */
        }
      });
    };
  }, [actions, mixer, gltf.animations]);

  // Ensure meshes cast/receive shadows and fallback material if needed
  useEffect(() => {
    if (!gltf || !gltf.scene) return;
    gltf.scene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (!child.material || child.material.isShaderMaterial) {
          child.material = new THREE.MeshStandardMaterial({
            color: child.material?.color || new THREE.Color(0xdddddd),
            roughness: 0.6,
          });
        }
      }
    });
  }, [gltf]);

  return (
    <group
      ref={group}
      dispose={null}
      position={position}
      scale={Array.isArray(scale) ? scale : [scale, scale, scale]}
      rotation={rotation}
    >
      <Center>
        <primitive object={gltf.scene} />
      </Center>
    </group>
  );
}

export default function ModelViewer(): JSX.Element {
  // Scene rig that reacts to scroll (ported from Experience.tsx, adapted for EDHWay)
  const SceneRig: React.FC = () => {
    const modelRef = useRef<THREE.Group>(null);
    const scroll = useScroll();

    // final reveal height (tune for your camera)
    const FINAL_Y = 1;
    const ROLL_DEG_SIGN = 90; // try -90 if the roll looks inverted for EDHWay

    // Positions (keep near camera z=0 so it's visible with our camera at z≈3)
    const P0 = useMemo(() => new THREE.Vector3(0, 0, 0), []);
    const P1 = useMemo(() => new THREE.Vector3(0, 0, 0), []);
    const P2 = useMemo(() => new THREE.Vector3(0, 0, 0), []);
    const P3 = useMemo(() => new THREE.Vector3(0, 0, 0), []);
    const P4 = useMemo(() => new THREE.Vector3(0, FINAL_Y, 0), []);

    // Rotations (quaternions)
    const Q_left         = useMemo(() => new THREE.Quaternion().setFromEuler(new THREE.Euler(0, deg(90), 0, 'YXZ')), []);
    const Q_frontPitch45 = useMemo(() => new THREE.Quaternion().setFromEuler(new THREE.Euler(deg(-45), 0, 0, 'YXZ')), []);
    const Q_rightRoll45  = useMemo(() => new THREE.Quaternion().setFromEuler(new THREE.Euler(0, deg(-90), deg(45), 'YXZ')), []);
    const Q_leftRolled   = useMemo(() => new THREE.Quaternion().setFromEuler(new THREE.Euler(0, deg(90), deg(ROLL_DEG_SIGN), 'YXZ')), []);

    const cuts = [0.0, 0.2, 0.4, 0.6, 1.0];
    const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

    useFrame((state: RootState) => {
      if (!modelRef.current) return;
      const u = THREE.MathUtils.clamp(scroll.offset, 0, 1.5);

      // find current segment index
      let i = 0;
      for (let s = 0; s < cuts.length - 1; s++) if (u >= cuts[s] && u <= cuts[s + 1]) { i = s; break; }

      const u0 = cuts[i], u1 = cuts[i + 1];
      const t = easeInOut((u - u0) / (u1 - u0));

      const posA = [P0, P1, P2, P3][i] ?? P3;
      const posB = [P1, P2, P3, P4][i] ?? P4;
      const rotA = [Q_left, Q_frontPitch45, Q_rightRoll45, Q_left][i] ?? Q_left;
      const rotB = [Q_frontPitch45, Q_rightRoll45, Q_left, Q_leftRolled][i] ?? Q_leftRolled;

      modelRef.current.position.copy(lerpVec3(posA, posB, t));
      modelRef.current.quaternion.copy(slerpQuat(rotA, rotB, t));
    });

    return (
      <group ref={modelRef}>
        <GltfModel url="/models/edhway.glb" scale={0.025} />
      </group>
    );
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas shadows camera={{ position: [0, 1.2, 3], fov: 45 }}>
        <color attach="background" args={["#0a0a0a"]} />

        {/* Lights */}
        <ambientLight intensity={0.6} />
        <directionalLight
          castShadow
          position={[4, 8, 4]}
          intensity={0.9}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-6, -6, -6]} intensity={0.2} />

        <Environment preset="studio" />

        <ScrollControls pages={5} damping={0.3}>
          {/* 3D content controlled by scroll */}
          <Suspense fallback={<Html center style={{ color: "#fff" }}>Loading model…</Html>}>
            <SceneRig />
          </Suspense>

          {/* HTML overlay sections */}
          <Scroll html>
            <div className="h-screen relative z-2 bg-red-400 w-full">
              <h1 style={{ height: '100vh' }}>Scroll Down to Begin</h1>
              <h2 style={{ height: '100vh' }}>The model is moving...</h2>
              <p style={{ height: '100vh' }}>...along the choreographed beats...</p>
              <p style={{ height: '100vh' }}>...ending with a vertical reveal.</p>
              <p style={{ height: '100vh' }}>This is the end!</p>
            </div>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
}

// preload
useGLTF.preload("/models/edhway.glb");
