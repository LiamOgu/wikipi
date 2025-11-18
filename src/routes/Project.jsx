import DocumentPage from "../components/DocumentPage"
import { useSearchParams } from "react-router-dom"
import docData from '../data/documentationsData.js'
import projetData from '../data/projetsData.js'

const Project = () => {
  const [searchParams] = useSearchParams()
  const title = searchParams.get("title")
  const doc = searchParams.get("doc")
  const product = projetData.projet.find(product => product.title === title)
  const documentation = docData.documentation.find(documentation => documentation.title === doc)
  return (
    <div>
      <h1>{product ? product.title : "Projet inconnu"}</h1>
      <h2>{documentation ? documentation.title : "Documentation inconnue"}</h2>
      <p>{documentation ? documentation.content : "Contenu indisponible"}</p>
    </div>
  )
}

export default Project