import { createContext, useContext, useEffect, useState } from "react";
import { fetchProfileInfo } from "../services/profile.service";
import { Profile } from "../types/Profile";

const AuthContext = createContext<{
  profile: Profile | null;
  isAuthenticated: boolean;
}>({ profile: null, isAuthenticated: false });

export const AuthProvider = ({ children }: any) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    fetchProfileInfo().then((profile) => {
      setProfile(profile);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ profile, isAuthenticated: !!profile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
