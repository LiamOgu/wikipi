import { useEffect } from "react";
import DocumentCard from "./DocumentCard.jsx";
import { useDocumentationsContext } from '../../hooks/useDocumentationsContext';

const DocumentListSection = () => {
  const { documentations, loadingAll, error, loadDocumentations } = useDocumentationsContext();

  useEffect(() => {
    loadDocumentations();
  }, [loadDocumentations]);

  if (loadingAll) {
    return (
      <div className="w-full flex flex-col items-center my-10">
        <div className="w-95/100">
          <h1 className="text-4xl font-bold mb-6 text-text-primary">
            Actualités
          </h1>
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col items-center my-10">
        <div className="w-95/100">
          <h1 className="text-4xl font-bold mb-6 text-text-primary">
            Actualités
          </h1>
          <div className="alert alert-error">
            <span>{error}</span>
            <button
              onClick={loadDocumentations}
              className="btn btn-sm btn-ghost"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (documentations.length === 0) {
    return (
      <div className="w-full flex flex-col items-center my-10">
        <div className="w-95/100">
          <h1 className="text-4xl font-bold mb-6 text-text-primary">
            Actualités
          </h1>
          <div className="text-center py-10">
            <p className="text-gray-500">Aucune documentation disponible</p>
            <p className="text-sm text-gray-400 mt-2">
              Créez votre première documentation dans un projet
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center my-10">
      <div className="w-95/100">
        <h1 className="text-4xl font-bold mb-6 text-text-primary">
          Actualités
        </h1>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-95/100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {documentations.map(doc => (
              <DocumentCard
                key={doc.id}
                documentation={doc}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentListSection;