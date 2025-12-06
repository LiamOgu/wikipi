import { useState } from "react"
import { useForm } from "react-hook-form"
import { useProjectsContext } from '../hooks/useProjectsContext'

const ProjetCreation = () => {
  const [description, setDescription] = useState("")
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  const { createProject } = useProjectsContext()

  const onSubmit = async (data) => {
    try {
      await createProject({
        title: data.title,
        description: data.description
      })
    } catch (error) {
      console.error(error)
    }
  }

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

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-md mt-2 transition-colors">
              {isSubmitting ? "Création..." : "Créer le projet"}
            </button>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="projet-modal">Close</label>
      </div>
    </div>
  )
}

export default ProjetCreation