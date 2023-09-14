import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
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
        <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);