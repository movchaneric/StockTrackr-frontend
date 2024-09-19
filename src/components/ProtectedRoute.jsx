import { useNavigate } from "react-router-dom";
import { useUser } from "../features/login/hooks/useUser";
import { useEffect } from "react";
import Spinner from "./Spinner";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  // 1.Load current logged-in user
  const { user, isLoading } = useUser();

  // 2. If no loggedin user then navigate to /login
  useEffect(() => {
    if (!user && !isLoading) navigate("/login");
  }, [user, isLoading, navigate]);

  // 3. If user is loading then show spinner
  if (isLoading) return <Spinner />;

  //4. If user is loaded then show children
  if (user) return children;
};

export default ProtectedRoute;

