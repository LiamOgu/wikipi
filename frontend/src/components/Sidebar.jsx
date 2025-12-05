import { useState, useEffect } from 'react'
import { MdAdd } from 'react-icons/md'
import Loupe from "./Loupe"
import SidebarProjet from "./SidebarProjet"
import { useProjectsContext } from '../hooks/useProjectsContext'

const Sidebar = ({ children }) => {
  const [filteredProjects, setFilteredProjects] = useState([])

  const { projects, loading, error, loadProjects } = useProjectsContext()

  useEffect(() => {
    if (projects.length === 0) {
      loadProjects()
    }
  }, [loadProjects, projects.length])

  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase()

    if (!searchTerm.trim()) {
      setFilteredProjects(projects)
    } else {
      const filtered = projects.filter(project =>
        project.title.toLowerCase().includes(searchTerm)
      )
      setFilteredProjects(filtered)
    }
  }

  useEffect(() => {
    setFilteredProjects(projects)
  }, [projects])

  return (
    <div>
      <div className="drawer z-40 lg:drawer-open">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">{children}</div>

        <div className="drawer-side mt-20">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <ul className="menu bg-base-200 min-h-full w-80 p-4">
            {/* Search bar */}
            <label className="flex justify-between w-9/10 rounded-box border border-gray-300">
              <div className="flex items-center gap-2 mx-2">
                <Loupe strokeColor="black" />
              </div>
              <input
                className="appearance-none pl-2"
                type="text"
                required
                placeholder="Search"
                onChange={handleFilter}
              />
              <button className="btn btn-square join-item bg-red-primary hover:bg-red-secondary rounded-e-box">
                <Loupe strokeColor="white" />
              </button>
            </label>

            <ul className="menu bg-base-200 rounded-box w-9/10">
              <li>
                <label htmlFor="project-modal" className="btn flex justify-start w-full mb-4">
                  <MdAdd /> Nouveau Projet
                </label>
              </li>

              {loading && (
                <li className="text-gray-500 italic text-center py-4">
                  Chargement des projets...
                </li>
              )}

              {error && (
                <li className="text-red-500 italic text-center py-4">
                  {error}
                </li>
              )}

              {!loading && !error && filteredProjects.length === 0 ? (
                <li className="text-gray-500 italic text-center py-4">
                  Aucun projet trouvé
                </li>
              ) : (
                filteredProjects.map(project => (
                  <SidebarProjet
                    key={project.id}
                    project={project}
                  />
                ))
              )}
            </ul>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar