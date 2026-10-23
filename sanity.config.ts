import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';
import { projectId, dataset } from './sanity/env';

export default defineConfig({
  name: 'default',
  title: 'Absolute Beast Dominion — Codex Studio',
  basePath: '/studio',

  projectId: projectId || 'demo',
  dataset: dataset || 'production',

  plugins: [
    structureTool({
      title: 'Grimoire Codex',
      structure: (S) =>
        S.list()
          .title('Dominion Codex Sections')
          .items([
            S.listItem()
              .title('📖 Chapter Timeline & Arcs')
              .child(
                S.documentList()
                  .title('Story Chapters')
                  .filter('_type == "chapterTimeline"')
                  .defaultOrdering([{ field: 'chapterNumber', direction: 'asc' }])
              ),
            S.divider(),
            S.listItem()
              .title('🐾 Dominion Beasts & Companions')
              .child(
                S.documentList()
                  .title('Contracted & Wild Beasts')
                  .filter('_type == "beast"')
                  .defaultOrdering([{ field: 'contractChapter', direction: 'asc' }])
              ),
            S.listItem()
              .title('🛡️ Pact Masters & Tamers')
              .child(
                S.documentList()
                  .title('Tamers (Leo, Lily, Miho)')
                  .filter('_type == "character"')
              ),
            S.divider(),
            S.listItem()
              .title('⚡ Grimoire Skills & Techniques')
              .child(
                S.documentList()
                  .title('Combat & Bond Skills')
                  .filter('_type == "skill"')
                  .defaultOrdering([{ field: 'tier', direction: 'asc' }])
              ),
            S.listItem()
              .title('🗺️ Realm Geography & Danger Zones')
              .child(
                S.documentList()
                  .title('Academies & Calamity Loci')
                  .filter('_type == "realmLocation"')
              ),
          ]),
    }),
    visionTool({
      defaultApiVersion: '2024-01-01',
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
