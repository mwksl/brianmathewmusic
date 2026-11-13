import { CollectionConfig } from 'payload'

const escapeHtml = (value: unknown) =>
  String(value ?? '').replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)

export const Forms: CollectionConfig = {
  slug: 'forms',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: () => false, // Submissions go through /api/forms (local API), never the public REST/GraphQL API
    read: ({ req: { user } }) => Boolean(user), // Admins only (every user is an admin)
  },
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        if (operation !== 'create') return

        if (req.payload) {
          try {
            await req.payload.sendEmail({
              to: process.env.CONTACT_FORM_TO_EMAIL || '',
              subject: `New Contact Form Submission: ${doc.subject}`,
              html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${escapeHtml(doc.name)}</p>
                <p><strong>Email:</strong> ${escapeHtml(doc.email)}</p>
                <p><strong>Subject:</strong> ${escapeHtml(doc.subject)}</p>
                <p><strong>Message:</strong> ${escapeHtml(doc.message)}</p>
              `,
            })
          } catch (error) {
            console.error('Failed to send email notification:', error)
          }
        }
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        {
          label: 'New',
          value: 'new',
        },
        {
          label: 'Read',
          value: 'read',
        },
        {
          label: 'Replied',
          value: 'replied',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
