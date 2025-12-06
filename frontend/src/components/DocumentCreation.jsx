import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from 'react-router-dom';
import { api } from '../api.js';
import { useForm } from "react-hook-form";

const DocumentCreation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const modalCheckboxRef = useRef(null);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [content, setContent] = useState("");
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
    const projetId = searchParams.get('nouvelleDoc');
    if (projetId && modalCheckboxRef.current) {
      modalCheckboxRef.current.checked = true;
      const projetExiste = projects.find(p => p.id.toString() === projetId);
      if (projetExiste) {
        setSelectedProjectId(projetId);
      }
    }
  }, [searchParams, projects]);

  const handleCloseModal = () => {
    navigate({ search: '' });
    if (modalCheckboxRef.current) {
      modalCheckboxRef.current.checked = false;
    }
    setContent("");
    setSelectedProjectId("");
  };

  const onSubmit = async (data) => {
    // Valider qu'un projet est sélectionné
    if (!selectedProjectId) {
      alert("Veuillez sélectionner un projet");
      return;
    }

    try {
      const documentData = {
        title: data.title.trim(),
        excerpt: data.excerpt.trim() || null,
        content: data.content.trim() || null,
      };

      const response = await api.post(
        `/api/documentations/projects/${selectedProjectId}/documentations`,
        documentData
      );

      if (response.status === 201) {
        console.log("Documentation créée avec succès");
        handleCloseModal();
        window.location.reload();
      }

    } catch (error) {
      console.error("Erreur création documentation:", error);
      if (error.response?.data?.message) {
        alert(`Erreur: ${error.response.data.message}`);
      } else if (error.response?.data?.error) {
        alert(`Erreur: ${error.response.data.error}`);
      } else {
        alert("Erreur lors de la création de la documentation");
      }
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

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-800">
                Projet parent <span className="text-red-700">*</span>
              </label>
              <select
                {...register("projectId", {
                  required: "Sélectionnez un projet",
                  validate: value => value !== "" || "Sélectionnez un projet"
                })}
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="select select-neutral validator"
                disabled={loading}
              >
                <option value="">Choisir un projet...</option>
                {loading ? (
                  <option disabled>Chargement des projets...</option>
                ) : (
                  projects.map((projet) => (
                    <option key={projet.id} value={projet.id}>
                      {projet.title}
                    </option>
                  ))
                )}
              </select>
              {errors.projectId && (
                <p className="text-red-500 text-sm">{errors.projectId.message}</p>
              )}
              <p className="text-xs text-gray-500">
                Sélectionnez le projet auquel lier cette documentation
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-800">
                Titre de la documentation <span className="text-red-700">*</span>
              </label>
              <input
                {...register("title", {
                  required: "Titre obligatoire",
                })}
                type="text"
                placeholder="Titre de la documentation"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-800">
                Extrait
              </label>
              <textarea
                {...register("excerpt", {
                  maxLength: {
                    value: 50,
                    message: "Maximum 50 caractères"
                  }
                })}
                placeholder="Courte description"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm resize-none"
                rows="2"
              />
              {errors.excerpt && (
                <p className="text-red-500 text-sm">{errors.excerpt.message}</p>
              )}
              <p className="text-xs text-gray-500">
                Résumé court (optionnel, max 50 caractères)
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-800">
                Contenu <span className="text-red-700">*</span>
              </label>
              <textarea
                {...register("content", {
                  required: "Contenu obligatoire",
                  maxLength: {
                    value: 10000,
                    message: "Maximum 10000 caractères"
                  }
                })}
                placeholder="Contenu de la documentation"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm min-h-32"
              />
              {errors.content && (
                <p className="text-red-500 text-sm">{errors.content.message}</p>
              )}
              <div className="flex justify-between">
                <p className="text-xs text-gray-500">
                  Contenu principal en Markdown
                </p>
                <p className="text-xs text-gray-500">
                  {content.length}/10000 caractères
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isSubmitting || !selectedProjectId}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-md transition-colors"
              >
                {isSubmitting ? "Création..." : "Créer la documentation"}
              </button>
            </div>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="doc-modal">Close</label>
      </div>
    </div>
  );
};

export default DocumentCreation;