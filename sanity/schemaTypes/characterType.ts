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
      title: 'Slug / Identifier',
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
      description: 'e.g. Dual-Soul Pact Master / Fief Sovereign',
    }),
    defineField({
      name: 'role',
      title: 'Narrative Role',
      type: 'string',
      options: {
        list: [
          { title: 'Protagonist (Active Sovereign)', value: 'protagonist' },
          { title: 'Partner (Soulmate Bond)', value: 'partner' },
          { title: 'Ally', value: 'ally' },
          { title: 'Mentor', value: 'mentor' },
          { title: 'Rival', value: 'rival' },
          { title: 'Antagonist', value: 'antagonist' },
        ],
      },
    }),
    defineField({
      name: 'soulRank',
      title: 'Base Mortal Soul Rank',
      type: 'string',
      options: {
        list: [
          { title: 'Common (Value 1)', value: 'common' },
          { title: 'Uncommon (Value 2)', value: 'uncommon' },
          { title: 'Rare (Value 3)', value: 'rare' },
          { title: 'Super Rare (Value 4)', value: 'super_rare' },
          { title: 'Epic (Value 5)', value: 'epic' },
          { title: 'Legendary (Value 6)', value: 'legendary' },
          { title: 'Mythical (Value 7)', value: 'mythical' },
          { title: 'Divine (Value 8)', value: 'divine' },
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
      title: 'Character Portrait / Artwork',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'biography',
      title: 'Biography & Canonical Backstory',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'talents',
      title: 'Innate Talents',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'talent',
          fields: [
            defineField({ name: 'name', title: 'Talent Name', type: 'string' }),
            defineField({ name: 'starRank', title: 'Star Rank', type: 'number' }),
            defineField({ name: 'description', title: 'Effect Description', type: 'text', rows: 2 }),
            defineField({ name: 'unlockedChapter', title: 'Unlocked Chapter', type: 'number' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'contractedBeasts',
      title: 'Contracted Companion Beasts',
      description: 'The companion beasts bound under pact to this tamer (e.g. Shyra, Niri, Nyxa).',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'beast' }],
        },
      ],
    }),
    defineField({
      name: 'milestones',
      title: 'Tamer Progression Milestones',
      description: 'Progression states keyed to chapter intervals for timeline anti-spoiler filtering.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'characterMilestone',
          title: 'Tamer Progression Milestone',
          fields: [
            defineField({
              name: 'minChapter',
              title: 'Unlocked at Chapter (minChapter)',
              type: 'number',
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              name: 'maxChapter',
              title: 'Superceded at Chapter (maxChapter)',
              type: 'number',
              description: 'Leave blank if this is the latest/current milestone.',
            }),
            defineField({
              name: 'level',
              title: 'Tamer Level',
              type: 'number',
            }),
            defineField({
              name: 'attributes',
              title: 'Attributes & Mana Pool',
              type: 'object',
              fields: [
                defineField({ name: 'vitality', title: 'Vitality (VIT)', type: 'number' }),
                defineField({ name: 'strength', title: 'Strength (STR)', type: 'number' }),
                defineField({ name: 'agility', title: 'Agility (AGI)', type: 'number' }),
                defineField({ name: 'stamina', title: 'Stamina (STA)', type: 'number' }),
                defineField({ name: 'intelligence', title: 'Intelligence (INT)', type: 'number' }),
                defineField({ name: 'maxMana', title: 'Max Mana Pool', type: 'number' }),
                defineField({ name: 'unassignedPoints', title: 'Unassigned Attribute Points', type: 'number' }),
              ],
            }),
            defineField({
              name: 'soulProfile',
              title: 'Soul Profile & Contract Capacity',
              type: 'object',
              fields: [
                defineField({
                  name: 'mortalSoulRank',
                  title: 'Mortal Soul Rank',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Common (Rank 1)', value: 'common' },
                      { title: 'Uncommon (Rank 2)', value: 'uncommon' },
                      { title: 'Rare (Rank 3)', value: 'rare' },
                      { title: 'Super Rare (Rank 4)', value: 'super_rare' },
                      { title: 'Epic (Rank 5)', value: 'epic' },
                      { title: 'Legendary (Rank 6)', value: 'legendary' },
                      { title: 'Mythical (Rank 7)', value: 'mythical' },
                      { title: 'Divine (Rank 8)', value: 'divine' },
                    ],
                  },
                }),
                defineField({ name: 'mortalSoulValue', title: 'Mortal Soul Value', type: 'number' }),
                defineField({ name: 'primordialSoulValue', title: 'Primordial Soul Value', type: 'number' }),
                defineField({ name: 'combinedMultiplier', title: 'Combined Multiplier', type: 'number' }),
                defineField({ name: 'statSoftCapPercent', title: 'Stat Soft Cap (%)', type: 'number' }),
                defineField({ name: 'maxContractSlots', title: 'Max Contract Slots', type: 'number' }),
                defineField({ name: 'skillCapacity', title: 'Skill Capacity', type: 'number' }),
              ],
            }),
            defineField({
              name: 'contractedBeastIds',
              title: 'Contracted Beast Slugs / Names',
              type: 'array',
              of: [{ type: 'string' }],
              options: { layout: 'tags' },
            }),
            defineField({
              name: 'personalSkillIds',
              title: 'Personal Skills',
              type: 'array',
              of: [{ type: 'string' }],
              options: { layout: 'tags' },
            }),
            defineField({
              name: 'copiedSkillIds',
              title: 'Copied Skills (from Companions)',
              type: 'array',
              of: [{ type: 'string' }],
              options: { layout: 'tags' },
            }),
          ],
          preview: {
            select: {
              minChapter: 'minChapter',
              maxChapter: 'maxChapter',
              level: 'level',
              mortalSoulRank: 'soulProfile.mortalSoulRank',
              mortalSoulValue: 'soulProfile.mortalSoulValue',
              primordialSoulValue: 'soulProfile.primordialSoulValue',
              vit: 'attributes.vitality',
              str: 'attributes.strength',
              agi: 'attributes.agility',
            },
            prepare({ minChapter, maxChapter, level, mortalSoulRank, mortalSoulValue, primordialSoulValue, vit, str, agi }) {
              const chRange = maxChapter ? `Ch. ${minChapter}–${maxChapter}` : `Ch. ${minChapter}+`;
              const levelStr = level ? `Level ${level}` : 'Stage';
              const soulRankFormatted = mortalSoulRank ? mortalSoulRank.replace(/_/g, ' ').toUpperCase() : 'COMMON';
              const soulStr = `${soulRankFormatted} (Mortal ${mortalSoulValue ?? 1} + Primordial ${primordialSoulValue ?? 7})`;
              const statsStr = vit ? `VIT ${vit} • STR ${str} • AGI ${agi}` : '';
              return {
                title: `${chRange} • ${levelStr} • ${soulStr}`,
                subtitle: statsStr || 'Tamer Milestone Snapshot',
              };
            },
          },
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
