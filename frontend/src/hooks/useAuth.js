import { useContext } from "react";
import { AuthContext } from "../contexts/auth-context";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }

  return context;
};
