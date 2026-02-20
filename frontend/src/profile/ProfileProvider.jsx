import { useCallback, useEffect, useState } from "react";
import { profileApi } from "../api/profile.js";
import { useAuth } from "../auth/useAuth.js";
import ProfileContext from "./ProfileContext.jsx";

export function ProfileProvider({ children }) {
    const { user, isAuthenticated, loading: authLoading } = useAuth();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const clearProfile = useCallback(() => {
        setProfile(null);
        setError(null);
        setLoading(false);
    }, []);

    const fetchProfile = useCallback(async () => {
        if (!isAuthenticated || !user?.id) {
            clearProfile();
            return null;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await profileApi.getProfile();
            const fetchedProfile = res?.data?.profile ?? null;
            setProfile(fetchedProfile);
            return fetchedProfile;
        } catch (err) {
            setError(err);
            setProfile(null);
            return null;
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, user?.id, clearProfile]);

    const saveProfile = useCallback(async (payload) => {
        const res = await profileApi.saveProfile(payload);
        const returnedProfile = res?.data?.profile ?? null;
        setProfile(returnedProfile);
        return returnedProfile;
    }, []);

    useEffect(() => {
        if (authLoading) {
            setLoading(true);
            return;
        }

        fetchProfile();
    }, [authLoading, fetchProfile]);

    const value = {
        profile,
        loading,
        error,
        refetch: fetchProfile,
        saveProfile,
    };

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    );
}