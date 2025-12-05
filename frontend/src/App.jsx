// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './routes/Home'
import Login from './routes/Login'
import Register from './routes/Register'
import Project from './routes/Project'
import { AuthProvider } from './context/AuthProvider'

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/project" element={<Project />} />
          <Route path="/project/:projectId/documentation/:docId" element={<Project />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App