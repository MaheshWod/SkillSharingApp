
import { useState, useContext, useEffect, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const data = localStorage.getItem("auth");
        return data ? JSON.parse(data) : { user: null, token: "" };
    });

    // Update token in headers and localStorage when auth changes
    useEffect(() => {
        if (auth?.token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
            localStorage.setItem("auth", JSON.stringify(auth));
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("auth");
        }
    }, [auth]); // Runs every time `auth` changes

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };

