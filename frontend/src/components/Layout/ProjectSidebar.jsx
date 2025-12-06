import { useState, useEffect } from 'react'
import ProjectList from '../Projects/ProjectList'
import ProjectSearch from '../Projects/ProjectSearch'
import { useProjectsContext } from '../../hooks/useProjectsContext'

const ProjectSidebar = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const { projects, loading, error, loadProjects } = useProjectsContext()

  useEffect(() => {
    if (projects.length === 0) {
      loadProjects()
    }
  }, [loadProjects, projects.length])

  return (
    <div className="drawer z-40 lg:drawer-open">
      <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {children}
      </div>

      <div className="drawer-side mt-20">
        <label htmlFor="sidebar-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

        <div className="menu bg-base-200 min-h-full w-80 p-4">
          <ProjectSearch onSearch={setSearchTerm} />

          <ul className="menu bg-base-200 rounded-box w-9/10">
            <li>
              <label
                htmlFor="project-modal" className="btn flex justify-start w-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Nouveau Projet
              </label>
            </li>

            <ProjectList
              projects={projects}
              loading={loading}
              error={error}
              searchTerm={searchTerm}
            />
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProjectSidebar