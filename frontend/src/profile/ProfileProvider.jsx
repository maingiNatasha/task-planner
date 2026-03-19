import { useCallback, useEffect, useState, useMemo } from "react";
import { profileApi } from "../api/profile.js";
import { useAuthState } from "../auth/useAuth.js";
import ProfileContext from "./ProfileContext.jsx";

export function ProfileProvider({ children }) {
    const { user, isAuthenticated, loading: authLoading } = useAuthState();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProfile = useCallback(async () => {
        if (!isAuthenticated || !user?.id) {
            setProfile(null);
            setError(null);
            setLoading(false);
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
    }, [isAuthenticated, user?.id]);

    const saveProfile = useCallback(async (payload) => {
        const res = await profileApi.saveProfile(payload);
        const returnedProfile = res?.data?.profile ?? null;
        setProfile(returnedProfile);
        return returnedProfile;
    }, []);

    useEffect(() => {
        if (!authLoading && isAuthenticated) {
            fetchProfile();
        } else if (!isAuthenticated) {
            setProfile(null);
            setError(null);
        }

    }, [authLoading, isAuthenticated, fetchProfile]);

    const value = useMemo(() => ({
        profile,
        loading,
        error,
        refetch: fetchProfile,
        saveProfile,
    }), [profile, loading, error, fetchProfile, saveProfile]);

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    );
}