 'use client';
// app/page.tsx
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Experience from '../components/Experience'; // Adjust path if needed

export default function Home() {
  return (
    // This container holds both the 3D scene and the HTML content
    <div style={{ width: '100vw', height: '100vh' }}>

      {/* The 3D Canvas */}
      <Canvas
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
        camera={{ position: [0, 0, 15], fov: 30 }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>
    </div>
  );
}