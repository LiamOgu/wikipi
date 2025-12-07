import { useAuth } from "../../hooks/useAuth";
import user from "../../assets/default-user-icon.webp";

const SettingsPage = () => {
  const { user: authUser } = useAuth();

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-4xl font-bold">Paramètres</h1>
      <form className="flex flex-col gap-5">
        <h2>Changer de nom :</h2>
        <input
          type="text"
          value={authUser?.user.name || "User"}
          className="border p-2 rounded-xl border-dashed border-gray-300"
        />

        <h2>Changer mot de passe :</h2>
        <input
          type="text"
          placeholder="Nouveau mot de passe"
          className="border p-2 rounded-xl border-dashed border-gray-300"
        />
        <h2>Changer l'image de profil:</h2>
        <img src={user} alt="User Avatar" className="w-50 rounded-full" />
        <h2>Thème:</h2>
        <input
          type="checkbox"
          className="toggle border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
        />
      </form>
      
    </div>
  );
};

export default SettingsPage;
