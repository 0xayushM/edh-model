// components/SceneRig.tsx
import React, { JSX, useRef } from "react";
import * as THREE from "three";
import { useFrame, RootState } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import GltfModel from "./GltfModel";
import {
  lerpVec3,
  slerpQuat,
  easeInOut,
  S,
  cuts,
  shellNames,
  fadeTargetNames,
  rotAList,
  rotBList,
  posAList,
  posBList,
  Q_left,
} from "../utils/rigHelpers";

export default function SceneRig(): JSX.Element {
  const modelRef = useRef<THREE.Group>(null);
  const scroll = useScroll();
  const capRef = useRef<THREE.Object3D | null>(null);

  // caches
  const shells = useRef<Record<string, { ref: THREE.Object3D | null; parent: THREE.Object3D | null; baseLocalPos: THREE.Vector3; baseScale: THREE.Vector3 }>>({});
  const fadeMeshEntries = useRef<{ mesh: THREE.Mesh; baseOpacity: number[] }[]>([]);
  const processedMeshUUIDs = useRef<Set<string>>(new Set());
  const cachedTargetNames = useRef<Set<string>>(new Set());

  // temps
  const tmpVecA = useRef(new THREE.Vector3());
  const tmpVecB = useRef(new THREE.Vector3());
  const tmpDir = useRef(new THREE.Vector3());

  // small helper used in useFrame for adding section meshes (keeps consistent with global entries)
  const addToGlobalCloneIfNeeded = (name: string) => {
    if (!modelRef.current) return;
    if (cachedTargetNames.current.has(name)) return;
    const ref = modelRef.current.getObjectByName(name);
    cachedTargetNames.current.add(name);
    if (!ref) return;
    ref.traverse((child: any) => {
      if (!child || !child.isMesh) return;
      const mesh = child as THREE.Mesh;
      if (processedMeshUUIDs.current.has(mesh.uuid)) return;
      const mats = Array.isArray((mesh as any).material) ? (mesh as any).material : [(mesh as any).material];
      const cloned = mats.map((m: any) => (m?.isMaterial ? m.clone() : m));
      (mesh as any).material = Array.isArray((mesh as any).material) ? cloned : cloned[0];
      const baseOpacity = cloned.map((m: any) => (typeof m?.opacity === "number" ? m.opacity : 1));
      fadeMeshEntries.current.push({ mesh, baseOpacity });
      processedMeshUUIDs.current.add(mesh.uuid);
    });
  };


  // the big useFrame loop (keeps same structure as your original)
  useFrame((state: RootState) => {
    if (!modelRef.current) return;
    const u = THREE.MathUtils.clamp(scroll.offset, 0, 1);

    // segment index
    let i = 0;
    for (let s = 0; s < cuts.length - 1; s++) {
      if (u >= cuts[s] && u <= cuts[s + 1]) {
        i = s;
        break;
      }
    }

    // --- transition mapping (keeps your behavior) ---
    const u0 = cuts[i];
    const u1 = cuts[i + 1];
    const segLen = Math.max(1e-6, u1 - u0);
    const p = THREE.MathUtils.clamp((u - u0) / segLen, 0, 1);
    const TRANSITION_ZONE = 0.45;
    let tMapped: number;
    if (p <= 0) {
      tMapped = 0;
    } else if (p < TRANSITION_ZONE) {
      const local = p / TRANSITION_ZONE;
      tMapped = easeInOut(local);
    } else {
      tMapped = 1;
    }

    // positions/rotations lists from helpers
    const posA = posAList[i] ?? posAList[2];
    const posB = posBList[i] ?? posBList[posBList.length - 1];
    const rotA = rotAList[i] ?? Q_left;
    const rotB = rotBList[i] ?? Q_left;

    modelRef.current.position.copy(lerpVec3(posA, posB, tMapped));
    modelRef.current.quaternion.copy(slerpQuat(rotA, rotB, tMapped));

    // cap rotation
    if (!capRef.current && modelRef.current) {
      capRef.current = modelRef.current.getObjectByName("cap_1") || null;
    }
    if (capRef.current) {
      capRef.current.rotation.z = u * Math.PI * 2;
    }

    // -----------------------
    // GLOBAL CLONE PASS (for fade targets + section targets — clone only once)
    // -----------------------
    for (const name of fadeTargetNames) addToGlobalCloneIfNeeded(name);

    // -----------------------
    // GLOBAL FADE (skip section-controlled meshes)
    // -----------------------
    const sectionMeshUUIDs = new Set<string>();

    if (fadeMeshEntries.current.length) {
      const s1 = S(1), s2 = S(2), s7 = S(7), s8 = S(8);
      const MIN_ALPHA = 0.2;
      let alpha = 1;
      if (u < s1) {
        alpha = 1;
      } else if (u < s2) {
        const p_ = (u - s1) / (s2 - s1);
        alpha = 1 - (1 - MIN_ALPHA) * easeInOut(p_);
      } else if (u < s7) {
        alpha = MIN_ALPHA;
      } else if (u < s8) {
        const p_ = (u - s7) / (s8 - s7);
        alpha = MIN_ALPHA + (1 - MIN_ALPHA) * easeInOut(p_);
      } else {
        alpha = 1;
      }

      for (const { mesh, baseOpacity } of fadeMeshEntries.current) {
        if (sectionMeshUUIDs.has(mesh.uuid)) continue;
        const mats = Array.isArray((mesh as any).material) ? (mesh as any).material : [(mesh as any).material];
        mats.forEach((m: any, j: number) => {
          if (!m) return;
          m.transparent = true;
          const base = baseOpacity[j] ?? 1;
          m.opacity = base * alpha;
        });
      }
    }

    // -----------------------
    // Shell animation (unchanged logic, with MAX_WORLD_OFFSET tuned)
    // -----------------------
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

      tmpVecA.current.copy(data.baseLocalPos);
      data.parent.localToWorld(tmpVecA.current);

      modelRef.current.getWorldPosition(tmpVecB.current);
      tmpDir.current.copy(tmpVecA.current).sub(tmpVecB.current).normalize();

      const MAX_WORLD_OFFSET = 5;

      const s3_ = S(2), s4_ = S(3), s8_ = S(8), s10_ = S(10);
      let scaleFactor = 1;
      let travel = 0;
      if (u <= s3_) {
        const p_ = easeInOut(THREE.MathUtils.clamp(u / s3_, 0, 1));
        scaleFactor = 1 - p_;
        travel = p_;
      } else if (u < s8_) {
        scaleFactor = 0;
        travel = 0;
      } else if (u < s10_) {
        const p_ = easeInOut(THREE.MathUtils.clamp((u - s8_) / (s10_ - s8_), 0, 1));
        scaleFactor = p_;
        travel = 1 - p_;
      } else {
        scaleFactor = 1;
        travel = 0;
      }

      tmpVecA.current.copy(tmpVecA.current).add(tmpDir.current.multiplyScalar(MAX_WORLD_OFFSET * travel));
      const targetLocal = data.parent.worldToLocal(tmpVecB.current.copy(tmpVecA.current));

      data.ref.position.copy(targetLocal);
      data.ref.scale.copy(data.baseScale.clone().multiplyScalar(scaleFactor));
      data.ref.visible = scaleFactor > 0.001;
      data.ref.updateMatrixWorld();
    }
  });

  return (
    <group ref={modelRef}>
      <GltfModel url="/models/edhway.glb" scale={0.025} />
    </group>
  );
}
