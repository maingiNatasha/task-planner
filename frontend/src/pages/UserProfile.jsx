import PageLayout from "../components/PageLayout.jsx";
import { useAuth } from "../auth/useAuth.js";
import { useProfile } from "../hooks/useProfile.js";

function UserProfile() {
    const { user } = useAuth();
    const { profile, loading, error } = useProfile(user?.id);

    return (
        <PageLayout>
            <div>Profile</div>
        </PageLayout>
    );
}

export default UserProfile;
