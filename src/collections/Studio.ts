import { CollectionConfig } from 'payload';

export const Studio: CollectionConfig = {
  slug: 'studio',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'about',
      type: 'textarea',
      required: true,
    },
    {
      name: 'services',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'genres',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'recordingElements',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'otherGenresText',
      type: 'text',
      required: true,
      defaultValue: 'For any other genres, contact me to discuss details.',
    },
    {
      name: 'otherElementsText',
      type: 'text',
      required: true,
      defaultValue: 'For drums or anything else, contact me to discuss details.',
    },
  ],
};
