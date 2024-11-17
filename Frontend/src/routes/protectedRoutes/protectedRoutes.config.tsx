import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserLoginStore } from "../../store/userLoginStore";

interface IProtectedRoutesProps {
  children: React.ReactNode;
}

const ProtectedRoutes = ({ children }: IProtectedRoutesProps) => {
  const { token } = useUserLoginStore(); 
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);  

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    } else {
      setIsLoading(false);
    }

    console.log("Token encontrado: ", token);
  }, [token, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;