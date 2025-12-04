import { useState } from "react"
import axios from 'axios'
import { useForm } from "react-hook-form";


const ProjetCreation = () => {
  const [description, setDescription] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting },
  } = useForm();


  const onSubmit = async (data) => {
    console.log(localStorage.getItem("token"));
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }
      const projectData = {
        title: data.title.trim(),
        description: data.description.trim() || null
      };
      const response = await axios.post('http://localhost:3000/api/projects', projectData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Projet créé:", response.data);

      if (response.status === 201) {
        console.log("Projet créé avec succès");
        window.location.reload();
      }

    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div>
      <input type="checkbox" id="projet-modal" className="modal-toggle" />
      <div className="modal backdrop-blur-lg transition-all duration-100 ease-in-out" role="dialog">
        <div className="modal-box flex flex-col justify-center items-center bg-white rounded-2xl shadow-lg p-10 w-[420px]">
          <h2 className="text-3xl font-bold text-center mb-6">
            Créer un projet
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-800">
                Intitulé du projet *
              </label>
              <input
                {...register("title", { required: "Intitulé du projet obligatoire" })}
                type="text"
                required
                placeholder="Intitulé du projet"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-800">
                Description
              </label>
              <textarea
                {...register("description")}
                required
                placeholder="Description"
                maxLength={350}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm h-24 resize-none"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description.message}</p>
              )}
              <p className="text-xs text-gray-500 text-right">
                {description.length}/350 caractères
              </p>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-md mt-2 transition-colors">
              {isSubmitting ? "Création..." : "Créer le projet"}
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
