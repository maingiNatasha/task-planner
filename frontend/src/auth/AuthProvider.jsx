import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authApi } from "../api/auth.js";
import AuthContext from "./AuthContext.jsx";
import { setUnauthorizedHandler } from "./authEvents.js";

export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const unauthorizedHandledRef = useRef(false);
    const hadSessionRef = useRef(false);

    // Track bootstrap state inside the unauthorized handler closure
    const loadingRef = useRef(loading);

    // Fetch current user based on cookie
    const refreshUser = async () => {
        try {
            const res = await authApi.me();
            const currentUser = res?.data?.user ?? null;
            setUser(currentUser);

            if (currentUser) {
                hadSessionRef.current = true; // indicate a session existed
                unauthorizedHandledRef.current = false; // reset the guard after successful auth
            }

            return currentUser;
        } catch (err) {
            console.error(err);
            setUser(null);
            return null;
        }
    };

    const login = async (form) => {
        await authApi.login(form.email, form.password, form.remember); // sets HttpOnly cookie
        return refreshUser(); // populate user state
    }

    const register = async (form) => {
        await authApi.register(form.email, form.password);
    }

    const logout = async () => {
        try {
            await authApi.logout(); // clears cookie
            toast.success("Logged out successfully");
        } catch {
            toast.info("You have been logged out");
        } finally {
            setUser(null);
            hadSessionRef.current = false;
            navigate("/login", { replace: true });
        }
    };

    const forgotPassword = async (email) => {
        await authApi.forgotPassword(email);
    };

    const resetPassword = async (token, password) => {
        await authApi.resetPassword(token, password);
    };

    // Bootstrap: on initial app load, check if cookie exists by calling /auth/user
    // Bootstrapping = the process of restoring auth state when the app first loads.
    useEffect(() => {
        (async () => {
            setLoading(true);
            await refreshUser();
            setLoading(false);
        })();
    }, []);

    useEffect(() => {
        // Keep a mutable loading flag for the unauthorized handler
        loadingRef.current = loading;
    }, [loading]);

    useEffect(() => {
        setUnauthorizedHandler(({ message }) => {
            if (unauthorizedHandledRef.current) return;
            if (loadingRef.current) return;

            // No session case
            if (!hadSessionRef.current) {
                setUser(null);
                // Public routes can remain accessible; RequireAuth guards protected routes.
                return;
            }

            // Session expired case
            unauthorizedHandledRef.current = true;

            setUser(null);
            toast.info(message || "Session expired. Please log in again.")
            navigate("/login", { replace: true });
        });

        // Clean up
        return () => {
            setUnauthorizedHandler(null);
        };
    }, [navigate]);

    const value = {
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
        refreshUser,
        forgotPassword,
        resetPassword
    };

    return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>);
}
