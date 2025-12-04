import documentationData from "../data/documentationsData.js";
import { MdAdd } from "react-icons/md";
import { FaRegFolderClosed } from "react-icons/fa6";
import { NavLink, useSearchParams } from 'react-router-dom';

const SidebarProjet = ({ projet }) => {  // Reçoit l'objet projet directement
  const [searchParams, setSearchParams] = useSearchParams();

  const docs = projet.documentations
    .map(docRef => documentationData.documentation.find(d => d.id === docRef.id))
    .filter(Boolean);

  const handleNewDoc = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('nouvelleDoc', projet.id);
    setSearchParams(newParams);
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
