import { createContext, ReactNode } from "react";
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

export const EventsContext = createContext<UserProviderData>(
  {} as UserProviderData
);

export const EventsProvider = ({ children }: UserProviderProps) => {
  const [userData, setUserData] = useState([]);

  const user_id = localStorage.getItem("@AcessUserID");
  const token = localStorage.getItem("@AcessToken");

  useEffect(() => {
    api
      .get(`/user_details/${user_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const user = userData;
  return (
    <EventsContext.Provider value={{ user }}>{children}</EventsContext.Provider>
  );
};
