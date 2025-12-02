import { useState, useEffect, useRef } from "react";
import projetsData from '../data/projetsData.js'
import { useSearchParams } from 'react-router-dom';

const DocumentCreation = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const projetId = searchParams.get('nouvelleDoc');
  const projets = projetsData.projet;

  const modalCheckboxRef = useRef(null);

  const [selectedProject, setSelectedProject] = useState("Source du projet");

  const [description, setDescription] = useState("");

  useEffect(() => {
    if (projetId && modalCheckboxRef.current) {
      modalCheckboxRef.current.checked = true;

      const projetTrouve = projets.find(p => p.id.toString() === projetId);

      if (projetTrouve) {
        setSelectedProject(projetTrouve.title);
      }
    } else if (modalCheckboxRef.current) {
      modalCheckboxRef.current.checked = false;
    }
  }, [projetId, projets]);

  const handleCloseModal = () => {
    setSearchParams({});
    if (modalCheckboxRef.current) {
      modalCheckboxRef.current.checked = false;
    }
    setDescription("");
  };

  return (
    <div>
      <input
        ref={modalCheckboxRef}
        type="checkbox"
        id="doc-modal"
        className="modal-toggle"
      />

      <div className="modal backdrop-blur-lg transition-all duration-100 ease-in-out" role="dialog">
        <div className="modal-box flex flex-col justify-center items-center bg-white rounded-2xl shadow-lg p-10 w-[420px]">
          <h2 className="text-2xl font-bold text-center mb-6">
            Créer une documentation
          </h2>

          <form method="" className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-800">
                Source du projet
              </label>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="select select-neutral validator"
                required
              >
                <option value="Source du projet" className="text-text-terciary">
                  Source du projet
                </option>
                {projets.map((projet) => (
                  <option key={projet.id} value={projet.title}>
                    {projet.title}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500">
                Depuis quel projet créer la documentation ?
              </p>
              <p className="validator-hint">Required</p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-800">
                Intitulé de la documentation *
              </label>
              <input
                type="text"
                required
                placeholder="Intitulé de la documentation"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-800">
                Description
              </label>
              <textarea
                required
                placeholder="Description"
                maxLength={350}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm h-24 resize-none"
              />
              <p className="text-xs text-gray-500 text-right">
                {description.length}/350 caractères
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-md transition-colors"
              >
                Créer la documentation
              </button>
            </div>
          </form>
        </div>
        <label
          className="modal-backdrop"
          htmlFor="doc-modal"
          onClick={handleCloseModal}
        >
          Close
        </label>
      </div>
    </div>
  );
};

export default DocumentCreation;