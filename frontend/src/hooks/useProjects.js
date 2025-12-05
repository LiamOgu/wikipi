import { useState, useCallback } from "react";
import { api } from "../api";

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentProject, setCurrentProject] = useState(null);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get("/api/projects");
      const projectsData = response.data.projects || [];
      setProjects(projectsData);
      return projectsData;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Erreur lors du chargement des projets";
      setError(errorMessage);
      console.error("Erreur chargement projets:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const loadProject = useCallback(async (projectId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/api/projects/${projectId}`);
      const projectData = response.data.project;
      setCurrentProject(projectData);
      return projectData;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        `Erreur lors du chargement du projet ${projectId}`;
      setError(errorMessage);
      console.error("Erreur chargement projet:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createProject = useCallback(async (projectData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/api/projects", projectData);

      let newProject;

      if (response.data.project) {
        newProject = response.data.project;
      } else if (response.data.id || response.data._id) {
        newProject = response.data;
      } else {
        newProject = {
          ...projectData,
          id: response.data.id || Date.now(),
        };
      }

      if (!newProject.id && newProject._id) {
        newProject = { ...newProject, id: newProject._id };
      }

      console.log("Projet à ajouter:", newProject);

      setProjects((prev) => [...prev, newProject]);
      return newProject;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Erreur lors de la création du projet";
      setError(errorMessage);
      console.error("Erreur création projet:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProject = useCallback(
    async (projectId, projectData) => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.put(
          `/api/projects/${projectId}`,
          projectData
        );
        const updatedProject = response.data.project;

        setProjects((prev) =>
          prev.map((p) => (p.id === projectId ? updatedProject : p))
        );

        if (currentProject?.id === projectId) {
          setCurrentProject(updatedProject);
        }

        return updatedProject;
      } catch (err) {
        const errorMessage =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Erreur lors de la mise à jour du projet";
        setError(errorMessage);
        console.error("Erreur mise à jour projet:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [currentProject]
  );

  const deleteProject = useCallback(
    async (projectId) => {
      setLoading(true);
      setError(null);

      try {
        await api.delete(`/api/projects/${projectId}`);

        setProjects((prev) => prev.filter((p) => p.id !== projectId));

        if (currentProject?.id === projectId) {
          setCurrentProject(null);
        }

        return true;
      } catch (err) {
        const errorMessage =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Erreur lors de la suppression du projet";
        setError(errorMessage);
        console.error("Erreur suppression projet:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [currentProject]
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
