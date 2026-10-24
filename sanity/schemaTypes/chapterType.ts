import { defineField, defineType } from 'sanity';

export const chapterType = defineType({
  name: 'chapterTimeline',
  title: 'Chapter Timeline',
  type: 'document',
  fields: [
    defineField({
      name: 'chapterNumber',
      title: 'Chapter Number',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'title',
      title: 'Chapter Title',
      type: 'string',
    }),
    defineField({
      name: 'arc',
      title: 'Story Arc',
      type: 'string',
    }),
    defineField({
      name: 'summary',
      title: 'Key Milestones & Plot Summary',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      chapterNumber: 'chapterNumber',
      arc: 'arc',
    },
    prepare({ title, chapterNumber, arc }) {
      return {
        title: `Chapter ${chapterNumber || '?'}: ${title || 'Untitled'}`,
        subtitle: arc || undefined,
      };
    },
  },
});
