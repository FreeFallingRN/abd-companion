import { defineField, defineType } from 'sanity';

export const realmType = defineType({
  name: 'realmLocation',
  title: 'Realm & World Lore',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Location / Institution Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Location Category',
      type: 'string',
      options: {
        list: [
          { title: 'Tamer Academy', value: 'academy' },
          { title: 'Danger Zone / Forbidden Ground', value: 'danger_zone' },
          { title: 'Bastion / Fortress City', value: 'bastion' },
          { title: 'Ancient Ruin', value: 'ruin' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dangerRating',
      title: 'Danger Rating',
      type: 'string',
      description: 'e.g. S-Rank, Star-4 Lethal, Controlled',
    }),
    defineField({
      name: 'firstChapter',
      title: 'First Introduced (Chapter)',
      type: 'number',
    }),
    defineField({
      name: 'description',
      title: 'Lore Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'coverImage',
      title: 'Location Cover Image / Map Artwork',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'type',
    },
  },
});
