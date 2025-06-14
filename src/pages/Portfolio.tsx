
import React from 'react';
import HeroSection from '../components/HeroSection';
import ProjectsSection from '../components/ProjectsSection';
import SkillsSection from '../components/SkillsSection';
import ContactSection from '../components/ContactSection';

const Portfolio = () => {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8 text-center">
        <p>&copy; 2024 Alex Johnson. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Portfolio;
