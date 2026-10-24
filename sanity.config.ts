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
              .child(
                S.documentList()
                  .title('Story Chapters')
                  .apiVersion(apiVersion)
                  .filter('_type == "chapterTimeline"')
                  .defaultOrdering([{ field: 'chapterNumber', direction: 'asc' }])
              ),
            S.divider(),
            S.listItem()
              .title('Tamed Beasts')
              .child(
                S.documentList()
                  .title('Contracted Beasts')
                  .apiVersion(apiVersion)
                  .filter('_type == "beast"')
                  .defaultOrdering([{ field: 'contractChapter', direction: 'asc' }])
              ),
            S.listItem()
              .title('Tamers')
              .child(
                S.documentList()
                  .title('Tamers')
                  .apiVersion(apiVersion)
                  .filter('_type == "character"')
              ),
            S.divider(),
            S.listItem()
              .title('Skills')
              .child(
                S.documentList()
                  .title('Skills')
                  .apiVersion(apiVersion)
                  .filter('_type == "skill"')
                  .defaultOrdering([{ field: 'tier', direction: 'asc' }])
              ),
            S.listItem()
              .title('Traits')
              .child(
                S.documentList()
                  .title('Traits')
                  .apiVersion(apiVersion)
                  .filter('_type == "trait"')
                  .defaultOrdering([{ field: 'name', direction: 'asc' }])
              ),
            S.listItem()
              .title('Locations')
              .child(
                S.documentList()
                  .title('Locations')
                  .apiVersion(apiVersion)
                  .filter('_type == "realmLocation"')
              ),
          ]),
    }),
    presentationTool({
      title: 'Visual Editing',
      previewUrl: {
        preview: '/',
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
