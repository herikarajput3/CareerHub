import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMe = async () => {
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await axiosInstance.get("/users/me");
                setUser(res.data.user);
                localStorage.setItem("user", JSON.stringify(res.data.user));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchMe();
    }, [token]);
    const login = (userData, token) => {
        setUser(userData);
        setToken(token);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token)
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.clear();
    }

    return (
        <AuthContext.Provider value={{ user, setUser, token, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);