import { useState, useEffect, useRef } from "react";
import { useSearchParams } from 'react-router-dom';
import { api } from '../api.js';

const DocumentCreation = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const projetId = searchParams.get('nouvelleDoc');

  const modalCheckboxRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState("Source du projet");
  const [description, setDescription] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const response = await api.get('/api/projects');
        setProjects(response.data.projects || []);
      } catch (err) {
        console.error('Erreur chargement projets:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  useEffect(() => {
    if (projetId && modalCheckboxRef.current) {
      modalCheckboxRef.current.checked = true;

      const projetTrouve = projects.find(p => p.id.toString() === projetId);

      if (projetTrouve) {
        setSelectedProject(projetTrouve.title);
      }
    } else if (modalCheckboxRef.current) {
      modalCheckboxRef.current.checked = false;
    }
  }, [projetId, projects]);

  const handleCloseModal = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('nouvelleDoc');
    setSearchParams(newParams);
    if (modalCheckboxRef.current) {
      modalCheckboxRef.current.checked = false;
    }
    setDescription("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const documentationData = {
      title: formData.get('title'),
      excerpt: formData.get('excerpt'),
      description: description,
      project_id: projetId
    };

    try {
      const response = await api.post(`/api/projects/${projetId}/documentations`, documentationData);
      console.log("Documentation créée:", response.data);

      if (response.status === 201) {
        handleCloseModal();
        window.location.reload();
      }
    } catch (error) {
      console.error("Erreur création documentation:", error);
      alert("Erreur lors de la création de la documentation");
    }
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

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-800">
                Source du projet
              </label>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="select select-neutral validator"
                required
                disabled={loading}
              >
                {loading ? (
                  <option>Chargement...</option>
                ) : (
                  projects.map((projet) => (
                    <option key={projet.id} value={projet.title}>
                      {projet.title}
                    </option>
                  ))
                )}
              </select>
              <p className="text-xs text-gray-500">
                Depuis quel projet créer la documentation ?
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-800">
                Intitulé de la documentation <span className="text-red-700">*</span>
              </label>
              <input
                name="title"
                type="text"
                required
                placeholder="Intitulé de la documentation"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-800">
                Extrait de la documentation
              </label>
              <textarea
                name="excerpt"
                required
                placeholder="Courte description"
                maxLength={50}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm resize-none"
              />
              <p className="text-xs text-gray-500">
                Résumer court de la documentation. (50 caractères)
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-800">
                Description
              </label>
              <textarea
                name="description"
                required
                placeholder="Description complète de la documentation"
                maxLength={350}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm h-24"
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