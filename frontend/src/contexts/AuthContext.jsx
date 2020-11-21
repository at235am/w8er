import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { auth, createRestaurantProfile, db } from "../firebase";
import { sidebarNav } from "../recoil/SidebarNav";
import { themeState } from "../recoil/ThemeState";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [theme, setTheme] = useRecoilState(themeState);
  const [minMode, setMinMode] = useRecoilState(sidebarNav);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      // console.log(user);
      let resRef = await createRestaurantProfile(user);

      if (user) {
        let dataRef = await resRef.get();
        let { minMode, theme } = dataRef.data();
        setTheme(theme);
        setMinMode(minMode);
      }
      // setLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ currentUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
