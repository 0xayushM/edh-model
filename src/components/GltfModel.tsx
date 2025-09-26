// components/GltfModel.tsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useGLTF, useAnimations, Center } from "@react-three/drei";

interface GltfModelProps {
  url?: string;
  scale?: number | [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export function GltfModel({
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

// preload hint (call once when module is imported)
useGLTF.preload("/models/edhway.glb");

export default GltfModel;
