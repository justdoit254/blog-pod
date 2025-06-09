import { createContext, useState, useEffect } from "react";
import authService from "../services/auth";

export const AuthContext = createContext({
  isLoggedIn: false,
  userData: {},
  loading: true,
});

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async (params) => {
      try {
        const userInfo = await authService.getCurrentUser();
        if (userInfo) {
          setIsLoggedIn(true);
          setUserData(userInfo);
        }
      } catch (error) {
        console.error("Error: ", error);
        setIsLoggedIn(false);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
