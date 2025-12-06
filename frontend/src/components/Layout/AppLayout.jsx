import NavigationBar from "./NavigationBar"
import ProjectSidebar from "./ProjectSidebar"

const AppLayout = ({ children }) => {
  return (
    <div>
      <NavigationBar />
      <ProjectSidebar>
        {children}
      </ProjectSidebar>
    </div>
  )
}

export default AppLayout