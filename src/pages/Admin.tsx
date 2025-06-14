
import React from 'react';
import { useAdmin } from '../contexts/AdminContext';
import AdminLogin from '../components/AdminLogin';
import AdminPanel from '../components/AdminPanel';

const Admin = () => {
  const { isAuthenticated } = useAdmin();

  return isAuthenticated ? <AdminPanel /> : <AdminLogin />;
};

export default Admin;
