// Shared by ContactForm (input maxLength) and /api/forms (server validation).
export const CONTACT_LIMITS = { name: 200, email: 320, subject: 200, message: 5000 } as const

// Honeypot field. Non-semantic name so browser/password-manager autofill leaves it empty.
export const HONEYPOT_FIELD = 'hp_field'
