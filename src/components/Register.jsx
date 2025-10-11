import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import logo from "../assets/Logo_wikiPi.png"



const RegisterForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas ⚠️");
      return;
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white flex flex-col justify-center items-center p-8 h-min w-min drop-shadow-2xl rounded-md">
        <img src={logo} alt="Logo" className="mb-4" />
        <fieldset className="fieldset w-[300px] p-6 space-y-2">
          <legend className="fieldset-legend text-3xl font-bold">Inscription</legend>
          <div>
            <label className="label text-[16px] font-medium text-gray-800">Nom d'utilisateur</label>
            <label className="input validator">
              <input type="username" required placeholder="Nom d'utilisateur" />
            </label>
          </div>
          <div>
            <label className="label text-[16px] font-medium text-gray-800">Email</label>
            <label className="input validator">
              <input type="email" required placeholder="Email" />
            </label>
            <p className="label text-gray-500 text-[14px]">Adresse email du campus</p>
            <p className="validator-hint hidden">Veuillez rentrer une adresse email valide.</p>
          </div>
          <div>
            <label className="label text-[16px] font-medium text-gray-800">Mot de passe</label>
            <label className="input validator">
              <input type="password" required placeholder="Mot de passe" minlength="8" name="password"/>
              <button type="button" className="hidden hover:scale-110 transition duration-150">
                <MdOutlineRemoveRedEye />
              </button>
              <button type="button" className="hover:scale-110 transition duration-150">
                <FaRegEyeSlash />
              </button>
            </label>
            <p className="validator-hint hidden">Votre mot de passe doit faire au moins 8 caractères</p>
          </div>
          <div>
            <label className="label text-[16px] font-medium text-gray-800">Confirmation du mot de passe</label>
            <label className="input validator">
              <input type="password" required placeholder="Confirmation du mot de passe" minlength="8" name="confirmPassword"/>
              <button type="button" className="hidden hover:scale-110 transition duration-150">
                <MdOutlineRemoveRedEye />
              </button>
              <button type="button" className="hover:scale-110 transition duration-150">
                <FaRegEyeSlash />
              </button>
            </label>
            <p className="validator-hint hidden">Le mot de passe ne correspond pas.</p>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <button type="submit" className="btn bg-red-600 text-white px-6 py-3 font-normal text-[16px] rounded-md w-full">Inscription</button>
            <div className="flex gap-1">
              <p className="label text-gray-500 text-xs">Déja un compte ?</p>
              <p className="label text-xs text-blue-500">Connectez-vous</p>
            </div>
          </div>
        </fieldset>

      </form>
    </div>
  )
}

export default RegisterForm
