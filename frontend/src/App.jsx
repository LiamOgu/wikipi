import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './routes/Home'
import Login from './routes/Login'
import Register from './routes/Register'
import Project from './routes/Project'
import Admin from './routes/Admin';
import { AuthProvider } from './contexts/AuthProvider'
import { ProjectsProvider } from './contexts/ProjectProvider'
import { DocumentationsProvider } from './contexts/DocumentationsProvider'

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectsProvider>
          <DocumentationsProvider>
            <Routes>
              <Route path="/admin" element={<Admin />} />
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/project" element={<Project />} />
              <Route path="/project/:projectId/documentation/:docId" element={<Project />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </DocumentationsProvider>
        </ProjectsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App