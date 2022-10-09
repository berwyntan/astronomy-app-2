import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RequireAuth() {
    const { authDetails } = useAuth();
    const location = useLocation();

    return (        
        
            authDetails?.userName 
                ? <Outlet />
                : <Navigate to="/login" state={{ from: location }} replace={true} />
              
    )
}