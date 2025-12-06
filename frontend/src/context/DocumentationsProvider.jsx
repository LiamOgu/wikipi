import { useDocumentations } from '../hooks/useDocumentations'
import { DocumentationsContext } from './documentations-context'

export const DocumentationsProvider = ({ children }) => {
  const DocsData = useDocumentations()

  return (
    <DocumentationsContext.Provider value={DocsData}>
      {children}
    </DocumentationsContext.Provider>
  )
}