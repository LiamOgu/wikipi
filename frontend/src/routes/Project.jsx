import { useParams } from "react-router-dom";
import { api } from '../api.js';
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DocumentPage from "../components/DocumentPage.jsx";
import DocumentCreation from "../components/DocumentCreation";
import ProjetCreation from "../components/ProjetCreation";

const Project = () => {
  const { projectId, docId } = useParams();
  const [project, setProject] = useState(null);
  const [documentation, setDocumentation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        const projectResponse = await api.get(`/api/projects/${projectId}`);
        setProject(projectResponse.data.project);

        if (docId) {
          const docResponse = await api.get(`/api/documentations/${docId}`);
          setDocumentation(docResponse.data.documentation);
        }
      } catch (err) {
        console.error("Erreur chargement données:", err);
        setError("Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    };

    if (projectId) fetchData();
  }, [projectId, docId]);

  if (loading) {
    return (
      <Sidebar>
        <Navbar />
        <main className="p-6 mt-30 mx-5 flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
          <span className="ml-4">Chargement...</span>
        </main>
      </Sidebar>
    );
  }

  if (error) {
    return (
      <Sidebar>
        <Navbar />
        <main className="p-6 mt-30 mx-5">
          <div className="alert alert-error">{error}</div>
        </main>
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <header>
        <Navbar />
      </header>
      <main>
        <div>
          <DocumentPage project={project} documentation={documentation} />
        </div>
        <DocumentCreation />
        <ProjetCreation />
      </main>
    </Sidebar>

  );
};

export default Project;