// Simple in-memory event hook for auth-related side effects
// Will be set by AuthProvider on mount
let onUnauthorized = null;

export function setUnauthorizedHandler(handler) {
    // Register a single handler (overwrites any previous handler)
    onUnauthorized = handler;
}

export function triggerUnauthorized(payload = {}) {
    // Fire the handler if registered
    if (onUnauthorized) {
        onUnauthorized(payload);
    }
}
