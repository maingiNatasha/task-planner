import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import PageLayout from "../components/PageLayout.jsx";
import { useAuth } from "../auth/useAuth.js";
import { useProfile } from "../profile/useProfile.js";

const EMPTY_FORM = {
    firstname: "",
    lastname: "",
    username: ""
};

function UserProfile() {
    const { user, logout } = useAuth();
    const { profile, loading, error, saveProfile } = useProfile(user?.id);
    const [form, setForm] = useState(EMPTY_FORM);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setForm({
            firstname: profile?.firstname ?? "",
            lastname: profile?.lastname ?? "",
            username: profile?.username ?? ""
        });
    }, [profile]);

    const avatarLetter = useMemo(() => {
        return (
            form.username?.[0]?.toUpperCase() ||
            form.firstname?.[0]?.toUpperCase() ||
            user?.email?.[0]?.toUpperCase() ||
            "U"
        );
    }, [form.username, form.firstname, user?.email]);

    const isDirty =
        form.firstname !== (profile?.firstname ?? "") ||
        form.lastname !== (profile?.lastname ?? "") ||
        form.username !== (profile?.username ?? "");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleCancel = () => {
        setForm({
            firstname: profile?.firstname ?? "",
            lastname: profile?.lastname ?? "",
            username: profile?.username ?? ""
        });
    };

    const handleSave = async (event) => {
        event.preventDefault();
        if (!isDirty) return;

        setSaving(true);

        try {
            await saveProfile(form);
            toast.success("Profile saved successfully");
        } catch (err) {
            toast.error(err?.message || "Unable to save profile");
        } finally {
            setSaving(false);
        }
    };

    return (
        <PageLayout>
            <div className="mx-auto w-full max-w-6xl px-4 py-10 md:py-14">
                <section className="rounded-2xl border border-white/60 bg-purple-50/85 p-6 shadow-lg md:p-8">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="grid h-16 w-16 place-items-center rounded-full bg-purple-800 text-2xl font-bold text-white">
                                {avatarLetter}
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900">Account Profile</h1>
                                <p className="text-sm text-slate-600">Manage your personal details and account identity.</p>
                            </div>
                        </div>
                        <span className="inline-flex w-fit items-center rounded-full bg-purple-200/50 px-3 py-1 text-sm font-medium text-slate-700">
                            {profile?.role || "user"}
                        </span>
                    </div>
                </section>

                <div className="mt-6 grid gap-6 lg:grid-cols-[320px_1fr]">
                    <aside className="rounded-2xl border border-white/60 bg-purple-50/85 p-6 shadow-lg">
                        <h2 className="text-lg font-semibold text-slate-900">Account</h2>
                        <dl className="mt-4 space-y-4">
                            <div>
                                <dt className="text-xs uppercase tracking-wide text-slate-500">Email</dt>
                                <dd className="text-sm font-medium text-slate-800">{user?.email || "-"}</dd>
                            </div>
                            <div>
                                <dt className="text-xs uppercase tracking-wide text-slate-500">Username</dt>
                                <dd className="text-sm font-medium text-slate-800">{profile?.username || "Not set"}</dd>
                            </div>
                            <div>
                                <dt className="text-xs uppercase tracking-wide text-slate-500">Role</dt>
                                <dd className="text-sm font-medium text-slate-800">{profile?.role || "user"}</dd>
                            </div>
                        </dl>
                        <button
                            type="button"
                            onClick={logout}
                            className="mt-6 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold cursor-pointer text-slate-700 transition hover:bg-purple-700 hover:text-white"
                        >
                            Sign out
                        </button>
                    </aside>

                    <section className="rounded-2xl border border-white/60 bg-purple-50/85 p-6 shadow-lg md:p-8">
                        <h2 className="text-xl font-semibold text-slate-900">Personal Information</h2>
                        <p className="mt-1 text-sm text-slate-600">Keep your details up to date for a better experience.</p>

                        {loading && <p className="mt-6 text-sm text-slate-600">Loading profile...</p>}
                        {error && <p className="mt-6 text-sm text-red-600">Could not load profile details.</p>}

                        <form className="mt-6 space-y-5" onSubmit={handleSave}>
                            <div className="grid gap-5 md:grid-cols-2">
                                <label className="block">
                                    <span className="mb-1 block text-sm font-medium text-slate-700">First name</span>
                                    <input
                                        name="firstname"
                                        value={form.firstname}
                                        onChange={handleChange}
                                        maxLength={50}
                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-slate-500"
                                        placeholder="First name"
                                    />
                                </label>
                                <label className="block">
                                    <span className="mb-1 block text-sm font-medium text-slate-700">Last name</span>
                                    <input
                                        name="lastname"
                                        value={form.lastname}
                                        onChange={handleChange}
                                        maxLength={50}
                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-slate-500"
                                        placeholder="Last name"
                                    />
                                </label>
                            </div>

                            <label className="block">
                                <span className="mb-1 block text-sm font-medium text-slate-700">Username</span>
                                <input
                                    name="username"
                                    value={form.username}
                                    onChange={handleChange}
                                    maxLength={30}
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-slate-500"
                                    placeholder="Username"
                                />
                            </label>

                            <div className="flex items-center gap-3 border-t border-slate-200 pt-4">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    disabled={!isDirty || saving}
                                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-purple-200/50 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!isDirty || saving}
                                    className="rounded-lg bg-purple-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-800 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </PageLayout>
    );
}

export default UserProfile;
