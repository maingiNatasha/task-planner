import { useCallback, useEffect, useState } from "react";
import { profileApi } from "../api/profile";

export function useProfile(userId) {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProfile = useCallback(async () => {
        if (!userId) {
            setProfile(null);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await profileApi.getProfile();
            const normalized = res?.data?.profile ?? null;
            setProfile(normalized);
            return normalized;
        } catch (err) {
            setError(err);
            setProfile(null);
            return null;
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    return {
        profile,
        loading,
        error,
        refetch: fetchProfile,
        setProfile
    };
}