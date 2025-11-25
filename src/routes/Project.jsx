import DocumentPage from "../components/DocumentPage"
import { useSearchParams } from "react-router-dom"
import docData from '../data/documentationsData.js'
import projetData from '../data/projetsData.js'
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

const Project = () => {
  const [searchParams] = useSearchParams()
  const title = searchParams.get("title")
  const doc = searchParams.get("doc")
  const project = projetData.projet.find(project => project.title === title)
  const documentation = docData.documentation.find(documentation => documentation.title === doc)
  return (
    <Sidebar>
      <header >
        <Navbar />
      </header>
      <main className="p-6 mt-30 mx-5 border-1 border-dashed border-gray-200 rounded">
        
        <div className="flex flex-col mb-4 md:flex-row md:gap-10">
          <h1 className="text-3xl font-bold">{project ? project.title : "Projet inconnu"}</h1>
          <h2 className="text-3xl font-bold">{documentation ? documentation.title : "Documentation inconnue"}</h2>
        </div>
        
        <p>{documentation ? documentation.content : "Contenu indisponible"}</p>
      </main>
    </Sidebar >

  )
}

export default Project