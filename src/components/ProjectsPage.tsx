import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, Ring } from '@react-three/drei';
import { ExternalLink, Github } from 'lucide-react';
import * as THREE from 'three';

const ProjectShape = ({ position, color }: { position: [number, number, number], color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group>
      <Icosahedron ref={meshRef} position={position} args={[1]}>
        <meshStandardMaterial color={color} wireframe />
      </Icosahedron>
      <Ring position={[position[0], position[1], position[2] + 0.5]} args={[1.5, 2, 32]}>
        <meshStandardMaterial color={color} opacity={0.3} transparent />
      </Ring>
    </group>
  );
};

const ProjectsScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 12] }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#10b981" />
      
      <ProjectShape position={[-4, 2, 0]} color="#8b5cf6" />
      <ProjectShape position={[4, -2, -3]} color="#06b6d4" />
      <ProjectShape position={[0, 0, -6]} color="#ec4899" />
    </Canvas>
  );
};

const ProjectsPage = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React and Node.js",
      image: "/placeholder.svg",
      tech: ["React", "Node.js", "MongoDB"],
      demo: "#",
      github: "#"
    },
    {
      title: "3D Portfolio Website",
      description: "Interactive 3D portfolio with Three.js animations",
      image: "/placeholder.svg",
      tech: ["React", "Three.js", "WebGL"],
      demo: "#",
      github: "#"
    },
    {
      title: "Task Management App",
      description: "Collaborative task management with real-time updates",
      image: "/placeholder.svg",
      tech: ["React", "Firebase", "Material-UI"],
      demo: "#",
      github: "#"
    }
  ];

  return (
    <section id="projects" className="min-h-screen py-20 relative">
      <div className="absolute right-0 top-0 w-1/3 h-full opacity-30">
        <ProjectsScene />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
          Projects
        </h2>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="bg-slate-800/40 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <div className="h-48 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                <div className="text-4xl">🚀</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-white">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-slate-700/50 text-cyan-400 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.demo}
                    className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <ExternalLink size={16} />
                    Demo
                  </a>
                  <a
                    href={project.github}
                    className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <Github size={16} />
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsPage;
