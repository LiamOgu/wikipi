import { useState, useCallback } from "react";
import { api } from "../api";

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentProject, setCurrentProject] = useState(null);

  const handleError = useCallback((err, defaultMessage) => {
    const errorMessage =
      err.response?.data?.message ||
      err.response?.data?.error ||
      defaultMessage;
    setError(errorMessage);
    console.error(defaultMessage, err);
    throw err;
  }, []);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get("/api/projects");
      const projectsData = response.data.projects || [];
      setProjects(projectsData);
      return projectsData;
    } catch (err) {
      return handleError(err, "Erreur lors du chargement des projets");
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const loadProject = useCallback(
    async (projectId) => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/api/projects/${projectId}`);
        const projectData = response.data.project;
        setCurrentProject(projectData);
        return projectData;
      } catch (err) {
        return handleError(
          err,
          `Erreur lors du chargement du projet ${projectId}`
        );
      } finally {
        setLoading(false);
      }
    },
    [handleError]
  );

  const createProject = useCallback(
    async (projectData) => {
      setLoading(true);
      setError(null);

      try {
        await api.post("/api/projects", projectData);

        window.location.reload();
      } catch (err) {
        return handleError(err, "Erreur lors de la création du projet");
      } finally {
        setLoading(false);
      }
    },
    [handleError]
  );

  const updateProject = useCallback(
    async (projectId, projectData) => {
      setLoading(true);
      setError(null);

      try {
        await api.put(`/api/projects/${projectId}`, projectData);

        window.location.reload();
      } catch (err) {
        return handleError(err, "Erreur lors de la mise à jour du projet");
      } finally {
        setLoading(false);
      }
    },
    [handleError]
  );

  const deleteProject = useCallback(
    async (projectId) => {
      setLoading(true);
      setError(null);

      try {
        await api.delete(`/api/projects/${projectId}`);

        window.location.reload();
      } catch (err) {
        return handleError(err, "Erreur lors de la suppression du projet");
      } finally {
        setLoading(false);
      }
    },
    [handleError]
  );

  const getProjectById = useCallback(
    (projectId) => {
      return projects.find((project) => project.id === projectId);
    },
    [projects]
  );

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return {
    projects,
    currentProject,
    loading,
    error,

    loadProjects,
    loadProject,
    createProject,
    updateProject,
    deleteProject,
    getProjectById,
    resetError,
    setCurrentProject,
  };
};
