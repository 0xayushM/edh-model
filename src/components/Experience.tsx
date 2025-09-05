'use client';
// src/components/Experience.tsx
import { useFrame, RootState } from '@react-three/fiber';
import { ScrollControls, Scroll, useScroll } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Model } from './Model';

const deg = (v: number) => (v * Math.PI) / 180;

// simple lerps
const lerpVec3 = (a: THREE.Vector3, b: THREE.Vector3, t: number, out = new THREE.Vector3()) =>
  out.set(THREE.MathUtils.lerp(a.x, b.x, t), THREE.MathUtils.lerp(a.y, b.y, t), THREE.MathUtils.lerp(a.z, b.z, t));
const slerpQuat = (a: THREE.Quaternion, b: THREE.Quaternion, t: number, out = new THREE.Quaternion()) =>
  out.copy(a).slerp(b, t);

/**
 * Storyboard (u = scroll.offset 0..1)
 * 0.00–0.20 : LEFT (center) -> FRONT with 45° pitch tilt
 * 0.20–0.40 : FRONT tilt    -> RIGHT with 45° Z roll
 * 0.40–0.60 : RIGHT tilt    -> LEFT (neutral)
 * 0.60–1.00 : LEFT (neutral)-> LEFT rolled 90° (RIGHT=TOP, LEFT=BOTTOM) WHILE moving UP
 *
 * Axis assumptions:
 * - Model forward = +Z. "Facing LEFT" = yaw +90° (toward +X).
 * - If final roll looks reversed on your mesh, flip ROLL_DEG_SIGN below.
 */
const SceneRig: React.FC = () => {
  const modelRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  // Final height for half-reveal (tune to your camera)
  const FINAL_Y = 1;

  // Choose roll sign to ensure RIGHT ends on top, LEFT on bottom
  const ROLL_DEG_SIGN = 90; // try -90 if needed

  // Positions
  const P0 = useMemo(() => new THREE.Vector3(0, 0, 10), []);
  const P1 = useMemo(() => new THREE.Vector3(0, 0, 10), []);
  const P2 = useMemo(() => new THREE.Vector3(0, 0, 10), []);
  const P3 = useMemo(() => new THREE.Vector3(0, 0, 10), []);
  const P4 = useMemo(() => new THREE.Vector3(0, FINAL_Y, 10), []);

  // Rotations (quaternions)
  const Q_left         = useMemo(() => new THREE.Quaternion().setFromEuler(new THREE.Euler(0, deg(90), 0, 'YXZ')), []);
  const Q_frontPitch45 = useMemo(() => new THREE.Quaternion().setFromEuler(new THREE.Euler(deg(-45), 0, 0, 'YXZ')), []);
  const Q_rightRoll45  = useMemo(() => new THREE.Quaternion().setFromEuler(new THREE.Euler(0, deg(-90), deg(45), 'YXZ')), []);
  const Q_leftRolled   = useMemo(() => new THREE.Quaternion().setFromEuler(new THREE.Euler(0, deg(90), deg(ROLL_DEG_SIGN), 'YXZ')), []);

  // Segments: [0, .2], [.2, .4], [.4, .6], [.6, 1]
  const cuts = [0.0, 0.2, 0.4, 0.6, 1.0];
  const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

  useFrame((state: RootState) => {
    if (!modelRef.current) return;

    const u = THREE.MathUtils.clamp(scroll.offset, 0, 1);

    // find segment
    let i = 0;
    for (let s = 0; s < cuts.length - 1; s++) if (u >= cuts[s] && u <= cuts[s + 1]) { i = s; break; }

    const u0 = cuts[i], u1 = cuts[i + 1];
    const t = easeInOut((u - u0) / (u1 - u0));

    // keyframes
    const posA = [P0, P1, P2, P3][i] ?? P3;
    const posB = [P1, P2, P3, P4][i] ?? P4;

    const rotA = [Q_left, Q_frontPitch45, Q_rightRoll45, Q_left][i] ?? Q_left;
    const rotB = [Q_frontPitch45, Q_rightRoll45, Q_left, Q_leftRolled][i] ?? Q_leftRolled;

    // apply
    modelRef.current.position.copy(lerpVec3(posA, posB, t));
    modelRef.current.quaternion.copy(slerpQuat(rotA, rotB, t));
  });

  return (
    <group ref={modelRef}>
      <Model scale={0.5} />
    </group>
  );
};

const Experience: React.FC = () => {
  return (
    <>
      <ScrollControls pages={5} damping={0.3}>
        {/* 3D content controlled by scroll */}
        <SceneRig />

        {/* Your HTML overlay (unchanged) */}
        <Scroll html>
          <div style={{ position: 'relative', zIndex: 2, color: 'var(--foreground)', padding: '2rem' }}>
            <h1 style={{ height: '100vh' }}>Scroll Down to Begin</h1>
            <h2 style={{ height: '100vh' }}>The model is moving...</h2>
            <p style={{ height: '100vh' }}>...along the choreographed beats...</p>
            <p style={{ height: '100vh' }}>...ending with a vertical reveal.</p>
            <p style={{ height: '100vh' }}>This is the end!</p>
          </div>
        </Scroll>
      </ScrollControls>
    </>
  );
};

export default Experience;
