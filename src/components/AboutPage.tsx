
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Dodecahedron, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

const RotatingShape = ({ position, color, shape }: { position: [number, number, number], color: string, shape: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });

  const ShapeComponent = shape === 'dodecahedron' ? Dodecahedron : Octahedron;

  return (
    <ShapeComponent ref={meshRef} position={position} args={[1]}>
      <meshStandardMaterial color={color} wireframe />
    </ShapeComponent>
  );
};

const AboutScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 8] }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#06b6d4" />
      
      <RotatingShape position={[-2, 1, 0]} color="#8b5cf6" shape="dodecahedron" />
      <RotatingShape position={[2, -1, -2]} color="#10b981" shape="octahedron" />
    </Canvas>
  );
};

const AboutPage = () => {
  return (
    <section id="about" className="min-h-screen py-20 relative">
      <div className="absolute right-0 top-0 w-1/2 h-full">
        <AboutScene />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="space-y-6 text-gray-300">
              <p className="text-lg leading-relaxed">
                I'm a passionate full-stack developer with a love for creating immersive digital experiences. 
                My journey in tech spans over 5 years, during which I've mastered various technologies and frameworks.
              </p>
              <p className="text-lg leading-relaxed">
                I specialize in React, Node.js, and modern web technologies, always staying up-to-date with 
                the latest trends and best practices in the industry.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="bg-slate-800/50 p-4 rounded-xl border border-purple-500/20">
                  <h3 className="text-purple-400 font-semibold mb-2">Frontend</h3>
                  <p className="text-sm text-gray-400">React, TypeScript, Tailwind CSS</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl border border-cyan-500/20">
                  <h3 className="text-cyan-400 font-semibold mb-2">Backend</h3>
                  <p className="text-sm text-gray-400">Node.js, Express, PostgreSQL</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
