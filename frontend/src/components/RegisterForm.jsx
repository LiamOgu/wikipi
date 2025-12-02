import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import logo from "../assets/Logo_wikiPi.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const RegisterForm = () => {
  const {
    register, handleSubmit, formState: { errors, isSubmitting },
    watch
  } = useForm();

  const password = watch("password"); // pour comparer les mdp

  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/auth/register", data);
      console.log("Success:", response.data);
      if (response.status === 201) {
        navigate('/login')
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white flex flex-col justify-center items-center p-8 h-min w-min drop-shadow-2xl rounded-md"
      >
        <img src={logo} alt="Logo" className="mb-4" />

        <fieldset className="fieldset w-[300px] p-6 space-y-2">
          <legend className="fieldset-legend text-3xl font-bold">Inscription</legend>

          {/* USERNAME */}
          <div>
            <label className="label text-[16px] font-medium text-gray-800">
              Nom d'utilisateur
            </label>

            <label className="input validator">
              <input
                type="text"
                placeholder="Nom d'utilisateur"
                {...register("name", { required: "Nom obligatoire" })}
              />
            </label>

            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="label text-[16px] font-medium text-gray-800">Email</label>

            <label className="input validator">
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email obligatoire",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Adresse email invalide",
                  },
                })}
              />
            </label>

            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <p className="label text-gray-500 text-[14px]">
              Adresse email du campus
            </p>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="label text-[16px] font-medium text-gray-800">
              Mot de passe
            </label>

            <label className="input validator">
              <input
                type="password"
                placeholder="Mot de passe"
                {...register("password", {
                  required: "Mot de passe obligatoire",
                  minLength: {
                    value: 8,
                    message: "Minimum 8 caractères",
                  },
                })}
              />
            </label>

            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="label text-[16px] font-medium text-gray-800">
              Confirmation du mot de passe
            </label>

            <label className="input validator">
              <input
                type="password"
                placeholder="Confirmation du mot de passe"
                {...register("confirmPassword", {
                  required: "Confirmation obligatoire",
                  validate: (value) =>
                    value === password || "Les mots de passe ne correspondent pas",
                })}
              />
            </label>

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* BUTTON */}
          <div className="flex flex-col gap-2 items-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn bg-red-primary text-white px-6 py-3 font-normal text-[16px] rounded-md w-full"
            >
              {isSubmitting ? "Chargement..." : "Inscription"}
            </button>

            <div className="flex gap-1">
              <p className="label text-gray-500 text-xs">Déjà un compte ?</p>
              <NavLink to="/Login" className="label text-xs text-text-link">
                Connectez-vous
              </NavLink>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default RegisterForm;
