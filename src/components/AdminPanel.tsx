
import React, { useState } from 'react';
import { LogOut, Plus, Edit, Trash2, User, Briefcase, Code, X } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import { toast } from '@/hooks/use-toast';

const AdminPanel = () => {
  const { 
    logout, 
    projects, 
    skills, 
    profileInfo, 
    addProject, 
    updateProject, 
    deleteProject,
    addSkill,
    updateSkill,
    deleteSkill,
    updateProfile
  } = useAdmin();

  const [activeTab, setActiveTab] = useState('profile');
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [editingSkill, setEditingSkill] = useState<string | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showSkillForm, setShowSkillForm] = useState(false);

  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    technologies: '',
    imageUrl: '',
    projectUrl: '',
    githubUrl: '',
    category: ''
  });

  const [skillForm, setSkillForm] = useState({
    name: '',
    level: 50,
    category: ''
  });

  const [profileForm, setProfileForm] = useState(profileInfo);

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const projectData = {
      ...projectForm,
      technologies: projectForm.technologies.split(',').map(t => t.trim())
    };

    if (editingProject) {
      updateProject(editingProject, projectData);
      setEditingProject(null);
      toast({ title: "Project updated successfully!" });
    } else {
      addProject(projectData);
      toast({ title: "Project added successfully!" });
    }

    setProjectForm({
      title: '',
      description: '',
      technologies: '',
      imageUrl: '',
      projectUrl: '',
      githubUrl: '',
      category: ''
    });
    setShowProjectForm(false);
  };

  const handleSkillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSkill) {
      updateSkill(editingSkill, skillForm);
      setEditingSkill(null);
      toast({ title: "Skill updated successfully!" });
    } else {
      addSkill(skillForm);
      toast({ title: "Skill added successfully!" });
    }

    setSkillForm({ name: '', level: 50, category: '' });
    setShowSkillForm(false);
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
    toast({ title: "Profile updated successfully!" });
  };

  const startEditProject = (project: any) => {
    setProjectForm({
      ...project,
      technologies: project.technologies.join(', ')
    });
    setEditingProject(project.id);
    setShowProjectForm(true);
  };

  const startEditSkill = (skill: any) => {
    setSkillForm(skill);
    setEditingSkill(skill.id);
    setShowSkillForm(true);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-800">Admin Panel</h1>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b">
          {[
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'projects', label: 'Projects', icon: Briefcase },
            { id: 'skills', label: 'Skills', icon: Code }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 border-b-2 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-slate-600 hover:text-slate-800'
              }`}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6">Profile Information</h2>
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={profileForm.title}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Bio</label>
                <textarea
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, bio: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                ></textarea>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={profileForm.location}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">LinkedIn</label>
                  <input
                    type="url"
                    value={profileForm.linkedin}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, linkedin: e.target.value }))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">GitHub</label>
                  <input
                    type="url"
                    value={profileForm.github}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, github: e.target.value }))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Resume URL</label>
                <input
                  type="url"
                  value={profileForm.resume}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, resume: e.target.value }))}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors"
              >
                Update Profile
              </button>
            </form>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Projects</h2>
              <button
                onClick={() => setShowProjectForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors"
              >
                <Plus size={20} />
                Add Project
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(project => (
                <div key={project.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded">
                        {project.category}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditProject(project)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => {
                            deleteProject(project.id);
                            toast({ title: "Project deleted successfully!" });
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Project Form Modal */}
            {showProjectForm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
                <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">
                        {editingProject ? 'Edit Project' : 'Add New Project'}
                      </h3>
                      <button
                        onClick={() => {
                          setShowProjectForm(false);
                          setEditingProject(null);
                          setProjectForm({
                            title: '',
                            description: '',
                            technologies: '',
                            imageUrl: '',
                            projectUrl: '',
                            githubUrl: '',
                            category: ''
                          });
                        }}
                        className="p-2 hover:bg-slate-100 rounded-lg"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <form onSubmit={handleProjectSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                          <input
                            type="text"
                            value={projectForm.title}
                            onChange={(e) => setProjectForm(prev => ({ ...prev, title: e.target.value }))}
                            required
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                          <input
                            type="text"
                            value={projectForm.category}
                            onChange={(e) => setProjectForm(prev => ({ ...prev, category: e.target.value }))}
                            required
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                        <textarea
                          value={projectForm.description}
                          onChange={(e) => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                          required
                          rows={3}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        ></textarea>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Technologies (comma-separated)</label>
                        <input
                          type="text"
                          value={projectForm.technologies}
                          onChange={(e) => setProjectForm(prev => ({ ...prev, technologies: e.target.value }))}
                          required
                          placeholder="React, TypeScript, Node.js"
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Image URL</label>
                        <input
                          type="url"
                          value={projectForm.imageUrl}
                          onChange={(e) => setProjectForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                          required
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Project URL</label>
                          <input
                            type="url"
                            value={projectForm.projectUrl}
                            onChange={(e) => setProjectForm(prev => ({ ...prev, projectUrl: e.target.value }))}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">GitHub URL</label>
                          <input
                            type="url"
                            value={projectForm.githubUrl}
                            onChange={(e) => setProjectForm(prev => ({ ...prev, githubUrl: e.target.value }))}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <button
                          type="submit"
                          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors"
                        >
                          {editingProject ? 'Update Project' : 'Add Project'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowProjectForm(false);
                            setEditingProject(null);
                          }}
                          className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Skills</h2>
              <button
                onClick={() => setShowSkillForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors"
              >
                <Plus size={20} />
                Add Skill
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map(skill => (
                <div key={skill.id} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{skill.name}</h3>
                      <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded">
                        {skill.category}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditSkill(skill)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => {
                          deleteSkill(skill.id);
                          toast({ title: "Skill deleted successfully!" });
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Proficiency</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Skill Form Modal */}
            {showSkillForm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
                <div className="bg-white rounded-xl max-w-md w-full">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">
                        {editingSkill ? 'Edit Skill' : 'Add New Skill'}
                      </h3>
                      <button
                        onClick={() => {
                          setShowSkillForm(false);
                          setEditingSkill(null);
                          setSkillForm({ name: '', level: 50, category: '' });
                        }}
                        className="p-2 hover:bg-slate-100 rounded-lg"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <form onSubmit={handleSkillSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Skill Name</label>
                        <input
                          type="text"
                          value={skillForm.name}
                          onChange={(e) => setSkillForm(prev => ({ ...prev, name: e.target.value }))}
                          required
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                        <input
                          type="text"
                          value={skillForm.category}
                          onChange={(e) => setSkillForm(prev => ({ ...prev, category: e.target.value }))}
                          required
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Proficiency Level: {skillForm.level}%
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={skillForm.level}
                          onChange={(e) => setSkillForm(prev => ({ ...prev, level: parseInt(e.target.value) }))}
                          className="w-full"
                        />
                      </div>

                      <div className="flex gap-4 pt-4">
                        <button
                          type="submit"
                          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors"
                        >
                          {editingSkill ? 'Update Skill' : 'Add Skill'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowSkillForm(false);
                            setEditingSkill(null);
                          }}
                          className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
