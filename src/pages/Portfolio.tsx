
import React from 'react';
import HomePage from '../components/HomePage';
import ProjectsPage from '../components/ProjectsPage';
import AboutPage from '../components/AboutPage';
import ServicesPage from '../components/ServicesPage';
import ContactPage from '../components/ContactPage';
import Navigation from '../components/Navigation';

const Portfolio = () => {
  return (
    <div className="bg-slate-900 text-white overflow-x-hidden">
      <Navigation />
      <HomePage />
      <AboutPage />
      <ServicesPage />
      <ProjectsPage />
      <ContactPage />
    </div>
  );
};

export default Portfolio;
