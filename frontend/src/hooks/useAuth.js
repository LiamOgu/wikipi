import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const checkAuth = useCallback(async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      navigate("/login");
      return null;
    }

    try {
      const response = await axios.get("http://localhost:3000/auth/home", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201 || response.status === 200) {
        setUser(response.data);
        return response.data;
      } else {
        throw new Error("Réponse non autorisée");
      }
    } catch (err) {
      console.error("Erreur d'authentification:", err);
      setError(err.message);
      localStorage.removeItem("token");
      navigate("/login");
      return null;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    user,
    loading,
    error,
    checkAuth,
    logout,
  };
};

export const useAuthProtection = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/auth/home", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 201 || response.status === 200) {
          setIsAuthenticated(true);
        } else {
          throw new Error("Token invalide");
        }
      } catch (err) {
        console.error("Token verification failed:", err);
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [navigate]);

  return { isAuthenticated, loading };
};
