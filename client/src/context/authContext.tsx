import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

interface User {
    _id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // On app start, ask the backend who (if anyone) the auth cookie
    // belongs to, rather than trusting stale cached data.
    useEffect(() => {
        let cancelled = false;

        const loadUser = async () => {
            try {
                const { data } = await api.get("/api/auth/me");
                if (!cancelled) {
                    setUser(data);
                }
            } catch {
                if (!cancelled) {
                    setUser(null);
                }
            } finally {
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        };

        loadUser();

        return () => {
            cancelled = true;
        };
    }, []);

    // Login
    const login = (userData: User) => {
        setUser(userData);
    };

    // Logout — clears the httpOnly cookie server-side, then clears local state
    const logout = async () => {
        try {
            await api.post("/api/auth/logout");
        } catch {
            // Even if the request fails (e.g. offline), still clear local
            // state below so the UI doesn't stay stuck looking logged in.
        }

        setUser(null);

        // Clean up any stale keys left behind by older versions of this
        // context that persisted the session to localStorage.
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    const isAuthenticated = Boolean(user);

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isAuthenticated,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error(
            "useAuth must be used within an AuthProvider"
        );
    }

    return context;
};