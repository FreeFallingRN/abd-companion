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
      name: 'tamer',
      title: 'Contracted Tamer / Master',
      type: 'reference',
      to: [{ type: 'character' }],
      description: 'The Tamer / Pact Master who contracted this beast (e.g. Leo Aurelius, Lily). If Leo contracts this beast, select Leo.',
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
      name: 'size',
      title: 'Current / Baseline Size',
      type: 'string',
      description: 'Physical dimensions / size description of the beast.',
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
              name: 'species',
              title: 'Species / Evolutionary Form Name',
              type: 'string',
              description: 'The species name for this stage (e.g. Obsidian Panther Cub -> Obsidian Panther -> Void-Obsidian Panther).',
            }),
            defineField({
              name: 'size',
              title: 'Physical Size & Dimensions',
              type: 'string',
              description: 'Physical size and dimensions at this stage (e.g. "0.4m cub", "Waist-height (~1m)", "Height: 3m", "Length: 10m, Shoulder: 6-7m", "9m true height").',
            }),
            defineField({
              name: 'portrait',
              title: 'Evolutionary Form Illustration / Portrait',
              type: 'image',
              description: 'Specific artwork for this evolutionary form (e.g. cub vs adult vs cosmic void). Falls back to main beast portrait if blank.',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'minChapter',
              title: 'Chapter',
              type: 'number',
              description: 'The novel chapter this evolutionary stage begins at. Higher chapter milestones automatically supercede earlier ones.',
              validation: (Rule) => Rule.required().min(1),
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
              name: 'traits',
              title: 'Specialty Traits & Tamer Bond Sharing',
              type: 'array',
              description: 'Traits possessed by the beast in this stage, including how much Leo unlocks or shares through their bond.',
              of: [
                {
                  type: 'object',
                  name: 'beastMilestoneTrait',
                  title: 'Beast Trait',
                  fields: [
                    defineField({
                      name: 'name',
                      title: 'Trait Name',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'sharingStatus',
                      title: 'Sharing with Leo (Tamer)',
                      type: 'string',
                      options: {
                        list: [
                          { title: '🔒 Locked (Beast Only — 0% transferred)', value: 'locked' },
                          { title: '⚡ Partially Shared (Unlocking with Bond)', value: 'partial' },
                          { title: '✨ Fully Unlocked / Transferred (100% Shared)', value: 'full' },
                        ],
                        layout: 'radio',
                      },
                      initialValue: 'locked',
                    }),
                    defineField({
                      name: 'sharedPercent',
                      title: 'Shared Transfer Percentage (%)',
                      type: 'number',
                      description: 'e.g. 10%, 20%, 70%, 90%, or 100%. Leave 0 or blank if Locked.',
                      validation: (Rule) => Rule.min(0).max(100),
                    }),
                    defineField({
                      name: 'tamerEffect',
                      title: 'Tamer Synergy / Shared Benefit',
                      type: 'string',
                      description: 'Optional note on how this manifests on Leo (e.g. "Bark-textured skin with Peak 4★ durability").',
                    }),
                  ],
                  preview: {
                    select: {
                      name: 'name',
                      sharingStatus: 'sharingStatus',
                      sharedPercent: 'sharedPercent',
                    },
                    prepare({ name, sharingStatus, sharedPercent }) {
                      let badge = '🔒 Beast Only';
                      if (sharingStatus === 'full') badge = '✨ Fully Shared (100%)';
                      else if (sharingStatus === 'partial') badge = `⚡ Partial (${sharedPercent || 50}%)`;
                      return {
                        title: name || 'Unnamed Trait',
                        subtitle: badge,
                      };
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: {
              starRank: 'starRank',
              subRank: 'subRank',
              minChapter: 'minChapter',
              species: 'species',
              bloodlineTier: 'bloodlineTier',
              media: 'portrait',
            },
            prepare({ starRank, subRank, minChapter, species, bloodlineTier, media }) {
              const rankFormatted = starRank ? `${starRank}★ ${subRank ? subRank.toUpperCase() : ''}` : (subRank || 'Stage');
              const chapterRange = minChapter ? `From Ch. ${minChapter}` : 'Base Stage';
              const title = species ? `${species} (${rankFormatted})` : rankFormatted;
              const subtitle = `${chapterRange} • Bloodline: ${bloodlineTier || 'Standard'}`;
              return {
                title,
                subtitle,
                media,
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
      species: 'species',
      tamerName: 'tamer.name',
      media: 'portrait',
    },
    prepare({ title, species, tamerName, media }) {
      return {
        title: title || 'Unnamed Beast',
        subtitle: `${species || 'Beast'} • Tamer: ${tamerName || 'Leo Aurelius'}`,
        media,
      };
    },
  },
});
