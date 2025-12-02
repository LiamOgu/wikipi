import projetsData from "../data/projetsData.js";
import documentationData from "../data/documentationsData.js";
import { MdAdd } from "react-icons/md";
import { FaRegFolderClosed } from "react-icons/fa6";
import { NavLink, useNavigate } from 'react-router-dom';

const SidebarProjet = ({ id }) => {
  const navigate = useNavigate();
  const projet = projetsData.projet.find(p => p.id === id);

  if (!projet) {
    return <li>Projet introuvable (id: {id})</li>;
  }

  const docs = projet.documentations
    .map(docRef => documentationData.documentation.find(d => d.id === docRef.id))
    .filter(Boolean);

  const handleNewDoc = () => {
    navigate(`?nouvelleDoc=${id}`);
  };

  return (
    <li>
      <details>
        <summary>
          <FaRegFolderClosed /> {projet.title}
        </summary>
        <ul>
          <li>
            <label htmlFor="doc-modal" className="btn" onClick={handleNewDoc}>
              <MdAdd /> Nouvelle Documentation
            </label>
          </li>

          {docs.map(doc => (
            <li key={doc.id}>
              <a>{doc.title}</a>
            </li>
          ))}
        </ul>
      </details>
    </li>
  );
};

export default SidebarProjet;
