
import React from 'react';

const SkillsSection = () => {
  const skills = [
    { id: 1, name: "React", level: 90, category: "Frontend" },
    { id: 2, name: "TypeScript", level: 85, category: "Frontend" },
    { id: 3, name: "Tailwind CSS", level: 95, category: "Frontend" },
    { id: 4, name: "Node.js", level: 80, category: "Backend" },
    { id: 5, name: "Express", level: 75, category: "Backend" },
    { id: 6, name: "MongoDB", level: 70, category: "Backend" },
    { id: 7, name: "Three.js", level: 65, category: "3D/Graphics" },
    { id: 8, name: "WebGL", level: 60, category: "3D/Graphics" }
  ];
  
  const skillCategories = Array.from(new Set(skills.map(s => s.category)));

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Skills & Expertise</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map(category => (
            <div key={category} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">{category}</h3>
              <div className="space-y-4">
                {skills
                  .filter(skill => skill.category === category)
                  .map(skill => (
                    <div key={skill.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-slate-700">{skill.name}</span>
                        <span className="text-sm text-slate-500">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
