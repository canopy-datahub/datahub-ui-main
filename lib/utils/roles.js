/**
 * Canonical front-end role list.
 *
 * `name` matches the backend role identifier (the value sent in `userDTO.roles`
 * and compared against in `user?.roles?.includes(...)` checks). DO NOT change
 * `name` values — they're load-bearing.
 *
 * `label` is the user-facing display string. Rename here to rename everywhere.
 *
 * The order of this array is the canonical UI order (admin role-picker dropdown,
 * read-only role display in the user profile modal, etc.).
 *
 * The `Uploader` role is omitted on purpose — it has been disabled platform-wide
 * (see UserServiceImpl.BLOCKED_ROLES). Restore it here if/when the role is
 * resurrected.
 */
export const ROLES = [
    { name: 'Data Submitter',            label: 'Data Submitter' },
    { name: 'Data Curator',              label: 'Curator' },
    { name: 'Officer',                   label: 'System Observer' },
    { name: 'Support Team',              label: 'Ticket Manager' },
    { name: 'Application Administrator', label: 'Application Administrator' },
];

const LABEL_BY_NAME = Object.fromEntries(ROLES.map((r) => [r.name, r.label]));

/**
 * Map a backend role name to its UI display label.
 * Falls back to the raw name if the role isn't in ROLES (forward-compat).
 */
export const getRoleLabel = (name) => LABEL_BY_NAME[name] || name;

/**
 * Take a list of role objects from the backend (`{ name, description }`) and
 * return UI-ready `{ label, value }` options in the canonical order. Any
 * backend-returned role not in ROLES is appended at the end with its raw name
 * as label, so adding a role to the DB without updating this file still
 * surfaces it (just unstyled and at the bottom).
 */
export const toOrderedRoleOptions = (backendRoles) => {
    const backendByName = new Map((backendRoles || []).map((r) => [r.name, r]));
    const known = ROLES
        .filter((r) => backendByName.has(r.name))
        .map((r) => ({ label: r.label, value: r.name }));
    const knownNames = new Set(ROLES.map((r) => r.name));
    const unknown = (backendRoles || [])
        .filter((r) => !knownNames.has(r.name))
        .map((r) => ({ label: r.description || r.name, value: r.name }));
    return [...known, ...unknown];
};
