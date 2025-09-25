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

// helpers
const deg = (v: number) => (v * Math.PI) / 180;
const lerpVec3 = (
  a: THREE.Vector3,
  b: THREE.Vector3,
  t: number,
  out = new THREE.Vector3()
) =>
  out.set(
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
 */
function GltfModel({
  url = "/models/edhway.glb",
  scale = 0.1,
  position = [0.0, 0.0, 0.0],
  rotation = [0, 0, 0],
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
      if (!child.isMesh) return;
      child.castShadow = true;
      child.receiveShadow = true;

      const assignFallback = (mat: any) => {
        if (!mat || mat.isShaderMaterial) {
          return new THREE.MeshStandardMaterial({
            color: mat && mat.color ? mat.color : new THREE.Color(0xdddddd),
            roughness: 0.6,
          });
        }
        return mat;
      };

      if (Array.isArray(child.material)) {
        child.material = child.material.map(assignFallback);
      } else {
        child.material = assignFallback(child.material);
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
  // Scene rig that reacts to scroll (ported from Experience.tsx, adapted)
  const SceneRig: React.FC = () => {
    const modelRef = useRef<THREE.Group>(null);
    const scroll = useScroll();
    const capRef = useRef<THREE.Object3D | null>(null);
    const shellNames = useMemo(
      () => [
        "cap_bl",
        "cap_br",
        "cap_tl",
        "cap_tr",
        // 1-series
        "shell_bl_1",
        "shell_br_1",
        "shell_tl_1",
        "shell_tr_1",
        // 3-series
        "shell_bl_3",
        "shell_br_3",
        "shell_tl_3",
        "shell_tr_3",
      ],
      []
    );
    const shells = useRef<Record<
      string,
      {
        ref: THREE.Object3D | null;
        parent: THREE.Object3D | null;
        baseLocalPos: THREE.Vector3;
        baseScale: THREE.Vector3;
      }
    >>({});

    // Names of objects to fade across sections
    const fadeTargetNames = useMemo(
      () => [
        "cap_1",
        "gear_1",
        "gear_3_shaft",
        "gear_3_disc_1",
        "gear_3_disc_2",
        "gear_3_disc_3",
        "gear_3_disc_4",
        "gear_5",
        "gear_6",
        "gear_6_1",
        "gear_6_2",
        "gear_6_3",
        "gear_7",
        "gear_8",
        "shell_2",
        "shell_gear",
        "gear_10",
        "gear_12",
      ],
      []
    );
    // Caches for targeted fade
    const fadeMeshEntries = useRef<{ mesh: THREE.Mesh; baseOpacity: number[] }[]>([]);
    const processedMeshUUIDs = useRef<Set<string>>(new Set());
    const cachedTargetNames = useRef<Set<string>>(new Set());

    // final reveal height (tune for your camera)
    const FINAL_Y = 1.7;
    const ROLL_DEG_SIGN = -90;

    // Positions (kept near camera)
    const P0 = useMemo(() => new THREE.Vector3(0, 0, 0), []);
    const P1 = useMemo(() => new THREE.Vector3(0, 0, 0), []);
    const P2 = useMemo(() => new THREE.Vector3(0, 0, 0), []);
    const P3 = useMemo(() => new THREE.Vector3(0, 0, 0), []);
    const P4 = useMemo(() => new THREE.Vector3(0, FINAL_Y, 0), []);

    // Rotations (quaternions)
    const Q_left = useMemo(
      () => new THREE.Quaternion().setFromEuler(new THREE.Euler(deg(0), deg(90), deg(-120), "YXZ")),
      []
    );
    const Q_frontPitch45 = useMemo(
      () => new THREE.Quaternion().setFromEuler(new THREE.Euler(deg(0), deg(45), deg(0), "YXZ")),
      []
    );
    const Q_rightRoll45 = useMemo(
      () => new THREE.Quaternion().setFromEuler(new THREE.Euler(0, deg(-90), deg(45), "YXZ")),
      []
    );
    const Q_leftRolled = useMemo(
      () => new THREE.Quaternion().setFromEuler(new THREE.Euler(deg(-90), deg(90), deg(ROLL_DEG_SIGN), "YXZ")),
      []
    );
    const Q_leftSpin = useMemo(
      () => new THREE.Quaternion().setFromEuler(new THREE.Euler(deg(0), deg(270), deg(-120), "YXZ")),
      []
    );

    // === pages & cuts (pages=11) ===
    const S = (n: number) => n / 11; // section -> normalized offset
    const cuts = [0.0, S(1), S(2), S(3), S(8), S(9), S(10), 1.0];

    // rotations arrays across segments between cuts
    const rotAList = [Q_left, Q_frontPitch45, Q_rightRoll45, Q_left, Q_left, Q_left, Q_frontPitch45];
    const rotBList = [Q_frontPitch45, Q_rightRoll45, Q_left, Q_left, Q_left, Q_frontPitch45, Q_leftRolled];

    const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

    // small temp objects to reduce allocations
    const tmpVecA = useRef(new THREE.Vector3());
    const tmpVecB = useRef(new THREE.Vector3());
    const tmpDir = useRef(new THREE.Vector3());

    useFrame((state: RootState) => {
      if (!modelRef.current) return;
      const u = THREE.MathUtils.clamp(scroll.offset, 0, 1);

      // find current segment index given cuts
      let i = 0;
      for (let s = 0; s < cuts.length - 1; s++) {
        if (u >= cuts[s] && u <= cuts[s + 1]) {
          i = s;
          break;
        }
      }

      const u0 = cuts[i],
        u1 = cuts[i + 1];
      const t = u1 - u0 > 0 ? easeInOut((u - u0) / (u1 - u0)) : 0;

      const posA = [P0, P1, P2, P3, P3, P3, P3][i] ?? P3;
      const posB = [P1, P2, P3, P3, P3, P3, P4][i] ?? P4;

      const rotA = rotAList[i] ?? Q_left;
      const rotB = rotBList[i] ?? Q_left;

      modelRef.current.position.copy(lerpVec3(posA, posB, t));
      modelRef.current.quaternion.copy(slerpQuat(rotA, rotB, t));

      // cap rotation (single lookup cached)
      if (!capRef.current && modelRef.current) {
        capRef.current = modelRef.current.getObjectByName("cap_1") || null;
      }
      if (capRef.current) {
        capRef.current.rotation.z = u * Math.PI * 2;
      }

      // Cache target objects' meshes and clone their materials once (targeted fade only)
      if (modelRef.current) {
        for (const name of fadeTargetNames) {
          if (cachedTargetNames.current.has(name)) continue;
          const ref = modelRef.current.getObjectByName(name);
          if (ref) {
            ref.traverse((child: any) => {
              if (child && child.isMesh) {
                const mesh = child as THREE.Mesh;
                if (processedMeshUUIDs.current.has(mesh.uuid)) return;
                const mats = Array.isArray((mesh as any).material)
                  ? (mesh as any).material
                  : [(mesh as any).material];
                // Clone materials to avoid affecting shared materials used by other parts of the model
                const cloned = mats.map((m: any) => (m?.isMaterial ? m.clone() : m));
                (mesh as any).material = Array.isArray((mesh as any).material) ? cloned : cloned[0];
                const baseOpacity = cloned.map((m: any) => (typeof m?.opacity === 'number' ? m.opacity : 1));
                fadeMeshEntries.current.push({ mesh, baseOpacity });
                processedMeshUUIDs.current.add(mesh.uuid);
              }
            });
            cachedTargetNames.current.add(name);
          }
        }
      }

      // Targeted opacity fade timeline for the specified objects only:
      // - Fade from 1 -> 0.2 across Section 3 (S(2) -> S(3))
      // - Hold at 0.2 across Sections 4–7 (S(3) -> S(7))
      // - Restore from 0.2 -> 1 across Section 8 (S(7) -> S(8))
      if (fadeMeshEntries.current.length) {
        const s2 = S(2), s3 = S(3), s7 = S(7), s8 = S(8);
        const MIN_ALPHA = 0.2;
        let alpha = 1;
        if (u < s2) {
          alpha = 1;
        } else if (u < s3) {
          const p = (u - s2) / (s3 - s2);
          alpha = 1 - (1 - MIN_ALPHA) * easeInOut(p);
        } else if (u < s7) {
          alpha = MIN_ALPHA;
        } else if (u < s8) {
          const p = (u - s7) / (s8 - s7);
          alpha = MIN_ALPHA + (1 - MIN_ALPHA) * easeInOut(p);
        } else {
          alpha = 1;
        }

        for (const { mesh, baseOpacity } of fadeMeshEntries.current) {
          const mats = Array.isArray((mesh as any).material)
            ? (mesh as any).material
            : [(mesh as any).material];
          mats.forEach((m: any, j: number) => {
            if (!m) return;
            m.transparent = true;
            const base = baseOpacity[j] ?? 1;
            m.opacity = base * alpha;
          });
        }
      }

      // cache shell objects once
      if (modelRef.current) {
        modelRef.current.updateMatrixWorld(true);
        for (const name of shellNames) {
          if (!shells.current[name]) {
            const ref = modelRef.current.getObjectByName(name) || null;
            if (ref) {
              shells.current[name] = {
                ref,
                parent: ref.parent || null,
                baseLocalPos: ref.position.clone(),
                baseScale: ref.scale.clone(),
              };
            }
          }
        }
      }

      for (const name in shells.current) {
        const data = shells.current[name];
        if (!data || !data.ref || !data.parent) continue;

        data.parent.updateMatrixWorld(true);

        // convert base local pos to world (reuse tmpVecA)
        tmpVecA.current.copy(data.baseLocalPos);
        data.parent.localToWorld(tmpVecA.current);

        // model world pos (reuse tmpVecB)
        modelRef.current.getWorldPosition(tmpVecB.current);

        // direction from model to base world pos
        tmpDir.current.copy(tmpVecA.current).sub(tmpVecB.current).normalize();

        const MAX_WORLD_OFFSET = 0.5;

        const s2 = S(2), s3 = S(3), s8 = S(8), s10 = S(10);
        let scaleFactor = 1;
        let travel = 0;
        if (u <= s2) {
          const p = easeInOut(THREE.MathUtils.clamp(u / s2, 0, 1));
          scaleFactor = 1 - p; // 1 -> 0
          travel = p;
        } else if (u < s8) {
          scaleFactor = 0;
          travel = 0;
        } else if (u < s10) {
          const p = easeInOut(THREE.MathUtils.clamp((u - s8) / (s10 - s8), 0, 1));
          scaleFactor = p;      // 0 -> 1 across Section 9
          travel = 1 - p;       // return to base by end of Section 9
        } else {
          scaleFactor = 1;
          travel = 0;
        }

        // compute target world and convert to local (re-using tmpVecA/tmpVecB)
        tmpVecA.current.copy(tmpVecA.current).add(tmpDir.current.multiplyScalar(MAX_WORLD_OFFSET * travel));
        const targetLocal = data.parent.worldToLocal(tmpVecB.current.copy(tmpVecA.current));

        data.ref.position.copy(targetLocal);
        // apply scale (use baseScale multiplied)
        data.ref.scale.copy(data.baseScale.clone().multiplyScalar(scaleFactor));
        // visibility threshold when effectively zero
        data.ref.visible = scaleFactor > 0.001;
        data.ref.updateMatrixWorld();
      }
    });

    return (
      <group ref={modelRef}>
        <GltfModel url="/models/edhway.glb" scale={0.025} />
      </group>
    );
  };

  return (
    <div style={{ position: "fixed", inset: 0, width: "100%", height: "100vh" }}>
      {/* NOTE: pages set to 10 (original was 5) */}
      <Canvas shadows camera={{ position: [0, 0, 3], fov: 45 }}>
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

        <ScrollControls pages={11} damping={0.3}>
          {/* 3D content controlled by scroll */}
          <Suspense fallback={<Html center style={{ color: "#fff" }}>Loading model…</Html>}>
            <SceneRig />
          </Suspense>

          {/* HTML overlay sections (10 full-screen sections) */}
          <Scroll html>
            <div className="relative z-20 w-screen pointer-events-none">
              {/* Section 1 */}
              <section className="w-screen h-screen flex items-center justify-center p-8">
                <div className="max-w-3xl mx-auto text-center pointer-events-auto">
                  <h1 className="text-5xl font-bold mb-4">Scroll Down to Begin</h1>
                  <p className="opacity-80">
                    Sections are full-screen overlays; the model continues animating beneath.
                  </p>
                </div>
              </section>

              {/* Section 2 */}
              <section className="w-screen h-screen flex items-center justify-center p-8">
                <div className="max-w-3xl mx-auto text-center pointer-events-auto">
                  <h2 className="text-4xl font-semibold mb-4">The model is moving...</h2>
                  <p className="opacity-80">Customize this content freely.</p>
                </div>
              </section>

              {/* Section 3 */}
              <section className="w-screen h-screen flex items-center justify-center p-8">
                <div className="max-w-3xl mx-auto text-center pointer-events-auto">
                  <p className="text-2xl">...along the choreographed beats...</p>
                </div>
              </section>

              {/* Inserted 5 new sections where rotation holds steady (pages 4..8) */}
              {Array.from({ length: 5 }).map((_, idx) => (
                <section
                  key={`inserted-${idx}`}
                  className="w-screen h-screen flex items-center justify-center p-8"
                >
                  <div className="max-w-3xl mx-auto text-center pointer-events-auto">
                    <h3 className="text-3xl font-medium mb-3">Extended section {idx + 1}</h3>
                    <p className="opacity-80">Rotation state is held steady across these slides.</p>
                  </div>
                </section>
              ))}

              {/* Section 9: shells reassemble */}
              <section className="w-screen h-screen flex items-center justify-center p-8">
                <div className="max-w-3xl mx-auto text-center pointer-events-auto">
                  <p className="text-2xl">Shells reassembling...</p>
                </div>
              </section>

              {/* Section 10: extra rotation */}
              <section className="w-screen h-screen flex items-center justify-center p-8">
                <div className="max-w-3xl mx-auto text-center pointer-events-auto">
                  <p className="text-2xl">Extra rotation…</p>
                </div>
              </section>

              {/* Section 11: final reveal */}
              <section className="w-screen h-screen flex items-center justify-center p-8">
                <div className="max-w-3xl mx-auto text-center pointer-events-auto">
                  <p className="text-2xl">...ending with a vertical reveal.</p>
                </div>
              </section>
            </div>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
}

// preload
useGLTF.preload("/models/edhway.glb");
