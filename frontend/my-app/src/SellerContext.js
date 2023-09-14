import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const SellerContext = createContext(undefined);

export const SellerProvider = ({ children }) => {
  const [user, setUser] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        setUser(response.data[0]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <SellerContext.Provider value={{ user }}>{children}</SellerContext.Provider>
  );
};

export const useUser = () => useContext(SellerContext);