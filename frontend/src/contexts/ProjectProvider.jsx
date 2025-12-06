import { useProjects } from '../hooks/useProjects'
import { ProjectsContext } from './projects-context'

export const ProjectsProvider = ({ children }) => {
  const projectsData = useProjects()

  return (
    <ProjectsContext.Provider value={projectsData}>
      {children}
    </ProjectsContext.Provider>
  )
}