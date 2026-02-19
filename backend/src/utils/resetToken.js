import crypto from "crypto";

export const generateRawResetToken = () => {
    // 32 bytes -> 64 hex chars, strong enough
    return crypto.randomBytes(32).toString("hex");
};

export const hashResetToken = (rawToken) => {
    return crypto.createHash("sha256").update(rawToken).digest("hex");
};
