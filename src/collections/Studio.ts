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
      name: 'studioImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Studio Full Shot',
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
      name: 'servicesImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Services Section Image',
    },
    {
      name: 'genres',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'genresImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Genres Section Image',
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
      name: 'elementsImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Recording Elements Section Image',
    },
    {
      name: 'audioSamples',
      type: 'array',
      label: 'Audio Samples',
      admin: {
        description: 'Audio samples to display on the studio page',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Genre/Category',
        },
        {
          name: 'audioFile',
          type: 'upload',
          relationTo: 'media-with-prefix',
          required: true,
          label: 'Audio Sample File',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Credits or Description',
        },
      ],
    },
    {
      name: 'gear',
      type: 'array',
      fields: [
        {
          name: 'category',
          type: 'text',
          required: true,
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
            },
          ],
        },
      ],
    },
    {
      name: 'gearImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Gear Section Image',
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
