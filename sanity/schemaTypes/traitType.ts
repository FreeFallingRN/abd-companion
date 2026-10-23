import { defineField, defineType } from 'sanity';

export const traitType = defineType({
  name: 'trait',
  title: 'Beast Trait / Specialty',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Trait Name',
      type: 'string',
      description: 'e.g. Obsidian Hide, Primordial Shadow Step',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'id',
      title: 'Identifier Key',
      type: 'string',
      description: 'Unique key used in milestone unlockedTraitIds (e.g. obsidian_hide)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Canonical Effect Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'element',
      title: 'Element / Affinity',
      type: 'string',
    }),
    defineField({
      name: 'unlockedChapter',
      title: 'First Appeared (Chapter)',
      type: 'number',
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'icon',
      title: 'Trait Icon / Artwork',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      media: 'icon',
    },
  },
});
