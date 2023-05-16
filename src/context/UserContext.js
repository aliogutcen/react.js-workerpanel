import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import WorkerService from "../service/WorkerService";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const token = Cookies.get("token");
  useEffect(() => {
    WorkerService.getInfoForWorker(token).then((response) => {
      setUser(response.data);
      setIsLoading(false);
    });
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
