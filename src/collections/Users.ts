import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  // Keep the Payload 3.16 schema: 3.93 defaults would add a users_sessions table and a
  // reset_password_requested_at column, and prod has no migrations to create them.
  auth: {
    useSessions: false,
    forgotPassword: { minRequestInterval: 0 },
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
