const DocumentPage = ({ project, documentation }) => {
  return (
    <div>
      <main className="p-6 mt-30 mx-5 border-1 border-dashed border-gray-200 rounded">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">{project?.title || "Projet inconnu"}</h1>
            <h2 className="text-3xl font-bold">{documentation?.title || "Documentation inconnue"}</h2>
          </div>
          {documentation && (
            <button className="text-blue-500 hover:cursor-pointer hover:underline">
              Soumettre une modification
            </button>
          )}
        </div>

        <p>{documentation?.content || "Pas de description pour le moment"}</p>

        <div className="mt-8 pt-6 border-t flex gap-4 text-sm text-gray-600">
          {documentation && (
            <>
              <span>Projet: {project?.title}</span>
              <span>Dernière modification: {new Date(documentation.updated_at).toLocaleDateString('fr-FR')}</span>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default DocumentPage