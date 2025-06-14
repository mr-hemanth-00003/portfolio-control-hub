
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Cylinder, Cone, Tetrahedron } from '@react-three/drei';
import * as THREE from 'three';

const ServiceShape = ({ position, color, type }: { position: [number, number, number], color: string, type: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.2;
    }
  });

  if (type === 'cylinder') {
    return (
      <Cylinder ref={meshRef} position={position}>
        <meshStandardMaterial color={color} />
      </Cylinder>
    );
  }

  if (type === 'cone') {
    return (
      <Cone ref={meshRef} position={position}>
        <meshStandardMaterial color={color} />
      </Cone>
    );
  }

  return (
    <Tetrahedron ref={meshRef} position={position}>
      <meshStandardMaterial color={color} />
    </Tetrahedron>
  );
};

const ServicesScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 10] }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 10, 5]} intensity={1} color="#f59e0b" />
      
      <ServiceShape position={[-3, 0, 0]} color="#8b5cf6" type="cylinder" />
      <ServiceShape position={[0, 0, -2]} color="#06b6d4" type="cone" />
      <ServiceShape position={[3, 0, 0]} color="#ec4899" type="tetrahedron" />
    </Canvas>
  );
};

const ServicesPage = () => {
  const services = [
    {
      title: "Web Development",
      description: "Full-stack web applications with modern technologies",
      color: "from-purple-500 to-purple-700"
    },
    {
      title: "UI/UX Design",
      description: "Beautiful and intuitive user interfaces",
      color: "from-cyan-500 to-cyan-700"
    },
    {
      title: "Mobile Apps",
      description: "Cross-platform mobile applications",
      color: "from-pink-500 to-pink-700"
    },
    {
      title: "3D Experiences",
      description: "Interactive 3D visualizations and animations",
      color: "from-amber-500 to-amber-700"
    }
  ];

  return (
    <section id="services" className="min-h-screen py-20 relative">
      <div className="absolute inset-0 opacity-20">
        <ServicesScene />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-amber-400 to-pink-400 bg-clip-text text-transparent">
          Services
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${service.color} mb-4 flex items-center justify-center`}>
                <div className="w-6 h-6 bg-white rounded opacity-80"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
