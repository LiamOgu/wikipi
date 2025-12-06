import { useState, useCallback } from "react";
import { api } from "../api";

export const useDocumentations = () => {
  const [documentations, setDocumentations] = useState([]);
  const [projectDocumentations, setProjectDocumentations] = useState([]);
  const [currentDocumentation, setCurrentDocumentation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleError = useCallback((err, defaultMessage) => {
    const errorMessage =
      err.response?.data?.message ||
      err.response?.data?.error ||
      defaultMessage;
    setError(errorMessage);
    console.error(defaultMessage, err);
    throw err;
  }, []);

  const loadDocumentations = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get("/api/documentations");
      const docs = response.data.documentations || [];
      setDocumentations(docs);
      return docs;
    } catch (err) {
      return handleError(err, "Erreur lors du chargement des documentations");
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const loadProjectDocumentations = useCallback(
    async (projectId) => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(
          `/api/documentations/projects/${projectId}/documentations`
        );
        const docs = response.data.documentations || [];
        setProjectDocumentations(docs);
        return docs;
      } catch (err) {
        return handleError(
          err,
          `Erreur lors du chargement des documentations du projet ${projectId}`
        );
      } finally {
        setLoading(false);
      }
    },
    [handleError]
  );

  const loadDocumentation = useCallback(
    async (docId) => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/api/documentations/${docId}`);
        const doc = response.data.documentation;
        setCurrentDocumentation(doc);
        return doc;
      } catch (err) {
        return handleError(
          err,
          `Erreur lors du chargement de la documentation ${docId}`
        );
      } finally {
        setLoading(false);
      }
    },
    [handleError]
  );

  const createDocumentation = useCallback(
    async (projectId, documentationData) => {
      setLoading(true);
      setError(null);

      try {
        await api.post(
          `/api/documentations/projects/${projectId}/documentations`,
          documentationData
        );

        window.location.reload();
      } catch (err) {
        return handleError(
          err,
          "Erreur lors de la création de la documentation"
        );
      } finally {
        setLoading(false);
      }
    },
    [handleError]
  );

  const updateDocumentation = useCallback(
    async (docId, docData) => {
      setLoading(true);
      setError(null);

      try {
        await api.put(`/api/documentations/${docId}`, docData);

        window.location.reload();
      } catch (err) {
        return handleError(
          err,
          `Erreur lors de la modification de la documentation ${docId}`
        );
      } finally {
        setLoading(false);
      }
    },
    [handleError]
  );

  const deleteDocumentation = useCallback(
    async (docId) => {
      setLoading(true);
      setError(null);

      try {
        await api.delete(`/api/documentations/${docId}`);

        window.location.reload();
      } catch (err) {
        return handleError(
          err,
          `Erreur lors de la suppression de la documentation ${docId}`
        );
      } finally {
        setLoading(false);
      }
    },
    [handleError]
  );

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return {
    documentations,
    projectDocumentations,
    currentDocumentation,
    loading,
    error,

    loadDocumentations,
    loadProjectDocumentations,
    loadDocumentation,
    createDocumentation,
    updateDocumentation,
    deleteDocumentation,
    resetError,
  };
};
