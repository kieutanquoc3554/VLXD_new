import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${apiUrl}/api/auth/check-auth`, {
          withCredentials: true,
        });
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        console.log(error);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) return null;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
