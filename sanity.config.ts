import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool } from 'sanity/presentation';
import { schemaTypes } from './sanity/schemaTypes';
import { projectId, dataset, apiVersion } from './sanity/env';

export default defineConfig({
  name: 'default',
  title: 'Absolute Beast Dominion — Studio',
  basePath: '/studio',

  projectId: projectId || 'demo',
  dataset: dataset || 'production',

  plugins: [
    structureTool({
      title: 'Data Editor',
      structure: (S) =>
        S.list()
          .title('Site')
          .items([
            S.listItem()
              .title('Chapters')
              .schemaType('chapterTimeline')
              .child(
                S.documentTypeList('chapterTimeline')
                  .title('Story Chapters')
                  .defaultOrdering([{ field: 'chapterNumber', direction: 'asc' }])
              ),
            S.divider(),
            S.listItem()
              .title('Tamed Beasts')
              .schemaType('beast')
              .child(
                S.documentTypeList('beast')
                  .title('Contracted Beasts')
                  .defaultOrdering([{ field: 'contractChapter', direction: 'asc' }])
              ),
            S.listItem()
              .title('Tamers')
              .schemaType('character')
              .child(
                S.documentTypeList('character')
                  .title('Tamers')
              ),
            S.divider(),
            S.listItem()
              .title('Skills')
              .schemaType('skill')
              .child(
                S.documentTypeList('skill')
                  .title('Skills')
                  .defaultOrdering([{ field: 'tier', direction: 'asc' }])
              ),
            S.listItem()
              .title('Traits')
              .schemaType('trait')
              .child(
                S.documentTypeList('trait')
                  .title('Traits')
                  .defaultOrdering([{ field: 'name', direction: 'asc' }])
              ),
            S.listItem()
              .title('Locations')
              .schemaType('realmLocation')
              .child(
                S.documentTypeList('realmLocation')
                  .title('Locations')
              ),
          ]),
    }),
    presentationTool({
      title: 'Visual Editing',
      previewUrl: '/',
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
