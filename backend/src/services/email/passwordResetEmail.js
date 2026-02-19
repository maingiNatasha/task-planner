import sendMail from "./mailer.js";

function buildResetEmail({ to, resetUrl, appName }) {
    const subject = `${appName}: Reset your password`;

    const text = [
        `You requested a password reset for ${appName}.`,
        `Reset your password using this link: ${resetUrl}`,
        ``,
        `If you did not request this, you can ignore this email.`,
    ].join("\n");

    const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2 style="margin: 0 0 12px;">Reset your password</h2>
        <p>You requested a password reset for <b>${appName}</b>.</p>
        <p>
            <a href="${resetUrl}" style="display:inline-block;padding:10px 14px;text-decoration:none;border-radius:8px;background:#111;color:#fff;">
                Reset password
            </a>
        </p>
        <p style="color:#555;">If the button doesn't work, copy and paste this link:</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        <p style="color:#777;margin-top:18px;">If you didn't request this, you can ignore this email.</p>
    </div>`;

    return { subject, text, html };
}

async function sendPasswordResetEmail({ to, token }) {
    const appName = process.env.APP_NAME || "App";
    const appUrl = process.env.APP_URL || "http://localhost:5173";

    // Frontend route
    const resetUrl = `${appUrl}/reset-password?token=${encodeURIComponent(token)}`;

    const { subject, text, html } = buildResetEmail({ to, resetUrl, appName });

    return sendMail({ to, subject, text, html });
}

export default sendPasswordResetEmail;