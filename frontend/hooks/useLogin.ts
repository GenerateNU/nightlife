import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { loginService, fetchUserProfileService } from "@/services/authService";

const useLogin = (email: string, password: string) => {
  const [loginError, setLoginError] = useState<string|null>(null);
  const { login, setUser } = useAuth();

  const handleLogin = async () => {
    try {
      const data = await loginService(email, password);
      login(data.token);

      const userData = await fetchUserProfileService(email, data.token);
      if (userData) {
        setUser(userData);
      }
    } catch (error) {
      console.log("Login failed:", error);
      setLoginError("Login failed. Please try again.");
    }
  };

  return { handleLogin, loginError };
};

export default useLogin;
