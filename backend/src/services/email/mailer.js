import nodemailer from "nodemailer";

function buildTransporter() {
    const {SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS} = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
        throw new Error("Missing SMTP env vars. Check SMTP_HOST/PORT/USER/PASS.");
    }

    return nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: String(SMTP_SECURE).toLowerCase() === "true",
        auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
}

let transporterPromise = null;

async function getTransporter() {
    // Reuse transporter (and connection pooling if provider supports it)
    if (!transporterPromise) {
        transporterPromise = (async () => {
            const t = buildTransporter();

            // Optional sanity check (fail fast in dev)
            if (process.env.NODE_ENV !== "production") {
                await t.verify();
            }

            return t;
        })();
    }

    return transporterPromise;
}

async function sendMail({ to, subject, text, html }) {
    const transporter = await getTransporter();

    const fromName = process.env.EMAIL_FROM_NAME || process.env.APP_NAME || "App";
    const fromAddress = process.env.EMAIL_FROM_ADDRESS || process.env.SMTP_USER;

    if (!fromAddress) {
        throw new Error("Missing EMAIL_FROM_ADDRESS (or SMTP_USER).");
    }

    const info = await transporter.sendMail({
        from: `"${fromName}" <${fromAddress}>`,
        to,
        subject,
        text,
        html
    });

    return info;
}

export default sendMail;