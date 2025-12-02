import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import logo from "../assets/Logo_wikiPi.png"
import panda from "../assets/login_panda.png"
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios"


const LoginForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", data);
      console.log("Success:", response.data);
      if (response.status === 201) {
        localStorage.setItem('token', response.data.token)
        navigate('/')
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };


  return (
    <div className="flex justify-center gap-8">
      <div className="flex justify-center items-center h-screen">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white flex flex-col justify-center items-center p-8 h-min w-min drop-shadow-2xl rounded-md">
          <img src={logo} alt="Logo" className="mb-4" />
          <fieldset className="fieldset w-[300px] p-6 gap-10">
            <legend className="fieldset-legend text-3xl font-bold">Connexion</legend>
            <div>
              <label htmlFor="email" className="label text-[16px] font-medium text-gray-800">Email</label>
              <label className="input validator">
                <input
                  {...register("email", {
                    required: "Email obligatoire",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Adresse email invalide",
                    },
                  })}
                  type="email" required placeholder="Email" name="email" />
              </label>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
              <p className="label text-gray-500 text-[14px]">Adresse email du campus</p>
            </div>
            <div>
              <label htmlFor="password" className="label text-[16px] font-medium text-gray-800">Mot de passe</label>
              <label className="input validator">
                <input
                  {...register("password", {
                    required: "Mot de passe obligatoire",
                    minLength: {
                      value: 8,
                      message: "Minimum 8 caractères",
                    },
                  })}
                  type="password" placeholder="Mot de passe" name="password" />
                <button type="button" className="hidden hover:scale-110 transition duration-150">
                  <MdOutlineRemoveRedEye />
                </button>
                <button type="button" className="hover:scale-110 transition duration-150">
                  <FaRegEyeSlash />
                </button>
              </label>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
              <div className="flex justify-between">
                <p className="label text-gray-500 text-[14px]">Mot de passe</p>
                <p className="label text-xs text-text-link">Mot de passe oublié ?</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn bg-red-primary text-white px-6 py-3 font-normal text-[16px] rounded-md w-full"
              >
                {isSubmitting ? "Chargement..." : "Connexion"}
              </button>
              <div className="flex gap-1">
                <p className="label text-gray-500 text-xs">Pas encore de compte ? </p>
                <NavLink to="/Register" className="label text-xs text-text-link"> Inscrivez-vous</NavLink>
              </div>
            </div>
          </fieldset>

        </form>
      </div>

      <div className="flex items-center">
        <img src={panda} className="w-90 lg:inline hidden" alt="image of a panda saying 'Hey welcome back'"></img>
      </div>
    </div>
  )
}

export default LoginForm