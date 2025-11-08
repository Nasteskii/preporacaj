import { createContext, useContext, useEffect, useState } from "react";
import { fetchProfileInfo } from "../services/profile.service";
import { Profile } from "../types/Profile";

const AuthContext = createContext<{
  profile: Profile | null;
  isAuthenticated: boolean;
  setProfile: (profile: Profile | null) => void;
}>({
  profile: null,
  isAuthenticated: false,
  setProfile: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    fetchProfileInfo().then((profile) => {
      setProfile(profile);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ profile, isAuthenticated: !!profile, setProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
