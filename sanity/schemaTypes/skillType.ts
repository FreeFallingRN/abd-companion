import { defineField, defineType } from 'sanity';

export const skillType = defineType({
  name: 'skill',
  title: 'Skill & Ability Codex',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Skill Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'id',
      title: 'Identifier Key',
      type: 'string',
      description: 'e.g. shadow_pounce, abyssal_roar',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'element',
      title: 'Element / School',
      type: 'string',
    }),
    defineField({
      name: 'tier',
      title: 'Skill Tier',
      type: 'string',
      options: {
        list: [
          { title: 'Basic', value: 'basic' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
          { title: 'Master', value: 'master' },
          { title: 'Grandmaster', value: 'grandmaster' },
          { title: 'Primordial', value: 'primordial' },
        ],
      },
    }),
    defineField({
      name: 'manaCost',
      title: 'Mana / Soul Cost',
      type: 'number',
    }),
    defineField({
      name: 'description',
      title: 'Canonical Effect Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'unlockedChapter',
      title: 'First Appeared (Chapter)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'icon',
      title: 'Skill Icon / Artwork',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'tier',
    },
  },
});
