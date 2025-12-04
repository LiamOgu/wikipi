import { useState } from "react";
import { MdAdd } from "react-icons/md";
import { FaRegFolderClosed } from "react-icons/fa6";
import { NavLink, useSearchParams } from 'react-router-dom';
import { api } from '../api.js';

const SidebarProjet = ({ projet }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [documentations, setDocumentations] = useState([]);
  const [error, setError] = useState(null);

  // Charger les documentations quand le projet est ouvert
  const loadDocumentations = async () => {
    setError(null);

    try {
      const response = await api.get(`/api/projects/${projet.id}/documentations`);
      setDocumentations(response.data.documentations || []);
    } catch (err) {
      console.error('Erreur chargement documentations:', err);
      setError('Impossible de charger les documentations');
    }
  };

  // Charger quand le projet s'ouvre
  const handleOpen = async () => {
    if (documentations.length === 0) {
      await loadDocumentations();
    }
  };

  const handleNewDoc = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('nouvelleDoc', projet.id);
    setSearchParams(newParams);
  };

  return (
    <li>
      <details onToggle={(e) => e.target.open && handleOpen()}>
        <summary>
          <FaRegFolderClosed /> {projet.title}
        </summary>
        <ul>
          <li>
            <label htmlFor="doc-modal" className="btn" onClick={handleNewDoc}>
              <MdAdd /> Nouvelle Documentation
            </label>
          </li>

          {error && <li className="text-sm text-red-500">{error}</li>}

          {documentations.map(doc => (
            <li key={doc.id}>
              <NavLink to={`/Project?title=${projet.title}&doc=${doc.title}`}>
                {doc.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </details>
    </li>
  );
};

export default SidebarProjet;