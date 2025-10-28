import React, { useState } from "react";

const DocumentCreation = () => {
  const [description, setDescription] = useState("");
  return (
    <div>
      <input type="checkbox" id="doc-modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box flex flex-col justify-center items-center bg-white rounded-2xl shadow-lg p-10 w-[420px]">
          <h2 className="text-2xl font-bold text-center mb-6">
            Créer une documentation
          </h2>
          <form method="" className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-800">
                Source du projet
              </label>
              <select
                defaultValue="Source du projet"
                className="select select-neutral validator"
                required
              >
                <option selected value="" className="text-text-terciary">Source du projet</option>
                <option>Projet Labo 1</option>
                <option>Projet Labo 2</option>
                <option>Projet Labo 3</option>
              </select>
              <p className="text-xs text-gray-500">
                Depuis quel projet créer la documentation ?
              </p>
              <p className="validator-hint">Required</p>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-800">
                Intitulé de la documentation *
              </label>
              <input
                type="text"
                required
                placeholder="Intitulé de la documentation"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-800">
                Description
              </label>
              <textarea
                required
                placeholder="Description"
                maxLength={350}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm h-24 resize-none"
              />
              <p className="text-xs text-gray-500 text-right">
                {description.length}/350 caractères
              </p>
            </div>
            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-md mt-2 transition-colors">
              Créer la documentation
            </button>
          </form>
          <label className="modal-backdrop" htmlFor="doc-modal">Close</label>
        </div>
        <label className="modal-backdrop" htmlFor="doc-modal">Close</label>
      </div>
      {/* <input type="checkbox" id="doc-modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box flex justify-center items-center min-h-screen bg-gray-100">
          <div className="bg-white rounded-2xl shadow-lg p-10 w-[420px]">
            <h2 className="text-2xl font-bold text-center mb-6">
              Créer une documentation
            </h2>
            <form method="" className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-800">
                  Source du projet
                </label>
                <select
                  defaultValue="Source du projet"
                  className="select select-neutral validator"
                  required
                >
                  <option selected value="" className="text-text-terciary">Source du projet</option>
                  <option>Projet Labo 1</option>
                  <option>Projet Labo 2</option>
                  <option>Projet Labo 3</option>
                </select>
                <p className="text-xs text-gray-500">
                  Depuis quel projet créer la documentation ?
                </p>
                <p className="validator-hint">Required</p>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-800">
                  Intitulé de la documentation *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Intitulé de la documentation"
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-800">
                  Description
                </label>
                <textarea
                  required
                  placeholder="Description"
                  maxLength={350}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm h-24 resize-none"
                />
                <p className="text-xs text-gray-500 text-right">
                  {description.length}/350 caractères
                </p>
              </div>
              <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-md mt-2 transition-colors">
                Créer la documentation
              </button>
            </form>
            <label className="modal-backdrop" htmlFor="doc-modal">Close</label>
          </div>
        </div>
      </div> */}
    </div >
  );
};

export default DocumentCreation;
