import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthService from "../../service/AuthService";
import { NavBar } from "../../components/NavBav";

export function AuthenticatedRoutes() {
    const isAuthenticated = AuthService.isAuthenticated();
    const location = useLocation();
  
    return isAuthenticated ? (
      <>
        <NavBar />
        <Outlet />
      </>
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  }