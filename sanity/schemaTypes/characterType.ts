import { defineField, defineType } from 'sanity';

export const characterType = defineType({
  name: 'character',
  title: 'Character / Tamer Dossier',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Honorific / Title',
      type: 'string',
      description: 'e.g. Lord of the Obsidian Domain, Scion of House Aurelius',
    }),
    defineField({
      name: 'soulRank',
      title: 'Soul Rank',
      type: 'string',
      options: {
        list: [
          { title: 'Common', value: 'common' },
          { title: 'Uncommon', value: 'uncommon' },
          { title: 'Rare', value: 'rare' },
          { title: 'Super Rare', value: 'super_rare' },
          { title: 'Epic', value: 'epic' },
          { title: 'Legendary', value: 'legendary' },
          { title: 'Mythical', value: 'mythical' },
          { title: 'Divine', value: 'divine' },
        ],
      },
    }),
    defineField({
      name: 'primaryAffinity',
      title: 'Primary Elemental Affinity',
      type: 'string',
    }),
    defineField({
      name: 'portrait',
      title: 'Character Portrait',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'biography',
      title: 'Biography & Backstory',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'milestones',
      title: 'Attribute & Breakthrough Progression',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'characterMilestone',
          title: 'Milestone Snapshot',
          fields: [
            defineField({ name: 'chapter', title: 'Chapter Number', type: 'number', validation: (Rule) => Rule.required() }),
            defineField({ name: 'vitality', title: 'Vitality', type: 'number' }),
            defineField({ name: 'strength', title: 'Strength', type: 'number' }),
            defineField({ name: 'agility', title: 'Agility', type: 'number' }),
            defineField({ name: 'intellect', title: 'Intellect', type: 'number' }),
            defineField({ name: 'spirit', title: 'Spirit', type: 'number' }),
            defineField({ name: 'soulCapacity', title: 'Soul Capacity (%)', type: 'number' }),
            defineField({ name: 'soulCores', title: 'Active Soul Cores', type: 'number' }),
            defineField({
              name: 'keyBreakthroughs',
              title: 'Key Feats & Breakthroughs',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'portrait',
    },
  },
});
