
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';

const FloatingGeometry = ({ position, color, type }: { position: [number, number, number], color: string, type: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
    }
  });

  if (type === 'sphere') {
    return (
      <Sphere ref={meshRef} position={position} args={[1, 32, 32]}>
        <meshStandardMaterial color={color} />
      </Sphere>
    );
  }

  if (type === 'box') {
    return (
      <Box ref={meshRef} position={position} args={[1, 1, 1]}>
        <meshStandardMaterial color={color} />
      </Box>
    );
  }

  return (
    <Torus ref={meshRef} position={position} args={[1, 0.3, 16, 32]}>
      <meshStandardMaterial color={color} />
    </Torus>
  );
};

const Scene3D = () => {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
      
      <FloatingGeometry position={[-3, 0, 0]} color="#8b5cf6" type="sphere" />
      <FloatingGeometry position={[3, 2, -2]} color="#06b6d4" type="box" />
      <FloatingGeometry position={[0, -2, -1]} color="#ec4899" type="torus" />
      <FloatingGeometry position={[-2, 3, -3]} color="#10b981" type="sphere" />
      <FloatingGeometry position={[4, -1, -4]} color="#f59e0b" type="box" />
    </Canvas>
  );
};

const HomePage = () => {
  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Scene3D />
      </div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-fade-in">
          Creative Developer
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          Crafting Digital Experiences with Code & Creativity
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '1s' }}>
          <button 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105"
          >
            View My Work
          </button>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 border-2 border-purple-400 rounded-full hover:bg-purple-400/20 transition-all duration-300"
          >
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
