import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const token = useAuthStore((state) => state.token);
    const user = useAuthStore((state) => state.user);
    return token && user ? <>{children}</> : <Navigate to="/login" />;
  };

export default PrivateRoute;