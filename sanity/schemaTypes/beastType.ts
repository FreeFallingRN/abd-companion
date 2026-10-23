import { defineField, defineType } from 'sanity';

export const beastType = defineType({
  name: 'beast',
  title: 'Beast Record',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Beast Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'id',
      title: 'Beast Slug / Identifier',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'species',
      title: 'Species / Lineage',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contractChapter',
      title: 'Contract Chapter',
      type: 'number',
      description: 'The novel chapter where Aurelius first established a pact with this beast.',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'elementAffinity',
      title: 'Elemental Affinities',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'portrait',
      title: 'Beast Portrait / Illustration',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'lore',
      title: 'Grimoire Lore & Backstory',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'milestones',
      title: 'Evolutionary Milestones & Progression',
      type: 'array',
      description: 'Progression states keyed to chapter intervals for anti-spoiler timeline filtering.',
      of: [
        {
          type: 'object',
          name: 'beastMilestone',
          title: 'Milestone Stage',
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
              description: 'Leave blank if this is the latest/current evolutionary stage.',
            }),
            defineField({
              name: 'starRank',
              title: 'Star Rank (1 to 10)',
              type: 'number',
              validation: (Rule) => Rule.required().min(1).max(10),
            }),
            defineField({
              name: 'subRank',
              title: 'Sub-Rank',
              type: 'string',
              options: {
                list: [
                  { title: 'Pseudo', value: 'pseudo' },
                  { title: 'Low', value: 'low' },
                  { title: 'Middle', value: 'middle' },
                  { title: 'High', value: 'high' },
                  { title: 'Peak', value: 'peak' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'bloodlineTier',
              title: 'Bloodline Tier',
              type: 'string',
              options: {
                list: [
                  { title: 'Ordinary', value: 'ordinary' },
                  { title: 'Mortal', value: 'mortal' },
                  { title: 'Super', value: 'super' },
                  { title: 'Noble', value: 'noble' },
                  { title: 'Royal', value: 'royal' },
                  { title: 'Divine', value: 'divine' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'bloodlinePurity',
              title: 'Bloodline Purity (%)',
              type: 'number',
              validation: (Rule) => Rule.min(0).max(100),
            }),
            defineField({
              name: 'cognitionStage',
              title: 'Cognition Stage',
              type: 'string',
              options: {
                list: [
                  { title: 'Feral', value: 'feral' },
                  { title: 'Juvenile', value: 'juvenile' },
                  { title: 'Adolescent', value: 'adolescent' },
                  { title: 'Mature', value: 'mature' },
                  { title: 'Transcendent', value: 'transcendent' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'iq',
              title: 'Cognition IQ Equivalent',
              type: 'number',
            }),
            defineField({
              name: 'bondStage',
              title: 'Bond Stage',
              type: 'string',
              options: {
                list: [
                  { title: 'Chain Bond', value: 'chain' },
                  { title: 'Blood Bond', value: 'blood' },
                  { title: 'Soul Resonance', value: 'soul' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'bondPercentage',
              title: 'Bond Sync Rate (%)',
              type: 'number',
              validation: (Rule) => Rule.min(0).max(100),
            }),
            defineField({
              name: 'unlockedSkillIds',
              title: 'Unlocked Skill Names / IDs',
              type: 'array',
              of: [{ type: 'string' }],
            }),
            defineField({
              name: 'sharedTraits',
              title: 'Shared Traits Transferred to Tamer',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'sharedTrait',
                  fields: [
                    defineField({ name: 'name', title: 'Trait Name', type: 'string' }),
                    defineField({ name: 'effect', title: 'Trait Effect', type: 'string' }),
                    defineField({ name: 'unlockedChapter', title: 'Unlocked Chapter', type: 'number' }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'species',
      media: 'portrait',
    },
  },
});
