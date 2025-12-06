import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import AppLayout from "../components/Layout/AppLayout"
import DocumentPage from "../components/Documents/DocumentPage"
import DocumentCreationModal from "../components/Documents/DocumentCreationModal"
import ProjectCreationModal from "../components/Projects/ProjectCreationModal"
import { useProjectsContext } from "../hooks/useProjectsContext"
import { useDocumentationsContext } from "../hooks/useDocumentationsContext"

const Project = () => {
  const { projectId, docId } = useParams()

  const {
    projects,
    loading: projectsLoading,
    error: projectsError,
    loadProject
  } = useProjectsContext()

  const {
    currentDocumentation,
    loading: docsLoading,
    error: docsError,
    loadDocumentation
  } = useDocumentationsContext()

  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)

    const fetchData = async () => {
      try {
        setLoading(true)

        let currentProject = projects.find(p => p.id.toString() === projectId)

        if (!currentProject && projectId) {
          currentProject = await loadProject(projectId)
        }

        setProject(currentProject)

        if (docId) {
          await loadDocumentation(docId)
        }

      } catch (err) {
        console.error("Erreur chargement données:", err)
        setError(err.message || "Erreur lors du chargement des données")
      } finally {
        setLoading(false)
      }
    }

    if (projectId) {
      fetchData()
    }
  }, [projectId, docId, projects, loadProject, loadDocumentation])

  const isLoading = loading || projectsLoading || docsLoading
  const hasError = error || projectsError || docsError

  if (isLoading) {
    return (
      <AppLayout>
        <main className="p-6 mt-30 mx-5 flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
          <span className="ml-4">Chargement...</span>
        </main>
      </AppLayout>
    )
  }

  if (hasError) {
    return (
      <AppLayout>
        <main className="p-6 mt-30 mx-5">
          <div className="alert alert-error">
            {error || projectsError || docsError}
          </div>
        </main>
      </AppLayout>
    )
  }

  if (!project) {
    return (
      <AppLayout>
        <main className="p-6 mt-30 mx-5">
          <div className="alert alert-warning">
            Projet non trouvé
          </div>
        </main>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <main>
        <DocumentPage project={project} documentation={currentDocumentation} />
        <DocumentCreationModal />
        <ProjectCreationModal />
      </main>
    </AppLayout>
  )
}

export default Project