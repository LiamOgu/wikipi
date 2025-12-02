const ProjetCreation = () => {
  return (
    <div>
      <input type="checkbox" id="projet-modal" className="modal-toggle" />
      <div className="modal backdrop-blur-lg transition-all duration-100 ease-in-out" role="dialog">
        <div className="modal-box flex flex-col justify-center items-center bg-white rounded-2xl shadow-lg p-10 w-[420px]">
          <h2 className="text-3xl font-bold text-center mb-6">
            Créer un projet
          </h2>
          <form method="" className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-800">
                Intitulé du projet *
              </label>
              <input
                type="text"
                required
                placeholder="Intitulé du projet"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-md mt-2 transition-colors">
              Créer le projet
            </button>
          </form>
          <label className="modal-backdrop" htmlFor="projet-modal">Close</label>
        </div>
        <label className="modal-backdrop" htmlFor="projet-modal">Close</label>
      </div>
    </div >
  );
};

export default ProjetCreation;
