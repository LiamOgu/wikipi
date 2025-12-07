import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useAuthProtection } from '../hooks/useAuthProtection';
import { api } from '../api';
import AppLayout from "../components/Layout/AppLayout"
import DocumentCreationModal from "../components/Documents/DocumentCreationModal"
import ProjectCreationModal from "../components/Projects/ProjectCreationModal"
import Dashboard from "../components/Layout/Dashboard"

const Admin = () => {
  useAuthProtection();
  const { user: authUser } = useAuth(); // on récup le user qui est connexté (soi-même)
  const [users, setUsers] = useState([]); // liste des tous les users
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null); // pour les modif (roles)
  const [newRole, setNewRole] = useState('');

  // charge les données que si admin
  useEffect(() => {
    if (authUser?.user.role === 'admin') {
      fetchData();
    }
  }, [authUser]);

  const fetchData = async () => {
    try {
      const usersRes = await api.get('/api/users');
      setUsers(usersRes.data);


      try {
        const statsRes = await api.get('/api/users/admin/stats');
        setStats(statsRes.data);
      } catch (statsErr) {
        console.warn('Stats non disponibles:', statsErr);
      }
    } catch (error) {
      console.error('Erreur fetch des users:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authUser?.user.role !== 'admin') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">
          <span>Accès refusé. Vous devez être administrateur pour accéder à cette page.</span>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64">Chargement...</div>;
  }


  return (
    <AppLayout>
      <main>
        <div className="border m-6 mt-26 rounded-xl border-dashed border-gray-300 bg-white">
          <Dashboard usersList={users} stats={stats} />
        </div>
        <DocumentCreationModal />
        <ProjectCreationModal />
      </main>
    </AppLayout>
  );
};

export default Admin;