import { CollectionConfig } from 'payload'

export const Forms: CollectionConfig = {
  slug: 'forms',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: () => true, // Allow public form submissions
    read: () => false, // Restrict reading to admins only
  },
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        if (req.payload) {
          try {
            await req.payload.sendEmail({
              to: process.env.CONTACT_FORM_TO_EMAIL || '',
              subject: `New Contact Form Submission: ${doc.subject}`,
              html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${doc.name}</p>
                <p><strong>Email:</strong> ${doc.email}</p>
                <p><strong>Subject:</strong> ${doc.subject}</p>
                <p><strong>Message:</strong> ${doc.message}</p>
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
