import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { doGet } from "./Axios";
const UserProfileContext = createContext(null);
const UserProfile = ({ children }) => {
  const location = useLocation();
  const [user, setUser] = useState();
  const [refresh, setRefresh] = useState(false);
  const fetchUser = async () => {
    try {
      const userres = await doGet(`/user`);
      setUser(userres.data);
    } catch (error) {}
  };
  useEffect(() => {
    if (
      !location.pathname.includes("register") &&
      !location.pathname.includes("/login") &&
      !location.pathname.includes("/user/verifyotp") &&
      !location.pathname.includes("/sendmail") &&
      !location.pathname.includes("/forgotpassword") &&
      !location.pathname.includes("/otp") &&
      !location.pathname.includes("reset") &&
      !location.pathname.includes("/user/verifyfpotp") &&
      !location.pathname.includes("/admin")
    ) {
      fetchUser();
    }
  }, [refresh, location]);

  return (
    <UserProfileContext.Provider value={{ user, setRefresh }}>
      {children}
    </UserProfileContext.Provider>
  );
};
export const useProfileConsumer = () => useContext(UserProfileContext);
export default UserProfile;
