import { createContext, ReactNode, useCallback } from "react";
import { useState, useEffect } from "react";
import { api } from "../../services";

interface User {
  name: string;
  adress: string;
  type: string;
  email: string;
  id: string;
}

interface UserProviderProps {
  children: ReactNode;
}

interface UserProviderData {
  user: User[];
}

export const UserContext = createContext<UserProviderData>(
  {} as UserProviderData
);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userName, setUserName] = useState([]);
  const [userEmail, setUserEmail] = useState([]);
  const [userType, setUserType] = useState([]);
  const [userData, setUserData] = useState([]);

  const user_id = localStorage.getItem("@AcessUserID");
  const token = localStorage.getItem("@AcessToken");

  const loadUserDetails = useCallback(async () => {
    try {
      const response = await api.get(`/user_details?user_id=${user_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { name, email, type } = response.data;
      setUserEmail(email);
      setUserName(name);
      setUserType(type);
      setUserData(response.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    loadUserDetails();
  }, []);

  const name = userName;
  const email = userEmail;
  const type = userType;
  const user = userData;

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
