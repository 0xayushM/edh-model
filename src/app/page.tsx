 'use client';

 import ModelViewer from "@/components/ModelViewer";

export default function Home() {
  return (
    <main className="gradient-background">
      <div className="flex flex-col items-center h-screen">
        <ModelViewer />
      </div>
    </main>
  );
}