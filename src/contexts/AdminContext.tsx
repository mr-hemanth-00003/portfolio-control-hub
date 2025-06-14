
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  projectUrl: string;
  githubUrl: string;
  category: string;
}

interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
}

interface ProfileInfo {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  resume: string;
}

interface AdminContextType {
  isAuthenticated: boolean;
  projects: Project[];
  skills: Skill[];
  profileInfo: ProfileInfo;
  login: (password: string) => boolean;
  logout: () => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Omit<Project, 'id'>) => void;
  deleteProject: (id: string) => void;
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (id: string, skill: Omit<Skill, 'id'>) => void;
  deleteSkill: (id: string) => void;
  updateProfile: (profile: ProfileInfo) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_PASSWORD = 'admin123'; // In a real app, this would be handled securely

const initialProjects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with React, Node.js, and PostgreSQL',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
    projectUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    category: 'Full Stack'
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates',
    technologies: ['React', 'Firebase', 'Material-UI'],
    imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=800&q=80',
    projectUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    category: 'Frontend'
  },
  {
    id: '3',
    title: 'AI Chat Assistant',
    description: 'An intelligent chatbot powered by OpenAI API with custom training',
    technologies: ['Python', 'OpenAI API', 'Flask', 'React'],
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    projectUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    category: 'AI/ML'
  }
];

const initialSkills: Skill[] = [
  { id: '1', name: 'React', level: 90, category: 'Frontend' },
  { id: '2', name: 'TypeScript', level: 85, category: 'Frontend' },
  { id: '3', name: 'Node.js', level: 80, category: 'Backend' },
  { id: '4', name: 'Python', level: 75, category: 'Backend' },
  { id: '5', name: 'PostgreSQL', level: 70, category: 'Database' },
  { id: '6', name: 'AWS', level: 65, category: 'Cloud' }
];

const initialProfile: ProfileInfo = {
  name: 'Alex Johnson',
  title: 'Full Stack Developer',
  bio: 'Passionate full-stack developer with 5+ years of experience building modern web applications. I love creating efficient, scalable solutions and learning new technologies.',
  email: 'alex@example.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  linkedin: 'https://linkedin.com/in/alexjohnson',
  github: 'https://github.com/alexjohnson',
  resume: 'https://example.com/resume.pdf'
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>(initialProfile);

  useEffect(() => {
    const savedAuth = localStorage.getItem('admin-auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('admin-auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin-auth');
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = { ...project, id: Date.now().toString() };
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (id: string, project: Omit<Project, 'id'>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...project, id } : p));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const addSkill = (skill: Omit<Skill, 'id'>) => {
    const newSkill = { ...skill, id: Date.now().toString() };
    setSkills(prev => [...prev, newSkill]);
  };

  const updateSkill = (id: string, skill: Omit<Skill, 'id'>) => {
    setSkills(prev => prev.map(s => s.id === id ? { ...skill, id } : s));
  };

  const deleteSkill = (id: string) => {
    setSkills(prev => prev.filter(s => s.id !== id));
  };

  const updateProfile = (profile: ProfileInfo) => {
    setProfileInfo(profile);
  };

  const value = {
    isAuthenticated,
    projects,
    skills,
    profileInfo,
    login,
    logout,
    addProject,
    updateProject,
    deleteProject,
    addSkill,
    updateSkill,
    deleteSkill,
    updateProfile
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};
